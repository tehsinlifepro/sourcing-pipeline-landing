# The Sourcing Pipeline Engine — Landing Page

Awwwards-grade bilingual (EN/中) landing page for the Sourcing Pipeline Engine offer.
Design concept: **红线 (Red Thread)** — editorial cream/dark-espresso chapters stitched
together by a single cinnabar thread that draws itself as you scroll.

## Stack

- Plain HTML/CSS/JS — no build step, no framework
- GSAP 3 + ScrollTrigger + Lenis (vendored in `assets/vendor/`, works offline)
- Google Fonts: Fraunces, Noto Serif SC, Plus Jakarta Sans, Noto Sans SC

## Run locally

```bash
npm run dev          # → http://localhost:7100/
# custom port:  node server.mjs --port 8080
```

## Deploy (GitHub Pages)

1. Push this folder to a **public** GitHub repo (Pages on free tier requires public).
2. Repo → **Settings → Pages → Source: "Deploy from a branch"** → Branch: `main`, folder: `/ (root)` → Save.
3. Live in ~1 min at `https://<user>.github.io/<repo>/`.
4. Optional custom domain: add a `CNAME` file with the domain and point DNS at GitHub.

## Feature flags (query params)

- `?lang=zh` / `?lang=en` — force language (also toggled in nav, persisted in localStorage)
- `?v=b` — hero A/B variant B ("Your trade show leads are going cold.")

## Notes

- All CTAs point at the systeme.io squeeze page with UTM tags per location.
- WeChat QR slot is marked in the final CTA section: search `TODO(wechat)` in `index.html`.
