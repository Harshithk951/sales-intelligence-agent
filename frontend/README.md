# Nexus AI — Frontend

This is the Next.js frontend for the Smart Sales Intelligence Agent.
It is built with Next.js 15 (App Router), Tailwind CSS v4, and Framer Motion.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture
- `src/app/` — Next.js App Router pages and layouts.
- `src/components/` — Reusable UI components strictly following the `design.md` token system.
- `src/lib/` — Types, utilities, and mock data.

## Deployment to Vercel
This app is ready to be deployed on Vercel. 
1. Push the repository to GitHub.
2. Import the `frontend` directory as the Root Directory in Vercel.
3. Vercel will automatically detect Next.js and apply the correct build settings.
