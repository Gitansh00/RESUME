# Gitansh Bhange — Portfolio

A modern, animated full-stack developer portfolio built with **Next.js 16**, **Three.js**, and **Framer Motion**. Features a working contact form with email delivery.

**Live Demo → [https://gitanshbhange.vercel.app/]

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion + GSAP |
| 3D Graphics | Three.js + React Three Fiber |
| Smooth Scroll | Lenis |
| Email | Nodemailer (Gmail) |
| Deployment | Vercel |

---

## Features

- Animated hero section with 3D canvas backgrounds
- Accordion skills section
- Interactive project cards with WebGL effects
- Fully functional contact form with email delivery & auto-reply
- Custom cursor and scroll animations
- Mobile responsive

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Gitansh00/RESUME.git
cd RESUME
npm install
```

### 2. Set up environment variables

Create a `.env.local` file in the root:

```env
GMAIL_USER=your@gmail.com
GMAIL_APP_PASSWORD=xxxx_xxxx_xxxx_xxxx
RECIPIENT_EMAIL=your@gmail.com
```

> **How to get a Gmail App Password:**
> Google Account → Security → 2-Step Verification → App Passwords → Generate

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
RESUME/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts      # Contact form API endpoint
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   └── Contact.tsx
├── public/
├── .env.local                # Not committed
├── .gitignore
└── package.json
```

---

## Deploying to Vercel

1. Push to GitHub
2. Import repo at [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `GMAIL_USER`
   - `GMAIL_APP_PASSWORD`
   - `RECIPIENT_EMAIL`
4. Deploy ✅

---

## Contact

**Gitansh Bhange**
- Email — gitanshbhange@email.com
- GitHub — [@Gitansh00](https://github.com/Gitansh00)
- LinkedIn — [gitansh-bhange](https://www.linkedin.com/in/gitansh-bhange-a4ba05295)
- Instagram — [@gitansh_b_](https://instagram.com/gitansh_b_)

---

*Built with discipline, curiosity, and precision.*
