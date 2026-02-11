# Ghost Julia Set Explorer - Specification

## 1. Project Overview
A web-based fractal explorer that renders Julia Sets using Inverse Iteration or Orbit Accumulation (Buddha-Julia technique). Instead of coloring a pixel based on whether it escapes, this explorer tracks the "path" of points and increments a light-map, creating a glowing, ghostly effect.

## 2. Technical Architecture
- **Language:** HTML5, CSS3, JavaScript (ES6+)
- **Rendering:** HTML5 Canvas (2D Context for light-map manipulation)
- **Performance:** Use `requestAnimationFrame` for progressive rendering (adding "light" over time so the image gets clearer the longer you wait)

## 3. Core Features

### A. The "Ghost" Engine
- **Orbit Accumulation:** For every point calculated, store the coordinates of every step in its "journey" (z₀, z₁, z₂...) in a 2D array (the "light map")
- **Density Mapping:** Pixels with more "hits" should glow brighter
- **Progressive Refinement:** The app should constantly calculate new random points and add them to the canvas, making the image "evolve" from noise into a clear fractal

### B. User Controls
- **c Parameter Control:** Sliders for `c.real` and `c.imaginary` to change the shape of the "ghost"
- **Exposure/Brightness:** A slider to control the intensity of the light accumulation
- **Color Palettes:**
  - *Nebula:* Deep blues and purples
  - *Solar:* Oranges, reds, and yellows
  - *Ethereal:* Pure white on a black background

### C. Interaction
- **Click-to-Target:** Clicking on the canvas sets the center of the Julia set
- **Auto-Morph Toggle:** A button that slowly oscillates the c value, making the "ghost" appear to breathe or shift shapes automatically

## 4. UI Layout
- **Main View:** Full-screen canvas
- **Sidebar (Semi-transparent):**
  - Header: "The Ghost in the Machine"
  - Iteration Count (Live display of how many millions of points have been processed)
  - c value sliders
  - Color theme selector
  - "Clear & Restart" button (to wipe the light map and start a new shape)
  - "Download PNG" button

## 5. Technical Requirements & Logic

### The Math
Instead of `z = z² + c`, use the **Inverse Iteration Method** for faster "ghost" generation:

```
z_new = ±√(z_old − c)
```

Randomly choose the `+` or `−` root at each step to wander the fractal boundary.

### Memory Management
The light-map should be a `Uint32Array` the size of `width * height` to prevent browser lag.

### Responsive Design
Canvas should resize to fit the browser window dynamically.

## 6. Architecture Notes
- Modular ES6 module system (no build tools required)
- Web Worker fallback for performance-intensive calculations
- Progressive rendering using `requestAnimationFrame`
