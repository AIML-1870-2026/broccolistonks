# Project Specification: RGB Petal Wheel Quest

## 1. Overview
Build an interactive RGB Color Wheel using HTML, CSS, and JavaScript. The application allows users to manipulate Red, Green, and Blue light channels to see how they mix additively, forming a "petal wheel" visual.

## 2. Technical Stack
- **Single File:** All code must be contained within `index.html` (internal CSS and JS).
- **Languages:** HTML5, CSS3, Vanilla JavaScript.

## 3. Core Requirements

### HTML Structure
- A container for the Petal Wheel.
- Three input sliders (`type="range"`) representing Red, Green, and Blue (values 0-255).
- A display area for the current RGB values (e.g., `rgb(255, 0, 0)`).
- A Hex code display that updates in real-time.

### CSS Styling & Visuals
- **The Petals:** Create three overlapping circular "petals" (Red, Green, and Blue).
- **Blending:** Use `mix-blend-mode: screen;` (or `lighten`) on the petals so that where they overlap, they create Cyan, Magenta, Yellow, and White.
- **Layout:** Center the wheel in the viewport. Style the sliders to be clean and modern.

### JavaScript Logic
- Event listeners for all three sliders.
- Update the background color or "fill" of each petal based on its respective slider value.
- Dynamically calculate and display the resulting RGB and Hex strings.

## 4. Specific Feature: Pulse & Breathing Effect
- **Target:** Apply this effect to the central area where all three colors mix (the white/composite center).
- **Behavior:** Use CSS animations to create a subtle "breathing" scale effect (e.g., scaling from 1.0 to 1.05) and a "pulse" in opacity or box-shadow.
- **Trigger:** The effect should be active/visible when the colors are mixing.

## 5. Stretch Goal: Contrast Checker
- **Implementation:** Add a UI element that displays a sample text (e.g., "Sample Text") over a background colored by the current mixed RGB value.
- **Logic:**
  - Calculate the luminance of the mixed color.
  - Compare it against a standard text color (Black or White).
  - Display the WCAG Contrast Ratio (e.g., `4.5:1`).
  - Provide a visual indicator (PASS/FAIL) for Accessibility (AA/AAA standards).

## 6. Functional Instructions for the Agent
- **Initialize:** Create a responsive layout with a dark theme background to make the "light" colors pop.
- **Petal Logic:** Position the three petals in a triangular formation so they overlap at the center.
- **Color Sync:** Ensure that moving the "Red" slider only affects the Red petal's intensity, and so on.
- **Math:** Convert the 0-255 slider values to a Hexadecimal string for the display.
- **Animation:** Use `@keyframes` for the breathing effect on the center intersection.
- **Contrast Logic:** Use the formula: `L = 0.2126 * R + 0.7152 * G + 0.0722 * B` (where R, G, B are normalized 0-1) to determine if text should be black or white for best readability.
