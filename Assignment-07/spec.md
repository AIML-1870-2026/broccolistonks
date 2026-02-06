# Turing Patterns: Terrain Genesis - Project Specification

## Project Overview
An interactive reaction-diffusion simulation that visualizes Turing patterns as topographic terrain maps. Based on Alan Turing's 1952 paper proposing that simple chemical rules can spontaneously generate complex natural patterns, this project renders the Gray-Scott model as dynamic elevation data complete with contour lines, relief shading, and a 3D terrain visualization stretch goal.

## Author
**Brenden Fischer**

## Live Demo
https://aiml-1870-2026.github.io/broccolistonks/Assignment-07/

## Theme: Topographic Terrain

### Visual Concept
- **Environment:** Cartographic aesthetic with paper/parchment texture undertones
- **Patterns:** Rendered as elevation maps where chemical concentration = height
- **Effects:** Contour lines, hillshade relief, subtle grid overlay
- **Color Palette:** Earth tones (greens, browns, tans) transitioning to ocean blues for low elevations
- **Atmosphere:** Survey map styling with coordinate markers and scale indicators

### Pattern Appearance
- Chemical A concentration maps to elevation (high = peaks, low = valleys)
- Contour lines at regular elevation intervals
- Optional hillshade from configurable light direction
- Color ramps inspired by USGS topographic maps
- Grid overlay for scientific/cartographic feel

## Core Reaction-Diffusion System

### The Gray-Scott Model
Two virtual chemicals (A and B) interact according to:
1. **Feed:** Chemical A is continuously added at rate F
2. **Kill:** Chemical B decays at rate K
3. **Reaction:** A + 2B → 3B (autocatalytic conversion)
4. **Diffusion:** Both chemicals spread outward (A faster than B)

The interplay of these rules creates emergent patterns: spots, stripes, waves, and chaos.

## Required Features

### Interactive Controls (Sliders)
| Control | Range | Default | Description |
|---------|-------|---------|-------------|
| Feed Rate (F) | 0.01 - 0.1 | 0.055 | Rate chemical A is replenished |
| Kill Rate (K) | 0.03 - 0.07 | 0.062 | Rate chemical B decays |
| Diffusion A | 0.5 - 1.5 | 1.0 | How fast chemical A spreads |
| Diffusion B | 0.1 - 0.8 | 0.5 | How fast chemical B spreads |
| Simulation Speed | 1 - 20 | 10 | Iterations per frame |

### Parameter Space Navigator
- Visual 2D diagram showing F (x-axis) vs K (y-axis)
- Clickable regions to jump to known pattern types
- Current position indicator (crosshair or dot)
- Labeled zones: "Spots," "Stripes," "Waves," "Mitosis," "Chaos"

### Preset Buttons
| Preset | Pattern Type | F | K | Terrain Analogy |
|--------|--------------|---|---|-----------------|
| **Archipelago** | Spots | 0.034 | 0.059 | Scattered island chains |
| **Mountain Range** | Stripes | 0.046 | 0.063 | Parallel ridgelines |
| **Coral Atolls** | Rings | 0.014 | 0.047 | Circular reef formations |
| **Badlands** | Waves | 0.078 | 0.061 | Eroded canyon networks |
| **Tectonic Chaos** | Unstable | 0.026 | 0.051 | Fractured, shifting terrain |

### Canvas Interaction
- **Click/Drag:** "Disturb" the simulation by injecting chemical B
- **Brush Size Slider:** Adjust disturbance radius (5-50px)
- **Brush Type Toggle:** Add chemical B (create peaks) or remove (create valleys)

### On-Screen Instrumentation
- **Iteration Counter:** Total simulation steps elapsed
- **FPS Counter:** Frames per second
- **Current F/K Display:** Active parameter values
- **Min/Max Elevation:** Range of current concentration values

### Core Controls
- **Play/Pause Toggle:** Freeze/resume simulation
- **Reset Button:** Clear canvas and reinitialize chemicals
- **Clear to Flat:** Reset to uniform state (no pattern)
- **Seed Pattern:** Add random disturbances to kickstart patterns

### Color Scheme Selector
| Scheme | Description |
|--------|-------------|
| **Classic Topo** | Green lowlands → brown highlands → white peaks |
| **Bathymetric** | Deep blue → cyan → green → brown (ocean floor to mountains) |
| **Mars** | Red/orange desert terrain |
| **Greyscale Relief** | Black valleys → white peaks (printable) |
| **Heatmap** | Scientific blue-white-red gradient |

### Terrain Rendering Options
- **Contour Lines Toggle:** Show/hide elevation contours
- **Contour Interval Slider:** Spacing between contour lines
- **Hillshade Toggle:** Enable relief shading
- **Light Angle Slider:** Direction of hillshade illumination (0-360°)
- **Grid Overlay Toggle:** Show coordinate grid

## Stretch Goal: 3D Terrain Visualization

### WebGL Height Map Renderer
- Real-time 3D mesh generated from concentration data
- Chemical concentration directly maps to vertex height
- Smooth interpolation between grid points

