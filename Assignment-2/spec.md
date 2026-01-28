# Assignment 2: Hyperspace Starfield

## Overview
An interactive particle system that simulates the Star Wars hyperspace effect, where stars streak past the viewer as if traveling at lightspeed.

## Live Demo
https://bfish065.github.io/starfield/Assignment-2/

## Technical Implementation

### Particle System
Each star is a particle with the following properties:
- **Position** (x, y): Current location on canvas
- **Velocity** (vx, vy): Speed and direction of movement
- **Size**: Random size for depth variation
- **Brightness**: Random alpha value for visual variety
- **Distance (z)**: Calculated distance from center for depth effects

### Core Mechanics

#### Initialization
- Stars spawn at random positions across the entire screen
- Velocity is calculated to move away from the center point
- Direction is normalized from star position to center, then inverted

#### Animation Loop
1. **Trail Effect**: Semi-transparent black overlay creates motion blur
2. **Update Phase**:
   - Stars accelerate outward each frame
   - Position updates based on velocity and speed multiplier
   - Out-of-bounds stars respawn at new random positions
3. **Render Phase**:
   - Draw star as colored circle
   - Draw gradient trail line behind fast-moving stars
   - Color shifts from blue to cyan based on velocity

#### Visual Effects
- **Motion Blur Trails**: Achieved by not fully clearing the canvas each frame
- **Speed-Based Colors**: HSL color shifts (200-240 hue range)
- **Dynamic Trail Length**: Longer trails for faster stars (capped at 50px)
- **Gradient Trails**: Linear gradient from transparent to semi-opaque

## Interactive Controls

| Control | Range | Default | Description |
|---------|-------|---------|-------------|
| Speed | 0.1 - 15.0 | 1.0 | Animation speed multiplier |
| Star Count | 100 - 2000 | 500 | Number of particles |
| Trail Length | 0.01 - 0.20 | 0.05 | Opacity of trail effect |
| Star Size | 0.5 - 5.0 | 2.0 | Base size multiplier |
| Acceleration | 1.001 - 1.020 | 1.005 | Velocity increase per frame |

## Design Features

### Responsive Design
- Canvas automatically resizes to fill viewport
- Control panel adapts to mobile screens
- Touch-friendly slider controls

### Performance Optimizations
- Single canvas element
- Efficient particle pooling (respawn vs. destroy/create)
- RequestAnimationFrame for smooth 60fps animation
- No DOM manipulation during animation loop

### UI/UX
- Compact control panel with semi-transparent backdrop
- Real-time value display for all controls
- Clean, minimal design that doesn't obstruct the animation
- Blue/cyan color scheme matching the starfield

## Technical Stack
- **HTML5 Canvas**: For rendering
- **Vanilla JavaScript**: Particle system and animation
- **CSS3**: Styling and responsive design
- **No external libraries**: Pure web standards

## Browser Compatibility
- Modern browsers with Canvas and ES6 support
- Tested on Chrome, Safari, Firefox
- Mobile-friendly with touch controls

## Future Enhancements (Optional)
- Add warp jump effect (sudden acceleration burst)
- Mouse interaction (stars avoid cursor or follow mouse)
- Color scheme selector (blue, red, green hyperspace)
- Depth layers (foreground/background star speeds)
- Sound effects toggle
- Fullscreen mode
- Screenshot/save frame feature

## Learning Objectives Demonstrated
1. **Particle Systems**: Understanding of individual particles with simple rules creating complex effects
2. **Canvas API**: Drawing shapes, gradients, and managing animation loops
3. **Vector Mathematics**: Direction calculation, normalization, distance
4. **Performance**: Efficient animation techniques
5. **User Interaction**: Real-time parameter adjustment
6. **Responsive Design**: Adapting to different screen sizes

## File Structure
```
Assignment-2/
├── index.html          # Single-file application (HTML + CSS + JS)
└── spec.md            # This specification document
```

## Development Notes
- All code contained in a single HTML file for easy deployment
- Particle reset logic prevents memory leaks
- Acceleration creates the "jumping to lightspeed" effect
- Trail alpha controls the "motion blur" persistence
