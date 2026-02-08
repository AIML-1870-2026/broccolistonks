# Technical Specification: Mitosis - Turing Patterns

## 1. Project Overview

Mitosis is an interactive web-based simulation visualizing Alan Turing's reaction-diffusion theory through the lens of cellular division. The project demonstrates how the Gray-Scott model creates blob-like patterns that split and multiply—mirroring the biological process of mitosis.

## 2. System Architecture

Single-file client-side application optimized for real-time GPU-accelerated simulation.

### 2.1 Technology Stack

- **Rendering**: WebGL 1.0/2.0 with GLSL fragment shaders
- **Simulation**: Gray-Scott reaction-diffusion model
- **Technique**: Double-buffer (ping-pong) texture swapping

## 3. Functional Requirements

### 3.1 Reaction-Diffusion Engine

Gray-Scott model parameters tuned for mitosis-like patterns:

- **Feed Rate (f)**: 0.0367 (default) - Controls chemical A replenishment
- **Kill Rate (k)**: 0.0649 (default) - Controls chemical B removal
- **Diffusion Rates**: Da = 1.0, Db = 0.5

### 3.2 Cell Cycle Phases

Six preset parameter configurations representing mitosis phases:

| Phase | Feed (f) | Kill (k) | Description |
|-------|----------|----------|-------------|
| Interphase | 0.0367 | 0.0649 | Growth & DNA replication |
| Prophase | 0.0380 | 0.0640 | Chromatin condenses |
| Metaphase | 0.0390 | 0.0630 | Chromosomes align |
| Anaphase | 0.0350 | 0.0655 | Separation begins |
| Telophase | 0.0340 | 0.0660 | Nuclear division |
| Cytokinesis | 0.0320 | 0.0665 | Cell splits in two |

### 3.3 Interactive Features

- **Real-time Parameter Adjustment**: Sliders for f, k, Da, Db
- **Canvas Interaction**: Click/drag to seed new cells (inject chemical B)
- **Brush Size Control**: Mouse wheel or slider
- **Phase Presets**: One-click phase selection

### 3.4 Visualization Modes

- **Cellular**: Purple cytoplasm to pink nucleus gradient
- **Membrane**: Edge-detection highlighting cell boundaries
- **X-Ray**: Grayscale microscope-style view

## 4. Technical Requirements

### 4.1 Performance

- 60 FPS at 512x512 resolution
- 10 simulation steps per frame
- Adaptive resolution (256-768px based on screen size)

### 4.2 Compatibility

- WebGL 1.0/2.0 browsers (Chrome, Firefox, Safari, Edge)
- Touch support for mobile devices
- Responsive UI

## 5. UI/UX Design

- **Cellular Aesthetic**: Purple/pink color scheme evoking biological imagery
- **Floating Control Panel**: Minimalist, translucent design
- **Info Panel**: Educational content about Turing patterns and cell division

## 6. Data Schema (Phases)

```json
{
  "phaseName": "interphase",
  "name": "Interphase",
  "feed": 0.0367,
  "kill": 0.0649,
  "da": 1.0,
  "db": 0.5,
  "desc": "Cells grow and replicate DNA. Patterns form slowly and remain stable."
}
```