### 3D View Controls
- **Orbit Camera:** Click-drag to rotate view
- **Zoom:** Scroll wheel or pinch gesture
- **Tilt Angle Slider:** Adjust viewing elevation (10° - 90°)
- **Rotation Slider:** Manual azimuth control (0° - 360°)
- **Exaggeration Slider:** Vertical scale multiplier (1x - 10x)

### 3D Visual Features
- Terrain mesh with same color schemes as 2D view
- Directional lighting with adjustable sun position
- Optional wireframe overlay
- Fog/atmosphere for depth perception
- Water plane at configurable elevation (fills valleys)

### View Mode Toggle
- **2D Map View:** Traditional top-down cartographic display
- **3D Terrain View:** Perspective height map visualization
- **Split View:** Side-by-side 2D and 3D (if screen space permits)

### 3D Export Options
- Screenshot capture (PNG)
- Height map export (grayscale PNG for use in other tools)

## Technical Specifications

### Technologies
- HTML5 Canvas (2D pattern computation and rendering)
- WebGL / Three.js (3D terrain visualization)
- CSS3 (UI styling, cartographic aesthetics)
- Vanilla JavaScript (simulation logic)
- RequestAnimationFrame (animation loop)

### File Structure
```
Assignment-07/
├── index.html      # Main application
├── spec.md         # This specification document
└── assets/         # (optional) Textures, color ramps
```

### Performance Targets
- Maintain 30+ FPS during simulation on 256x256 grid
- Smooth 3D rendering at 60 FPS
- Efficient double-buffering for reaction-diffusion computation
- Consider WebGL compute shaders for larger grids (512x512+)

### Canvas/Grid Specifications
- Default simulation grid: 256 x 256 cells
- Responsive canvas sizing (fills container)
- Pixel ratio handling for retina displays

## Color Palette

| Element | Color | Hex |
|---------|-------|-----|
| Background | Parchment cream | `#f4f1e8` |
| UI Panel | Semi-transparent white | `rgba(255,255,255,0.9)` |
| Contour Lines | Dark brown | `#5c4033` |
| Grid Lines | Light gray | `#cccccc` |
| Low Elevation | Ocean blue | `#1a5276` |
| Mid-Low | Coastal green | `#2e7d32` |
| Mid | Grassland tan | `#c9b458` |
| Mid-High | Highland brown | `#8b5a2b` |
| High Elevation | Rocky gray | `#808080` |
| Peak | Snow white | `#ffffff` |
| Accent/Interactive | Survey orange | `#ff6b35` |

## Implementation Phases

### Phase 1: Core Simulation Engine
- [ ] Set up HTML canvas and basic UI structure
- [ ] Implement Gray-Scott reaction-diffusion algorithm
- [ ] Double-buffer system for stable computation
- [ ] Basic grayscale concentration rendering
- [ ] Mouse interaction to disturb chemicals

### Phase 2: Parameter Controls & Presets
- [ ] Slider controls for F, K, diffusion rates, speed
- [ ] Parameter space diagram (clickable F-K map)
- [ ] Preset buttons with terrain-themed names
- [ ] Instrumentation display (iterations, FPS, values)
- [ ] Play/Pause, Reset, Clear, Seed controls

### Phase 3: Topographic Rendering
- [ ] Implement color ramp mapping (concentration → elevation color)
- [ ] Multiple color scheme options
- [ ] Contour line generation algorithm
- [ ] Hillshade relief calculation
- [ ] Grid overlay rendering
- [ ] Themed UI panel styling (cartographic look)

### Phase 4: Stretch Goal - 3D Visualization
- [ ] Integrate Three.js for WebGL rendering
- [ ] Generate terrain mesh from concentration grid
- [ ] Orbit camera controls
- [ ] Apply color schemes to 3D mesh
- [ ] Lighting and atmosphere effects
- [ ] Water plane implementation
- [ ] View mode toggle (2D / 3D / Split)
- [ ] Export functionality

## Algorithm Reference

### Gray-Scott Update Step (per cell)
```
A' = A + (dA * laplacian(A) - A*B*B + F*(1-A)) * dt
B' = B + (dB * laplacian(B) + A*B*B - (K+F)*B) * dt
```

Where:
- `dA`, `dB` = diffusion rates
- `laplacian()` = sum of 4 neighbors minus 4 times center
- `F` = feed rate, `K` = kill rate
- `dt` = time step (typically 1.0)

## Future Enhancements (Beyond Stretch)
- Multiple reaction-diffusion models (Brusselator, Schnakenberg)
- Animation recording / GIF export
- Terrain erosion simulation overlay
- Biome generation based on elevation + moisture
- VR/AR terrain exploration mode
- Procedural texture synthesis from patterns

## References
- Alan Turing, "The Chemical Basis of Morphogenesis" (1952)
- Karl Sims, Reaction-Diffusion Tutorial
- Robert Munafo, Gray-Scott Parameter Map

## Credits
Created with assistance from Claude Opus 4.5

## License
Personal project - All rights reserved
