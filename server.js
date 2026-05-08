require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const { body, validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || "*" }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ── Nodemailer transporter ─────────────────────────────────────────────────
// Supports Gmail (recommended) or any SMTP provider.
// Set SMTP_HOST/PORT for custom providers, or use GMAIL_USER + GMAIL_PASS.
const createTransporter = () => {
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Default: Gmail with App Password
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD, // Gmail App Password (not your real password)
    },
  });
};

// ── In-memory rate limit (simple, no Redis needed) ─────────────────────────
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip) || { count: 0, start: now };

  if (now - entry.start > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, start: now });
    return false;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) return true;

  entry.count++;
  rateLimitMap.set(ip, entry);
  return false;
}

// ── Save submission to JSON log ────────────────────────────────────────────
function logSubmission(data) {
  const logFile = path.join(__dirname, "submissions.json");
  let submissions = [];
  if (fs.existsSync(logFile)) {
    try {
      submissions = JSON.parse(fs.readFileSync(logFile, "utf-8"));
    } catch (_) {}
  }
  submissions.push({ ...data, timestamp: new Date().toISOString() });
  fs.writeFileSync(logFile, JSON.stringify(submissions, null, 2));
}

// ── Validation rules ──────────────────────────────────────────────────────
const contactValidation = [
  body("firstName").trim().notEmpty().withMessage("First name is required").isLength({ max: 60 }),
  body("lastName").trim().notEmpty().withMessage("Last name is required").isLength({ max: 60 }),
  body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("subject").trim().notEmpty().withMessage("Subject is required").isLength({ max: 120 }),
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ min: 10, max: 3000 })
    .withMessage("Message must be between 10 and 3000 characters"),
];

// ── POST /api/contact ──────────────────────────────────────────────────────
app.post("/api/contact", contactValidation, async (req, res) => {
  // Rate limiting
  const clientIp = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
  if (isRateLimited(clientIp)) {
    return res.status(429).json({ success: false, message: "Too many requests. Please wait a minute." });
  }

  // Validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { firstName, lastName, email, subject, message } = req.body;
  const fullName = `${firstName} ${lastName}`;

  // Log submission regardless of email success
  logSubmission({ firstName, lastName, email, subject, message });

  // Send email
  try {
    const transporter = createTransporter();

    // Email to YOU (site owner)
    await transporter.sendMail({
      from: `"Contact Form" <${process.env.GMAIL_USER || process.env.SMTP_USER}>`,
      to: process.env.RECIPIENT_EMAIL || process.env.GMAIL_USER,
      replyTo: email,
      subject: `[Portfolio Contact] ${subject}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#1a237e;color:#fff;border-radius:12px;overflow:hidden">
          <div style="padding:32px;background:#283593">
            <h1 style="margin:0;font-size:24px">New Contact Message</h1>
          </div>
          <div style="padding:32px">
            <p><strong>From:</strong> ${fullName}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}" style="color:#90caf9">${email}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr style="border-color:#3949ab;margin:20px 0"/>
            <p><strong>Message:</strong></p>
            <p style="white-space:pre-wrap;background:#283593;padding:16px;border-radius:8px">${message}</p>
          </div>
          <div style="padding:16px 32px;font-size:12px;color:#9fa8da">
            Sent at ${new Date().toLocaleString()}
          </div>
        </div>
      `,
    });

    // Auto-reply to sender
    await transporter.sendMail({
      from: `"Gitansh Bhange" <${process.env.GMAIL_USER || process.env.SMTP_USER}>`,
      to: email,
      subject: "Thanks for reaching out!",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#1a237e;color:#fff;border-radius:12px;overflow:hidden">
          <div style="padding:32px;background:#283593">
            <h1 style="margin:0;font-size:24px">Thanks, ${firstName}!</h1>
          </div>
          <div style="padding:32px">
            <p>I received your message and will get back to you as soon as possible.</p>
            <p>Here's a copy of what you sent:</p>
            <blockquote style="border-left:3px solid #5c6bc0;padding-left:16px;margin-left:0;color:#c5cae9">
              ${message}
            </blockquote>
          </div>
          <div style="padding:16px 32px;font-size:12px;color:#9fa8da">
            gitanshbhange@email.com
          </div>
        </div>
      `,
    });

    return res.json({ success: true, message: "Message sent! I'll be in touch soon." });
  } catch (err) {
    console.error("Email error:", err.message);
    // Still a success from the user's view — submission is logged
    return res.json({
      success: true,
      message: "Message received! (Email delivery pending — I'll still see it.)",
    });
  }
});

// ── GET /api/submissions (admin only) ─────────────────────────────────────
app.get("/api/submissions", (req, res) => {
  const token = req.headers["x-admin-token"];
  if (token !== process.env.ADMIN_TOKEN) {
    return res.status(403).json({ error: "Forbidden" });
  }
  const logFile = path.join(__dirname, "submissions.json");
  if (!fs.existsSync(logFile)) return res.json([]);
  res.json(JSON.parse(fs.readFileSync(logFile, "utf-8")));
});

// ── Health check ──────────────────────────────────────────────────────────
app.get("/api/health", (_, res) => res.json({ status: "ok" }));

// ── Start ─────────────────────────────────────────────────────────────────
app.listen(PORT, () => console.log(`✅  Server running on http://localhost:${PORT}`));
