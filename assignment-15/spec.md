# NASA Near-Earth Object Dashboard — Project Spec

## Overview

Build a single-page web dashboard (`index.html`) that pulls **live data** from NASA/JPL APIs and presents it across **at least three tabs**. The dashboard should feel like a real mission control tool — dark, technical, and visually striking.

**Build this incrementally using the phases below. Only work on the phase specified in the prompt — stop when that phase is complete and working.**

---

## APIs (Reference for all phases)

### 1. NeoWs — Near Earth Object Web Service (NASA)
- **Base URL**: `https://api.nasa.gov/neo/rest/v1/feed`
- **Auth**: API key `gcdSH8EoFB7FJp6L9Wl8NBgTo3gtchuCynwhxECS`
- **Example**: `?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD&api_key=KEY`
- Returns: asteroid diameter, velocity, miss distance, hazard flag, close approach date
- Today's date is **April 1, 2026** — use this as `start_date`; end_date = start_date + 6 days (max 7-day window)

### 2. SBDB Close-Approach Data (JPL)
- **Base URL**: `https://ssd-api.jpl.nasa.gov/cad.api`
- **Auth**: None required
- **Useful params**: `dist-max`, `date-min`, `date-max`, `sort`, `limit`
- **Example**: `?dist-max=10LD&date-min=now&date-max=+1y&sort=dist`

### 3. Sentry Impact Monitoring System (JPL)
- **Base URL**: `https://ssd-api.jpl.nasa.gov/sentry.api`
- **Auth**: None required
- **Key response fields**: `des` (name), `ip` (impact probability), `ts` (Torino scale), `ps` (Palermo scale), `diameter`

All three APIs support **CORS** — call them directly from JavaScript, no backend needed.

---

## Design Direction (applies to all phases)

- **Dark space / mission control aesthetic**
- Background: near-black, deep navy, or dark charcoal
- Accent colors: 1–2 sharp colors (cyan, amber, or red-orange) — no purple gradients
- Display font for headers: something distinctive and technical (not Inter, not Arial, not Space Grotesk)
- Monospace font for all data values and numbers
- Tab nav should feel like instrument panels, not a generic website nav
- Use CSS variables for the entire color and typography system
- Animate content in on load — don't just pop it in instantly

---

## File Structure

```
index.html   ← entire app lives here (HTML + CSS + JS all inline)
```

No `package.json`, no build step, no node_modules. Just open in a browser.

### Libraries (all via CDN):
- `Chart.js` — charts
- `globe.gl` — 3D Earth (Phase 6 only)
- Any icon set (Font Awesome, Lucide, etc.)
- Google Fonts for typography

---

## Phases

---

### Phase 1 — Shell, Nav, and Design System
**Prompt to use**: *"Build Phase 1. Check spec.md for details."*

**Goal**: A working, styled page with tab navigation and no API calls yet.

**Deliverables**:
- Full CSS variable system: colors, fonts, spacing, border radii
- Dark theme applied globally
- Tab navigation bar with these 5 tabs: `Miss Distance`, `This Week`, `Size & Speed`, `Schedule`, `Impact Risk`
- Clicking a tab shows its panel, hides the others (plain JS, no framework)
- Each tab panel contains a placeholder (e.g., "Data loads here") so the layout is visible
- Reusable loading spinner component (CSS animation, shown via a `.loading` class)
- Reusable error message component (shown via an `.error` class)
- Smooth tab switch animation
- Page header with title and a subtle tagline

**Do not make any API calls in this phase.**

---

### Phase 2 — NeoWs Fetch + This Week Tab
**Prompt to use**: *"Build Phase 2. Check spec.md for details."*

**Goal**: Fetch live asteroid data and populate the This Week tab.

**Deliverables**:
- On page load, fetch from NeoWs API (start: April 1 2026, end: April 7 2026)
- Parse response: flatten the date-keyed object into a single array of asteroid objects
- Store the result in a global `window.neoData` array for later phases to reuse
- Populate the **This Week** tab with a sortable table:
  - Columns: Name, Close Approach Date, Miss Distance (LD), Miss Distance (km), Est. Diameter (m), Velocity (km/s), Hazardous
  - Hazardous column: red warning icon for `true`, green check for `false`
  - Default sort: by close approach date ascending
  - Clicking column headers re-sorts the table
