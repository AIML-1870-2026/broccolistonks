# Technical Specification: Turing Patterns Quest

## 1. Project Overview

Turing Patterns Quest is an interactive web-based simulation and educational tool designed to visualize Alan Turing's "Reaction-Diffusion" theory. The project aims to demonstrate how complex biological patterns (like tiger stripes or leopard spots) emerge from the interaction of two simple chemicals.

## 2. System Architecture

The application follows a client-side heavy architecture to ensure real-time simulation performance.

### 2.1 Technology Stack

- **Frontend**: React.js or Vue.js for the UI layer.
- **Simulation Engine**: WebGL/GLSL (Fragment Shaders) for GPU-accelerated computation.
- **State Management**: Context API or Redux for handling simulation parameters.
- **Math Library**: Gl-matrix or similar for vector/matrix operations.

## 3. Functional Requirements

### 3.1 Reaction-Diffusion Engine

The core of the application must solve the Gray-Scott model equations:

- **Feed Rate ($f$)**: Controls the addition of chemical $A$.
- **Kill Rate ($k$)**: Controls the removal of chemical $B$.
- **Diffusion Rates ($D_a, D_b$)**: The speeds at which chemicals spread.

### 3.2 Interactive Features

- **Real-time Parameter Adjustment**: Sliders to modify $f$, $k$, and diffusion rates without resetting the simulation.
- **Canvas Interaction**: Users can "draw" on the canvas to inject chemical $B$ and observe how patterns grow from the disturbance.
- **Presets Gallery**: A collection of pre-defined $f/k$ values that produce specific patterns (e.g., "Mitosis," "Coral," "Fingerprints").

### 3.3 Educational Content

- **Narrative Stepping**: A guided "Quest" mode that introduces concepts one by one.
- **Visualization Modes**: Toggle between grayscale (chemical concentration) and false-color heatmaps.

## 4. Technical Requirements

### 4.1 Performance

- The simulation must maintain 60 FPS at a resolution of at least 512x512 pixels.
- Calculation must be performed on the GPU using a double-buffer (ping-pong) texture technique.

### 4.2 Compatibility

- Must support WebGL 1.0/2.0 enabled browsers (Chrome, Firefox, Safari, Edge).
- Responsive design to allow mobile interaction (touch-based chemical injection).

## 5. UI/UX Design

- **Minimalist Interface**: Floating control panel to maximize the visual area of the simulation.
- **Exploration Map**: A 2D plot of the $f/k$ parameter space where users can click to jump to different "phases" of pattern formation.

## 6. Data Schema (Presets)

Presets should be stored in a JSON format:

```json
{
  "presetName": "Brain Coral",
  "feed": 0.0545,
  "kill": 0.062,
  "da": 1.0,
  "db": 0.5
}
```

## 7. Future Roadmap

- **3D Implementation**: Extending the reaction-diffusion to a 3D volumetric renderer.
- **Export Functionality**: Allow users to export high-resolution frames or GIFs of their patterns.
- **Multi-Chemical Systems**: Incorporating a third chemical to simulate more complex biological morphogenesis.
