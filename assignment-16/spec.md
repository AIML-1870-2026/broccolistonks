# Drug Safety Explorer — spec.md

## Overview

Build a **Drug Safety Explorer** — a single-file HTML web app that queries the **OpenFDA API** to let users explore drug safety data. Users can look up one or two drugs and see labeling info, adverse events, and recall history.

Single HTML file. No backend. No API key. Vanilla JS only (no React/Vue/jQuery). Use Chart.js for bar charts.

---

## CRITICAL: API Base URL

**The base URL is `https://api.fda.gov` — NOT `api.open.fda.gov`.**

The website/docs live at `open.fda.gov`, but the actual API endpoint is `api.fda.gov`. Getting this wrong will cause every request to fail with a hostname error.

---

## Chart.js CDN (put in `<head>`)

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
```

---

## API Fetch Helper

**Copy this function verbatim into the `<script>` section. Do not modify it.**

```javascript
async function fetchFDA(path) {
  const url = encodeURI('https://api.fda.gov' + path);
  try {
    const res = await fetch(url);
    if (res.status === 404) return null; // 404 = no results, not an error
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return await res.json();
  } catch (err) {
    console.error('FDA API error:', err);
    return null;
  }
}
```

### How to call it for each endpoint:

```javascript
// Search for drug labels (autocomplete)
const name = userInput.toUpperCase();
const data = await fetchFDA('/drug/label.json?search=openfda.brand_name:"' + name + '"+openfda.generic_name:"' + name + '"&limit=5');

// Get adverse event counts
const events = await fetchFDA('/drug/event.json?search=patient.drug.openfda.generic_name.exact:"' + name + '"&count=patient.reaction.reactionmeddrapt.exact&limit=10');

// Get recall/enforcement data
const recalls = await fetchFDA('/drug/enforcement.json?search=openfda.brand_name:"' + name + '"+openfda.generic_name:"' + name + '"&limit=10');
```

### Tested working URLs (paste these into a browser to verify they work):

```
https://api.fda.gov/drug/label.json?search=openfda.brand_name:"ASPIRIN"&limit=1
https://api.fda.gov/drug/event.json?search=patient.drug.openfda.generic_name.exact:"ASPIRIN"&count=patient.reaction.reactionmeddrapt.exact&limit=10
https://api.fda.gov/drug/enforcement.json?search=openfda.brand_name:"ASPIRIN"&limit=5
```

---

## BANNED PATTERNS

```javascript
// ❌ WRONG BASE URL — this hostname does not exist
'https://api.open.fda.gov'

// ❌ NEVER manually write %22
'search=openfda.brand_name:%22' + name + '%22'

// ❌ NEVER use encodeURIComponent on drug names inside the URL
encodeURIComponent(drugName)
```

---

## Build Phases

### Phase 1: HTML Structure & Styling

Build the full page shell first:

- **Disclaimer banner** at top (always visible, not dismissable):
  "Educational Use Only — This tool is for learning purposes. FAERS reports are voluntarily submitted. A report linking a drug to an adverse event does not prove the drug caused the event. Always consult a healthcare professional for medical advice."
- **Header** with title "Drug Safety Explorer" and subtitle
- **Search section** with two inputs (Drug A and Drug B), autocomplete dropdowns, selected drug pills, and a "Compare" button
- **Dashboard section** (hidden until compare is clicked) with 3 tabs: Drug Labels, Adverse Events, Recalls
- Loading spinner, empty state, and error message components
- Professional blue/teal color scheme suitable for health data
- Responsive: 2-column comparison on desktop, stacked on mobile

### Phase 2: Drug Search & Autocomplete

- On typing in either input (debounced 300ms), search for drugs:
  ```javascript
  const name = query.toUpperCase();
  const data = await fetchFDA('/drug/label.json?search=openfda.brand_name:"' + name + '"+openfda.generic_name:"' + name + '"&limit=5');
  ```
- Extract results:
  ```javascript
  if (data && data.results) {
    const drugs = data.results
      .filter(r => r.openfda && r.openfda.brand_name)
      .map(r => ({
        brandName: r.openfda.brand_name[0],
        genericName: (r.openfda.generic_name && r.openfda.generic_name[0]) || 'N/A',
        labelData: r
      }));
  }
  ```
- Show dropdown with brand name + generic name
- On click, store selection, show pill with ✕ remove button
- Enable "Compare" button when at least Drug A is selected
- Drug B is optional (single-drug view if empty)

### Phase 3: Drug Labels Tab

- Display these label sections side by side for each drug:
  - **Warnings** → `labelData.warnings` (array of strings, join with newlines)
  - **Adverse Reactions** → `labelData.adverse_reactions`
  - **Drug Interactions** → `labelData.drug_interactions`
  - **Contraindications** → `labelData.contraindications`
  - **Dosage** → `labelData.dosage_and_administration`
- If a field is undefined/missing, show "No data available" in italics
- Truncate long text to ~500 chars with "Show more / Show less" toggle
- Two-column layout for comparison, single centered column for one drug

### Phase 4: Adverse Events Tab

- For each drug:
  ```javascript
  const data = await fetchFDA('/drug/event.json?search=patient.drug.openfda.generic_name.exact:"' + genericName + '"&count=patient.reaction.reactionmeddrapt.exact&limit=10');
  ```
- Response: `data.results` = array of `{ term: "NAUSEA", count: 12345 }`
- Render **horizontal bar chart** using Chart.js for each drug
- Drug A in blue, Drug B in teal
- If null (no data), show "No adverse event reports found"

### Phase 5: Recalls Tab

- For each drug:
  ```javascript
  const data = await fetchFDA('/drug/enforcement.json?search=openfda.brand_name:"' + drugName + '"+openfda.generic_name:"' + genericName + '"&limit=10');
  ```
- Display each recall as a card:
  - `reason_for_recall` — main text
  - `classification` — colored badge (Class I = red, Class II = amber, Class III = green)
  - `report_date` — format YYYYMMDD → MM/DD/YYYY
  - `status` — Ongoing, Terminated, etc.
- If null, show "No recall history found"

---

## Data Handling

- **Always use optional chaining:** `r.openfda?.brand_name?.[0]`
- **404 = no results**, not an error. Show empty state.
- **Loading spinners** while fetching
- **Error messages** for genuine failures (network down, 500 errors)
- **Uppercase drug names** before API calls (`.toUpperCase()`)

---

## Test Drugs

After building, test with:
- **WARFARIN** vs **IBUPROFEN** (rich data in all tabs)
- **ASPIRIN** vs **ACETAMINOPHEN** (common drugs, good data)
- **METFORMIN** alone (single drug mode)

---

## File Structure

```
drug-safety-explorer/
├── index.html    ← everything goes here
└── spec.md       ← this file
```
