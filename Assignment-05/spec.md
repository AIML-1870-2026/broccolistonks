# Assignment-05: Snake Quest - Space Probe

## Theme
**Space Probe / Satellite** - You pilot an orbiting satellite through deep space, collecting data packets and dodging gravity wells.

## Visual Design
- Deep space background with twinkling stars
- Snake (satellite trail): glowing white head with fading blue-white trail
- Food (data packets): pulsing golden hexagons
- Gravity wells (planets): circular objects that slow or speed up the snake when nearby
- HUD styled like a mission control readout
- Particle effects on data collection

## Core Mechanics
- Arrow key + WASD navigation
- Touch/swipe support for mobile
- Snake grows when collecting data packets
- Game over on collision with self or walls
- Score increases per packet collected

## Enhancements
- **Gravity Wells**: Planet-like obstacles that appear as score increases; snake speeds up or slows down when near them
- **Dynamic Difficulty**: Speed increases gradually with score
- **Pause**: Space or P
- **High Score**: Persisted in localStorage
- **Star field**: Parallax scrolling background stars
- **Particle trails**: Satellite leaves engine particles

## Controls
| Input | Action |
|-------|--------|
| Arrow Keys / WASD | Change direction |
| Space / P | Pause / Resume |
| Enter / Click | Start / Restart |
| Swipe (mobile) | Change direction |

## Technical
- Single `index.html` file
- Canvas-based rendering
- setInterval game loop for logic, rAF for rendering
- No external dependencies
