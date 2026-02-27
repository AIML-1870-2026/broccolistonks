# Assignment-13: Elemental Endless Runner — Specification

## 1. Project Overview
A high-polish, "juicy" endless runner built in a single `index.html` file. The game features four distinct elemental worlds where the player character's element is always the opposite of the environment. The core gameplay loop involves navigating multi-level platforms, dodging hazards, and surviving as long as possible.

## 2. Technical Stack
- **Languages:** HTML5, CSS3, JavaScript (Canvas API)
- **Architecture:** Single-file implementation (`index.html`)
- **State Management:** Simple game loop with `requestAnimationFrame`

## 3. Core Mechanics & Controls
- **Controls:** SPACE or Click/Tap to jump
- **Physics:**
  - Constant forward momentum (increases over time)
  - Gravity-based jumping with variable height (hold space for higher jumps)
- **Multi-Level Platforms:** Procedurally generated platforms at different Y-heights
- **World Selection:** A landing screen allows the player to choose one of four worlds before starting

## 4. Elemental World Design

| World       | Hazard               | Player Character  | Special Mechanic                                       |
|-------------|----------------------|-------------------|--------------------------------------------------------|
| 🔥 Lava     | Melting Platforms    | ❄️ Ice Cube       | Platforms shrink/disappear if stood on too long         |
| ❄️ Ice      | Slippery Slopes      | 🔥 Fire Ball      | Low friction; harder to stop/adjust position            |
| ⚡ Storm    | Lightning Bolts      | 🪨 Stone Golem    | Random vertical strikes from the sky                   |
| 🌿 Jungle   | Thorns/Spikes        | 💨 Cloud/Wind     | Vine swings or low-gravity "floaty" jumps              |

## 5. Level Generation (Pattern Library)
Instead of pure randomness, use **Chunk-Based Generation**. Create a library of at least 10 "chunks" (arrays of platform/hazard coordinates):

1. **The Staircase** — 3 platforms rising in height
2. **The Leap of Faith** — A large gap with a small platform in the center
3. **The Gauntlet** — A long flat stretch filled with spikes/hazards
4. **The High-Road** — Platforms positioned at the top of the screen
5. (+ 6 more variants)

## 6. The "Juice" (Game Feel)
To ensure the game feels "alive":

- **Squash & Stretch:** Player character compresses on landing and stretches during a jump
- **Parallax Background:** 3 layers (Far Mountains, Mid-Trees, Near-Ground) at different speeds
- **Particles:**
  - Dust puffs on landing
  - Elemental trails (snowflakes for ice player, embers for fire)
  - Death: Player shatters into 20+ particles on collision
- **Screen Shake:** Intense camera shake on death or lightning strikes
- **Freeze Frames:** Game pauses for 100ms exactly when the player hits a hazard
- **Easing:** Smooth transitions for UI elements and score counters

## 7. UI & Visuals
- **Menu:** Styled buttons for world selection
- **HUD:** High score (stored in `localStorage`) and current distance
- **Game Over:** A "Restart" button and a summary of the run
- **Theme:** CSS variables swap color palettes based on selected world
  - e.g., `--accent-color: #ff4400` for Lava

## 8. Development Phases
1. **Phase 1:** Setup basic Canvas, game loop, and "Ice World" logic
2. **Phase 2:** Implement the Pattern Library for platform generation
3. **Phase 3:** Add the "Juice" (Squash/Stretch, Particles, Screen Shake)
4. **Phase 4:** Build the World Selection menu and Elemental variations
5. **Phase 5:** Polish UI and ensure mobile responsiveness
