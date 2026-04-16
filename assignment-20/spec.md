# Blackjack AI Agent — Specification

## Project Overview

A single-file static web application (`index.html`) that implements a Blackjack-playing AI agent. The agent reads the current game state, queries an LLM for a recommendation, and executes the action. The user supplies their own API key via a `.env` file upload — the key is held in memory only and is never persisted or transmitted anywhere besides the LLM API endpoint.

**Deployment target:** GitHub Pages (single `index.html`, no build step, no backend).

---

## Core Requirements

### 1. Single-File Architecture
- All HTML, CSS, and JavaScript live in one `index.html` file.
- No frameworks, no bundlers, no npm. Vanilla JS only.
- External CDN dependencies are OK for charting (Chart.js) — pin the version.

### 2. API Key Handling (`.env` upload)
- Provide a file input that accepts a `.env` file.
- Parse the file client-side for a line matching `OPENAI_API_KEY=...` (and/or `GEMINI_API_KEY=...` if the user wants to support both — pick one provider and stick with it; OpenAI is simpler).
- Store the key in a JavaScript variable only. **Never** write it to `localStorage`, `sessionStorage`, cookies, or the DOM.
- Show a status indicator ("Key loaded ✓") but never display the key itself.
- If no key is loaded, disable the gameplay buttons and show a clear prompt.

### 3. Blackjack Game Engine
Standard casino rules, single-deck or six-deck shoe (pick six-deck, reshuffle when <25% remains):
- Card values: 2–10 face value, J/Q/K = 10, Ace = 1 or 11 (soft/hard handling).
- Dealer hits on soft 17 (configurable constant at top of script — default: stands on all 17s, which is the more common rule; just document the choice).
- Blackjack (natural 21) pays 3:2.
- Supported player actions: **Hit**, **Stand**, **Double Down** (first two cards only), **Split** (optional — can skip for simplicity; if skipped, document the limitation).
- Track: player hand, dealer hand (one card face-down until reveal), shoe, balance, current bet.
- Starting balance: $1000. Minimum bet: $10.

### 4. AI Agent Loop
- On each decision point, the agent sends the LLM a structured prompt containing:
  - Player's current hand (cards and total, noting soft/hard)
  - Dealer's visible up-card
  - Available actions (Hit / Stand / Double — only include Double when legal)
  - Current bet and balance (optional context)
- The LLM response is parsed to extract a single recommendation.

### 5. Robust Recommendation Extraction — **THIS IS THE KEY CHALLENGE**
The assignment explicitly calls out that naive keyword search fails (e.g., "it is not recommended that you hit. You should stand." contains both "hit" and "stand"). Solve this with **structured JSON output**:

- Instruct the LLM to respond with a strict JSON object:
  ```json
  {
    "action": "hit" | "stand" | "double",
    "confidence": 0.0–1.0,
    "reasoning": "brief explanation of why"
  }
  ```
- Use OpenAI's `response_format: { type: "json_object" }` parameter (or equivalent) to enforce JSON output.
- Parse with `JSON.parse()` inside a try/catch. On parse failure, fall back to a conservative keyword extraction that looks for the **last** action word in the response, or default to "stand" and log the failure.
- Validate that `action` is one of the allowed values before acting on it.

### 6. Behind-the-Scenes Logging
- Log every LLM request and response to the browser console in a structured, readable way.
- Include: the prompt sent, the raw response, the parsed action, and any parse errors.
- Rationale: the assignment explicitly says "It is important to develop code that provides output behind-the-scenes (e.g., to the console) so you can see what is happening."

### 7. UI Layout

Keep it clean, dark casino-table green with readable typography. Suggested sections top-to-bottom:

1. **Header** — project title + API key upload + "Key loaded" indicator.
2. **Game Table** — dealer hand (top), player hand (bottom), current totals, current bet, balance.
3. **Action Panel** — "Get AI Recommendation" button, then after recommendation arrives: "Execute Recommendation" button (big, primary), plus manual override buttons (Hit / Stand / Double) for debugging.
4. **AI Analysis Panel** — shows the parsed action, confidence, and reasoning. Must be **visually consistent** with what "Execute Recommendation" will actually do — the assignment requires the user to verify these match.
5. **Strategy Visualization Panel** — see stretch goal below.
6. **Performance Analytics Panel** — see stretch goal below.
7. **Hand History / Log** — scrollable list of previous hands with outcomes.

---

## Stretch Goals (Required)

### Stretch #1: Strategy Visualization

Display the standard Blackjack basic-strategy matrix alongside the AI's recommendation, highlighting the cell that corresponds to the current game state.