- Show the loading spinner while fetching, hide it when done
- Show the error component if the fetch fails
- Display total asteroid count as a badge on the "This Week" tab label

---

### Phase 3 — Size & Speed Tab
**Prompt to use**: *"Build Phase 3. Check spec.md for details."*

**Goal**: Visualize asteroid sizes and speeds using data already fetched in Phase 2.

**Deliverables**:
- Use `window.neoData` (set in Phase 2) — no new API call needed
- **Size chart**: horizontal bar chart (Chart.js) showing estimated average diameter for each asteroid, sorted largest to smallest
- **Speed chart**: horizontal bar chart showing relative velocity (km/s) for each asteroid, sorted fastest to slowest
- Highlight the largest asteroid (different bar color) and the fastest asteroid (different bar color)
- Summary stats above the charts: largest diameter, fastest speed, total count
- If `window.neoData` is empty or undefined, show a message: "Load the This Week tab first"

---

### Phase 4 — Schedule Tab (SBDB API)
**Prompt to use**: *"Build Phase 4. Check spec.md for details."*

**Goal**: Show upcoming close approaches over the next year using the SBDB API.

**Deliverables**:
- Fetch from SBDB `cad.api` when the Schedule tab is first clicked (lazy load — don't fetch on page load)
- Default query: all approaches within 10 LD from now through +1 year, sorted by date
- Distance filter UI: dropdown or slider to filter by max distance (options: 1 LD, 5 LD, 10 LD, any)
- Display results in a table: Object name, Date, Distance (LD), Distance (km), Object diameter (if available)
- Show a monthly count summary (e.g., "April: 4 approaches, May: 7 approaches") above the table
- Cache the result in `window.sbdbData` so switching away and back doesn't re-fetch

---

### Phase 5 — Impact Risk Tab (Sentry API)
**Prompt to use**: *"Build Phase 5. Check spec.md for details."*

**Goal**: Show asteroids with non-zero Earth impact probability from JPL Sentry.

**Deliverables**:
- Fetch from Sentry API when the Impact Risk tab is first clicked (lazy load)
- Display a sortable table: Name, Impact Probability, Torino Scale (0–10), Palermo Scale, Est. Diameter, Year range of potential impacts
- Color-code Torino scale: 0 = grey, 1–3 = yellow, 4–7 = orange, 8–10 = red
- Brief explainer section above the table (2–3 sentences) explaining what Torino and Palermo scales mean
- Default sort: by Palermo scale descending (most technically concerning first)
- Cache result in `window.sentryData`

---

### Phase 6 — Miss Distance Globe (Stretch)
**Prompt to use**: *"Build Phase 6. Check spec.md for details."*

**Goal**: Add a 3D interactive Earth globe as the Miss Distance tab using globe.gl.

**Deliverables**:
- Load `globe.gl` from CDN (`https://unpkg.com/globe.gl`)
- Use `window.neoData` from Phase 2 — no new API call
- Render a 3D Earth with asteroid dots positioned at altitude based on miss distance
- **Non-linear altitude scale**: use `Math.log1p(missDistanceLD) / Math.log1p(maxLD)` mapped to a max visual altitude (e.g., 0.5 globe radii). Do NOT use linear scale — close approaches become invisible.
- Place the **Moon** as a distinct reference dot at the altitude corresponding to exactly 1.0 LD
- Color coding: red/orange = potentially hazardous, cyan/green = routine flyby; Moon = white/grey
- Clicking an asteroid dot opens a detail panel showing: name, miss distance (LD + km), diameter estimate, velocity, hazard status
- Drag to rotate, scroll to zoom
- Disclaimer below globe: *"Dot positions are illustrative — actual flyby geometry depends on orbital mechanics"*
- If NeoWs data hasn't loaded yet, show a message with a button to trigger the fetch

---

## Completion Checklist

- [ ] Phase 1: Shell and nav working, no API calls
- [ ] Phase 2: This Week tab live with NeoWs data
- [ ] Phase 3: Size & Speed charts rendering
- [ ] Phase 4: Schedule tab with SBDB data
- [ ] Phase 5: Impact Risk tab with Sentry data
- [ ] Phase 6: 3D globe rendering with asteroid markers (stretch)
