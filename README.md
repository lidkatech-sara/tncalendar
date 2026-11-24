# tncalendar.com – 2027 Tamil Calendar (Astro, static, Cloudflare)

## One-time local setup (images are generated locally and COMMITTED)
```bash
npm install
npm run assets     # fonts -> 365 daily sheets -> og-default + 12 monthly wallpapers + 10 hub cards
git add public/images assets/fonts && git commit -m "Add generated images"
```
`npm run build` first runs `scripts/check-assets.mjs`, which fails with a clear message if any image is missing,
so CI never renders images. Re-run `npm run assets` only when `src/data/calendar-2027.json` changes.

```bash
npm run dev        # http://localhost:4321
npm run build      # check-assets -> astro build -> dist/
npm run deploy     # wrangler deploy (Workers Static Assets, serves ./dist)
```
Cloudflare build: command `npm run build`, output `dist`, Node 22.

## Data
`npm run data` rewrites `src/data/calendar-2027.json` from `src/lib/engine.mjs` (Sun/Moon ephemeris, Lahiri ayanamsa, Chennai)
and prints an OK/MISMATCH cross-check of computed festival dates against the official TN holiday list (`OFFICIAL` in the script).

## Environment variables (Cloudflare dashboard or `.env`)
- `PUBLIC_ADSENSE_CLIENT=ca-pub-XXXX`, `PUBLIC_ADSENSE_SLOT_TOP`, `PUBLIC_ADSENSE_SLOT_MID` – ads render only when set. Put your line in `public/ads.txt` after approval.
- `PUBLIC_WEB3FORMS_KEY` – contact form posts to Web3Forms; without it the form falls back to a mailto link.

## Layout
- `src/pages/daily/[date].astro` (365) · `src/pages/[slug].astro` (12 monthly + 20 hubs, config in `src/lib/hubs.ts`)
- `src/pages/guides/` (8 guides, content in `src/lib/guides.ts`) · `2027-tamil-calendar-pdf` (print page) · `tamil-date-converter`
- `src/lib/editorial.ts` – day-specific text/FAQ generator

## Must verify before launch
1. Compare ~20 dates against a printed Vakya panchangam (thithi/nakshatram end times, Tamil date, festival days).
2. Nalla Neram is hora-based; printed calendars use their own tables. Gowri Nalla Neram is NOT included.
3. TN holidays follow G.O. (Ms.) No. 613 (from news reports): diff `OFFICIAL` against the G.O. PDF on tn.gov.in.
4. Bank holidays page = govt holidays + 1 Apr + 2nd/4th Saturdays; check the RBI 2027 list when published.
5. Expand/edit the guides in your own voice before applying to AdSense.