**Requirements:**
- Render the basic-strategy chart as an HTML table (or CSS grid). Rows = player hand total (or soft total / pair), columns = dealer up-card (2, 3, 4, 5, 6, 7, 8, 9, 10, A).
- Cell contents use standard notation: **H** (hit), **S** (stand), **D** (double if allowed, else hit), **Ds** (double if allowed, else stand). Color-code: green = stand, red = hit, yellow = double.
- When the agent makes a recommendation, highlight the cell matching the current player total vs. dealer up-card with a visible outline/glow.
- Hard-code separate tables for **hard totals**, **soft totals** (hands containing a usable ace), and optionally **pairs** if split is implemented.
- Below the matrix, show a short comparison line: *"Basic strategy says: STAND. AI recommends: STAND. ✓ Match"* (or `✗ Divergence` if they differ — this is genuinely informative because it surfaces when the LLM is giving suboptimal advice).
- Keep a running count of Match vs. Divergence and display it — this feeds into Performance Analytics.

Hard/soft basic strategy tables are well-documented; embed them as 2D JS arrays at the top of the script.

### Stretch #2: Performance Analytics

Track and visualize agent performance across the session. Use **Chart.js** (via CDN) for the graphs.

**Metrics to track (all in-memory, reset on page reload):**
- **Hands played** — total count.
- **Win rate** — wins / (wins + losses), with pushes shown separately.
- **Bankroll history** — balance after each hand; plotted as a line chart over hand number.
- **Decision quality** — % of AI recommendations that matched basic strategy (pulled from Stretch #1's tracking).
- **Outcome breakdown** — wins / losses / pushes / blackjacks as a small stat grid or doughnut chart.

**Display:**
- A stats strip with the headline numbers (large font, one-line summary each).
- A **bankroll-over-time line chart** (Chart.js line chart, x-axis = hand number, y-axis = balance in dollars). Update after every hand.
- A **decision-quality bar** or small pie (matches vs. divergences).
- A "Reset Analytics" button that clears the session's analytics without touching the balance (or a separate "New Session" button that resets everything).

Keep the analytics data in a single JS object (e.g., `stats = { handsPlayed, wins, losses, pushes, blackjacks, bankrollHistory: [], decisions: { match: 0, divergence: 0 } }`) so it's easy to update and render.

---

## Testing & Verification Checklist

The assignment stresses extensive testing — build these verification points in from the start:

- [ ] Play at least 20 hands and confirm the **AI Analysis** text always matches the parsed action used by **Execute Recommendation**.
- [ ] Confirm the **Balance** updates correctly on win / loss / push / blackjack.
- [ ] Confirm the **bankroll history chart** matches the actual balance after each hand.
- [ ] Trigger a "tricky" LLM response (e.g., temporarily prompt the LLM to be verbose) and confirm the JSON parser still correctly extracts the action.
- [ ] Verify the `.env` key never appears in the DOM, in `localStorage`, or in any network request body beyond the LLM API call.
- [ ] Confirm the strategy-matrix highlight matches the current hand (check a few manually).

---

## Non-Goals / Explicit Exclusions

- No multiplayer, no real-money integration, no user accounts.
- No backend server; if a CORS issue arises calling the LLM API, document it rather than introducing a proxy.
- No `localStorage` / `sessionStorage` / cookies — keep everything in-memory per session. This is both a security posture (API key) and a constraint of the artifact environment.
- Card splits and insurance bets are optional; skip them if they complicate the state machine, and document the choice in a comment at the top of the file.

---

## File Deliverable

- `index.html` — single file, deployable to GitHub Pages by dropping it in the repo root or a `docs/` folder.
- Include a short `<!-- comment block -->` at the top of the file documenting: provider used (OpenAI/Gemini), model name, rule choices (dealer stands on 17 / six-deck shoe / split supported or not), and any known limitations.

---

## Suggested Build Order (for Claude Code)

1. Scaffold `index.html` with the UI shell, CSS, and placeholder panels.
2. Build the game engine (shoe, deal, hit, stand, double, dealer play, outcome resolution) — verify by playing manually with the override buttons.
3. Wire up the `.env` upload and API-key handling.
4. Implement the LLM call with structured JSON output and the parsing + validation logic. Log everything to console.
5. Add the AI Analysis panel and the Execute Recommendation flow.
6. Build the Strategy Visualization matrix with the current-state highlight and match/divergence indicator.
7. Build the Performance Analytics panel and Chart.js bankroll chart.
8. Play 20+ hands end-to-end; fix anything that looks off; tidy up styling.
