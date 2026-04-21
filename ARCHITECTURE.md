# Architecture

Production website for **Lalpur Hostels** (Ranchi). Single Next.js 16 app, server-rendered for SEO.

```
HOTEL WEB/
├── src/
│   ├── app/
│   │   ├── layout.tsx            # root layout + global <metadata>
│   │   ├── page.tsx              # "/" — homepage with hostel grid + reviews
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx          # blog index
│   │   │   └── [slug]/           # dynamic blog post
│   │   ├── hostel/[id]/          # dynamic per-hostel detail page
│   │   ├── not-found.tsx
│   │   ├── sitemap.ts            # auto-generated /sitemap.xml
│   │   ├── robots.ts             # auto-generated /robots.txt
│   │   ├── globals.css
│   │   └── favicon.ico
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── HostelCard.tsx
│   │   ├── HostelGallery.tsx
│   │   ├── ReviewCard.tsx
│   │   ├── ContactForm.tsx
│   │   ├── WhatsAppButton.tsx
│   │   └── AnimatedBackground.tsx
│   └── data/
│       ├── hostels.ts            # 3 real hostels + BRAND_* constants
│       └── blog.ts
├── public/                       # static assets (hostel photos go in public/images/)
├── guidelines/                   # design/system notes
├── next.config.ts                # allows images.unsplash.com
├── package.json
├── tsconfig.json
├── eslint.config.mjs
├── postcss.config.mjs
├── ARCHITECTURE.md               # this file
├── ATTRIBUTIONS.md               # image/asset credits
└── README.md
```

## Key architectural choices

- **SSR (Server-Side Rendering).** Every page is rendered on the server. Google receives fully-formed HTML with content and metadata, so local keywords like "hostel in lalpur ranchi" can rank.
- **Metadata API.** `layout.tsx` defines global title, description, keywords, Open Graph, Twitter, canonical URL. Individual route files can export their own `metadata` to override.
- **Structured data (JSON-LD).** `page.tsx` emits an `Organization` + `LodgingBusiness` schema so Google can show rich results.
- **Sitemap & robots.** `sitemap.ts` and `robots.ts` are Route Handlers — Next builds them automatically; no manual XML.
- **Dynamic routes.** `hostel/[id]/page.tsx` and `blog/[slug]/page.tsx` use file-system based params. `generateStaticParams` (if added) can pre-render all known hostels and posts at build time.
- **Data layer.** All content lives in `src/data/*.ts` as typed TypeScript. No backend/database. This is intentional while content is stable; a CMS can be added later if the owner wants to edit copy without a deploy.
- **Branding constants.** `BRAND_NAME`, `BRAND_PHONE`, `BRAND_WHATSAPP`, `BRAND_EMAIL` in `data/hostels.ts` — change once, applies everywhere.
- **Styling.** Tailwind CSS v4 via `@tailwindcss/postcss`.
- **Fonts.** `next/font` with Geist, self-hosted automatically.

## Request flow (e.g. `/hostel/muskan-girls-hostel-ranchi`)

```
Browser ──HTTP──▶ Next.js server
                     │
                     ├─ matches src/app/hostel/[id]/page.tsx
                     ├─ reads hostelsData from src/data/hostels.ts
                     ├─ renders React → HTML
                     └─ returns HTML + hydration script
Browser ◀── HTML ───
         (Google bot also reads this same HTML)
```

## Outstanding production TODOs

These are referenced in the code and should be resolved before launch:

- `layout.tsx` — replace `metadataBase` placeholder `https://lalpurhostels.com` with the real domain once purchased.
- `data/hostels.ts` — fill in real `BRAND_PHONE`, `BRAND_EMAIL`, `BRAND_WHATSAPP`.
- `public/images/` — add real hostel photos (current paths like `/images/muskan-main.jpg` are expected but may not exist yet).
- Verify each hostel's `googleMapsUrl` and `googleMapsEmbed`.
- Add `generateStaticParams` to `hostel/[id]` and `blog/[slug]` for static export if desired.
- Wire `ContactForm` to a real endpoint (currently UI only).

## Deployment

Recommended: **Vercel** (made by the Next.js team, free tier sufficient, SSR out-of-the-box, custom domain takes 5 minutes). Alternative: any Node host (Netlify, Railway, AWS Amplify). Static export is possible but loses SSR benefits for metadata that depends on request.

## History

Originally this repo shipped two apps in parallel: a Vite + React SPA (the Figma Make export, at the root) and the Next.js app (under `nextjs-hostel/`). The Vite version was removed once the Next.js app reached parity, leaving the Next.js app as the single source of truth.
