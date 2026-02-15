# Riya Debnath Portfolio

Modern, recruiter‑ready developer portfolio built with React. It includes a full one‑page layout with Hero, About, Skills, Experience, Projects, Open Source, and Contact sections, plus a polished UI system and smooth section navigation. The frontend is wired to the Node/Express API for skills, projects, and contact.

## Highlights
- Single‑page layout with smooth anchor navigation
- Clear, professional content geared toward recruiters
- Responsive design with bold typography and custom theme tokens
- Optional dark mode via context toggle
- Live data from `/api/skills`, `/api/projects`, and `/api/contact`
- `Hire Me` button uses contact email from backend `contact.json`
- Project cards include `View Case Study` PDF links

## Tech Stack
- React
- React Router
- Framer Motion
- Bootstrap (utility/grid)

## Local Setup
```bash
cd /Users/riyadebnathdas/Applications/my-portfolio/client
npm install
npm start
```

## Build
```bash
cd /Users/riyadebnathdas/Applications/my-portfolio/client
npm run build
```

## API Backend
The frontend consumes the API provided by the server folder:
- Skills: `GET /api/skills`
- Projects: `GET /api/projects`
- Contact info: `GET /api/contact`
- Contact form: `POST /api/contact`

### Contact Form Behavior
- Submission is considered successful only when both actions succeed:
- Message saved in MongoDB
- Email sent through Gmail SMTP
- If email sending fails, the saved MongoDB message is rolled back and the API returns an error.

To run the backend locally:
```bash
cd /Users/riyadebnathdas/Applications/my-portfolio/server
npm install
npm start
```

## Data Sources
- Skills are served from `/Users/riyadebnathdas/Applications/my-portfolio/server/data/skills.json`.
- Project case studies are served from `/Users/riyadebnathdas/Applications/my-portfolio/server/data/projects.json`.
- Contact details (used by `Hire Me` and Contact section) are served from `/Users/riyadebnathdas/Applications/my-portfolio/server/data/contact.json`.
- Case study PDFs are served from `/Users/riyadebnathdas/Applications/my-portfolio/client/public/case-studies/`.

## Resume
Replace the placeholder file at:
`/Users/riyadebnathdas/Applications/my-portfolio/client/public/resume.pdf`

## Update Contact Info
Edit:
`/Users/riyadebnathdas/Applications/my-portfolio/server/data/contact.json`

## SMTP Environment Variables
Set these in `/Users/riyadebnathdas/Applications/my-portfolio/server/.env` (and Render env settings):
- `GMAIL_USER=your-email@gmail.com`
- `GMAIL_PASS=your-16-char-app-password`

## Notes
- The app is a single page with section anchors.
- If you want individual pages, we can reintroduce routing per section.
