# Lalpur Hostels — Website

Website for **Lalpur Hostels**, a group of 3 hostels & PGs in Lalpur, Ranchi (Jharkhand) — safe, affordable accommodation for students and working professionals, with home-cooked meals, Wi-Fi, and 24/7 security.

## Tech stack

- **Next.js 16** (App Router, React 19) — server-rendered for SEO
- **TypeScript**
- **Tailwind CSS v4**
- **lucide-react** (icons)
- **motion** (animations)

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for a deeper walk-through.

## Running locally

### Prerequisites

- **Node.js 20 or newer** — download from <https://nodejs.org> (pick the LTS "Recommended" build).
- Verify:
  ```bash
  node -v
  npm -v
  ```

### Dev server

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. Edits under `src/` auto-reload.

### Other scripts

- `npm run build` — production build
- `npm run start` — serve the production build (run after `build`)
- `npm run lint` — check code style

## Editing content

All hostel info, contact numbers, room types, reviews, and FAQs live in one file:

```
src/data/hostels.ts
```

Brand constants at the top of that file (`BRAND_NAME`, `BRAND_PHONE`, `BRAND_EMAIL`, `BRAND_WHATSAPP`) propagate to the whole site — change them once.

Blog posts live in `src/data/blog.ts`.

Images go in `public/images/` and are referenced as `/images/your-file.jpg`.

## Before going live

Open `src/data/hostels.ts` and `src/app/layout.tsx` and replace every `TODO` placeholder:

- Real phone / WhatsApp / email
- Real domain (replace `https://lalpurhostels.com` with the domain you actually buy)
- Real hostel photos in `public/images/`

## Deploying

Easiest path: push the repo to GitHub → import it at <https://vercel.com> → Vercel auto-detects Next.js and deploys on every push. Connect your custom domain in the Vercel dashboard.

## License

Private project. Photos via Unsplash where placeholders remain; see `ATTRIBUTIONS.md`.
