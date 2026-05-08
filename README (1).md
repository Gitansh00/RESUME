# Contact Form Backend

A production-ready Node.js/Express backend for the portfolio contact section.

## Features
- ✅ Email sending via Gmail or any SMTP provider (Nodemailer)
- ✅ Auto-reply to the sender
- ✅ All submissions saved to `submissions.json` (even if email fails)
- ✅ Rate limiting (3 requests / minute per IP)
- ✅ Input validation & sanitization
- ✅ Admin endpoint to view all submissions
- ✅ CORS-protected

---

## Quick Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
```
Edit `.env` with your details:

```env
GMAIL_USER=you@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx   # Gmail App Password
RECIPIENT_EMAIL=you@gmail.com            # Where to receive messages
PORT=3000
ALLOWED_ORIGIN=https://yourwebsite.com
ADMIN_TOKEN=some_long_random_secret
```

> **How to get a Gmail App Password:**
> 1. Enable 2-Step Verification on your Google account
> 2. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
> 3. Create an App Password → copy the 16-char code into `.env`

### 3. Run the server
```bash
# Development (with auto-restart)
npx nodemon server.js

# Production
node server.js
```

---

## Frontend Setup

Edit `public/index.html` and update these values:

```js
const API_URL = 'http://localhost:3000/api/contact'; // → your production URL

// Social links (in the HTML)
href="https://linkedin.com/in/yourprofile"
href="https://github.com/yourprofile"
href="https://instagram.com/yourprofile"
```

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/contact` | Submit contact form |
| `GET`  | `/api/submissions` | View all submissions (requires `x-admin-token` header) |
| `GET`  | `/api/health` | Health check |

### POST /api/contact — Request body
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@example.com",
  "subject": "Freelance Opportunity",
  "message": "Hey, I'd love to work with you!"
}
```

### View submissions (admin)
```bash
curl http://localhost:3000/api/submissions \
  -H "x-admin-token: your_admin_token"
```

---

## Deploy to Railway / Render / Fly.io

1. Push this folder to a GitHub repo
2. Connect the repo to Railway / Render
3. Set all env variables in the platform's dashboard
4. Update `API_URL` in `public/index.html` to your deployed URL

---

## Use a different email provider (e.g. Mailgun)

```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=postmaster@mg.yourdomain.com
SMTP_PASS=your_mailgun_password
```
