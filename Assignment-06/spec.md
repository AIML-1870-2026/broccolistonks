# Deep Ocean Bioluminescence - Boids Project Specification

## Project Overview
An interactive boids simulation themed as bioluminescent deep-sea creatures (jellyfish/plankton) swimming through a dark ocean environment. Features the classic three boid behaviors with full parameter controls, presets, and a predator mechanic stretch goal.

## Author
**Brenden Fischer**

## Live Demo
https://aiml-1870-2026.github.io/broccolistonks/Assignment-06/

## Theme: Deep Ocean Bioluminescence

### Visual Concept
- **Environment:** Dark abyssal ocean with subtle blue-black gradient
- **Boids:** Glowing jellyfish/plankton with soft light halos
- **Effects:** Faint bioluminescent trails that fade over time
- **Color Palette:** Cyan, magenta, soft greens, and warm yellows against deep blue/black
- **Atmosphere:** Gentle particle effects (floating debris/bubbles) for depth

### Boid Appearance
- Semi-transparent circular bodies with radial glow
- Color intensity shifts based on speed (faster = brighter)
- Subtle pulsing animation on idle boids
- Direction indicated by slight elongation or tentacle trails

## Core Boid Behaviors

### The Three Rules
1. **Separation:** Creatures avoid crowding neighbors (personal space in the deep)
2. **Alignment:** Creatures steer toward average heading of nearby creatures
3. **Cohesion:** Creatures move toward the average position of the swarm

## Required Features

### Interactive Controls (Sliders)
| Control | Range | Default | Description |
|---------|-------|---------|-------------|
| Separation Weight | 0 - 5 | 1.5 | How strongly boids avoid crowding |
| Alignment Weight | 0 - 5 | 1.0 | How strongly boids match neighbor direction |
| Cohesion Weight | 0 - 5 | 1.0 | How strongly boids move toward group center |
| Neighbor Radius | 20 - 200 | 75 | How far each boid can "see" |
| Max Speed | 1 - 10 | 4 | Maximum velocity of boids |

### Preset Buttons
| Preset | Theme Description | Parameters |
|--------|-------------------|------------|
| **Gentle Drift** | Calm jellyfish floating lazily | Low speed, balanced weights, large radius |
| **Feeding Frenzy** | Plankton swarming toward nutrients | High cohesion, high speed, tight radius |
| **Scattered Panic** | Creatures fleeing in chaos | High separation, low cohesion, high speed |

### On-Screen Instrumentation
- **FPS Counter:** Frames per second (performance monitoring)
- **Boid Count:** Total creatures in simulation
- **Average Speed:** Mean velocity across all boids
- **Average Neighbors:** Mean neighbor count per boid

### Core Controls
- **Reset Button:** Respawn all boids in random positions
- **Pause/Resume Toggle:** Freeze/unfreeze simulation
- **Boundary Mode Switch:** Toggle between wrap-around and bounce-off edges
- **Boid Count Adjuster:** Add or remove creatures (+/- buttons or slider)

### UI/UX Requirements
- All controls clearly labeled
- Tooltips explaining each parameter in plain language
- Controls panel styled to match ocean theme (translucent, glowing edges)
- Mobile-friendly touch targets

## Stretch Goal: Predator Mechanics

### The Shark
- **Appearance:** Dark silhouette of a shark, larger than boids
- **Behavior:** Slowly patrols the canvas, follows mouse on hover/click
- **Effect on Boids:** Creatures within a "danger radius" flee at increased speed
- **Visual Feedback:**
  - Boids flash red/orange when in danger zone
  - Shark's eyes glow when near prey
  - Subtle "heartbeat" pulse effect on fleeing boids

### Predator Controls
- **Toggle Shark:** Button to enable/disable predator
- **Danger Radius Slider:** How far the shark's presence affects boids
- **Shark Speed Slider:** How fast the predator moves

## Technical Specifications

### Technologies
- HTML5 Canvas (2D rendering)
- CSS3 (UI styling, glow effects)
- Vanilla JavaScript (no frameworks)
- RequestAnimationFrame (smooth animation loop)

### File Structure
```
Assignment-06/
├── index.html      # Main HTML with embedded CSS/JS or linked files
├── spec.md         # This specification document
└── assets/         # (optional) Images, sounds
```

### Performance Targets
- Maintain 60 FPS with 100+ boids
- Smooth interactions with no input lag
- Efficient neighbor detection (consider spatial optimization if needed)

### Canvas Specifications
- Responsive sizing (fills viewport or container)
- Dark background: `#0a0a1a` to `#001122` gradient
- Boid glow rendered with `globalCompositeOperation: 'lighter'` or shadow blur

## Color Palette

| Element | Color | Hex |
|---------|-------|-----|
| Background (deep) | Near black | `#0a0a1a` |
| Background (lighter) | Dark blue | `#001133` |
| Boid Primary | Cyan glow | `#00ffff` |
| Boid Secondary | Magenta | `#ff00ff` |
| Boid Tertiary | Soft green | `#00ff88` |
| Danger State | Warning orange | `#ff6644` |
| Shark Silhouette | Dark gray | `#1a1a2e` |
| UI Accent | Soft blue | `#4488ff` |

## Animation Details

### Boid Rendering
- Base radius: 4-8px (randomized per boid)
- Glow radius: 2x base radius
- Trail length: 5-10 previous positions, fading opacity
- Pulse cycle: 2-3 seconds for idle glow animation

### Shark Animation
- Smooth sinusoidal swimming motion
- Tail oscillation synced to movement speed
- Shadow/depth effect beneath silhouette

## Implementation Phases

### Phase 1: Core Simulation
- [ ] Canvas setup with ocean background
- [ ] Basic boid class with position/velocity
- [ ] Implement separation, alignment, cohesion
- [ ] Basic rendering (circles)

### Phase 2: Controls & UI
- [ ] Slider controls for all 5 parameters
- [ ] Preset buttons with parameter snapshots
- [ ] Instrumentation display (FPS, count, speed, neighbors)
- [ ] Reset and pause functionality
- [ ] Boundary mode toggle

### Phase 3: Visual Polish
- [ ] Bioluminescent glow effects
- [ ] Color variations per boid
- [ ] Fading trail rendering
- [ ] Ambient particle effects (optional)
- [ ] Themed UI panel styling

### Phase 4: Stretch Goal - Predator
- [ ] Shark entity with patrol behavior
- [ ] Mouse-follow interaction
- [ ] Flee behavior for boids in danger radius
- [ ] Visual feedback (color change, pulse)
- [ ] Predator control panel

## Future Enhancements (Beyond Stretch)
- Sound design (ambient ocean, panic sounds)
- Multiple predator types
- Day/night cycle affecting visibility
- Food sources that attract boids
- Species variation (different boid types)

## Credits
Created with assistance from Claude Opus 4.5

## License
Personal project - All rights reserved
