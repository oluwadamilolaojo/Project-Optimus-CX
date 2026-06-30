# Hugo CX — Command Center

Loading, Shrinkage and Margin command center for Project Phoenix. React + Vite, Hugo navy/blue, Space Grotesk.

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build
```

## Deploy (Vercel)
Push the repo to GitHub (GitHub Desktop recommended), then import it in Vercel.
Framework preset: **Vite**. Build command `npm run build`, output dir `dist`. No env vars, no login layer.

## Notes
- Four lenses on one dataset: Overview, Loading Ratios, Shrinkage, Margin.
- The Assumptions drawer (FX, hours, salary bands, US/MO $/hr) recalculates every margin and verdict live.
- Comment boxes on Loading, Shrinkage and Margin are editable and seeded with the Hugo/Lydia rationales. Edits persist in the browser (localStorage, key `hugo_cx_comments`).
- Data is embedded in `src/App.jsx` (June 2026 snapshot). Update the `RAW` array to refresh.
