# 🎸 Neon Rhythm — Game Design Specification

## Overview

| Field | Value |
|---|---|
| **Title** | Neon Rhythm |
| **Genre** | Rhythm / Music (Guitar Hero–style) |
| **Theme** | EDM / Rave — high-contrast neon, pulsing lasers, beat-drop euphoria |
| **Platform** | Web browser (static, GitHub Pages compatible) |

---

## Technical Stack

- **Rendering:** HTML5 Canvas (game highway + notes)
- **Audio:** Web Audio API (low-latency sync)
- **Languages:** HTML5, CSS3, JavaScript ES6+
- **Deployment:** 100% static. No Node.js, no server, no database.
- **Paths:** All asset references are relative.

---

## File Structure

```
/
├── index.html          ← Single entry point
├── spec.md             ← This document
├── css/
│   └── style.css       ← Neon pulse keyframe animations, UI styling
├── js/
│   └── game.js         ← requestAnimationFrame loop, audio sync, input
└── assets/
    ├── audio/          ← Background tracks (.ogg/.mp3), hit sounds
    └── images/         ← Background textures, sprites (optional)
```

---

## Visual Identity

| Element | Value |
|---|---|
| **Primary colors** | Neon Pink `#ff00ff`, Cyan `#00ffff`, Lime Green `#39ff14` |
| **Background** | Deep black `#0a0a0a` with subtle scanline texture |
| **Note glow** | `box-shadow: 0 0 15px [lane-color]` on all falling notes |
| **Font** | High-energy display font (e.g. Orbitron, Audiowide) |
| **Rave Mode** | Strobe/laser CSS background animation triggered at 8x combo |
| **Beat feedback** | CSS `shake` or `flash` animation at combo milestones (×10) |

---

## UI / UX Flow

### Start Screen
- Full-screen neon title card.
- Animated subtitle or tagline.
- Prompt: **"Press SPACE to Start"**

### Game Screen
- Canvas highway (center).
- HUD overlays: Score (top-left), Combo multiplier (top-right), Vibe Meter health bar (bottom or side).
- Lane key labels (`D` `F` `J` `K`) displayed in the Hit Zone.

### Results Screen
- Displays: Final Score, Max Combo, accuracy breakdown.
- **"Restart"** button to return to Start Screen.

---

## Game Mechanics

### The Highway

- 4 vertical lanes, one per key: `D`, `F`, `J`, `K`.
- Notes (neon rectangles / glowing orbs) fall top → bottom.
- **Hit Zone** is a fixed horizontal bar near the bottom of the canvas.

### Note Data Format

```js
const NOTES = [
  { time: 0.8,  lane: 0 },  // lane 0 = D
  { time: 1.2,  lane: 2 },  // lane 2 = J
  { time: 1.6,  lane: 1 },  // lane 1 = F
];
```

Note spawning is driven by `audio.currentTime` so visuals and audio stay locked.

### Timing Windows

| Rating | Window | Points |
|---|---|---|
| **Perfect** | ±40ms | 300 |
| **Good** | ±100ms | 100 |
| **Miss** | outside window | 0, −health |

### Combo & Multiplier

| Combo | Multiplier |
|---|---|
| 0–9 | ×1 |
| 10–19 | ×2 |
| 20–39 | ×4 |
| 40+ | ×8 |

- Any **Miss** resets combo to 0 and drops the multiplier.
- Reaching **×8** triggers **Rave Mode** (see Visual Identity).

### Vibe Meter (Health)

- Starts full (100).
- Each **Miss** reduces health by a fixed amount.
- **Perfect** hits restore a small amount.
- Reaching **0** → immediate Game Over.

### Win / Loss

- **Win:** Song completes with Vibe Meter > 0.
- **Loss:** Vibe Meter hits 0 at any point during the song.

---

## Audio Architecture

- Background track loaded via `<audio>` tag or `AudioContext.decodeAudioData`.
- `audio.currentTime` is the single source of truth for note scheduling.
- Hit sound effects played via short `AudioBuffer` on each successful key press.
- All audio files stored in `/assets/audio/` with relative paths.

---

## Implementation Notes for Developers

1. **`index.html`** — entry point; loads CSS and JS, hosts the Canvas element and all screen divs.
2. **`css/style.css`** — all keyframe animations (`@keyframes neonPulse`, `@keyframes shake`, `@keyframes strobe`), lane colors, HUD layout.
3. **`js/game.js`** — structured into clear sections:
   - **State** — score, combo, health, gamePhase
   - **Renderer** — `requestAnimationFrame` loop, canvas draw calls
   - **Input** — `keydown` listener mapped to lanes
   - **Audio** — playback control, currentTime polling
   - **Notes** — spawn logic, collision/timing detection, cleanup
4. No build tools required — plain JS/CSS, loadable directly from the filesystem or any static host.
