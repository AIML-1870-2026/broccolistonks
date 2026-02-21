# Readable Explorer — Spec

## 1. Project Overview

The **Readable Explorer** is an interactive web-based tool designed to help developers and designers test color accessibility. It allows users to manipulate background and text colors via synchronized RGB inputs, adjust font sizes, and view real-time WCAG compliance data based on calculated contrast ratios.

## 2. Technical Stack

- **Languages:** HTML5, CSS3, JavaScript (ES6+)
- **Architecture:** Single-page application (SPA) contained within `index.html`.
- **Styling Approach:** Modern CSS using Flexbox/Grid, CSS Variables for dynamic state, and a "Mobile First" responsive design.

## 3. UI/UX Design Requirements

- **Layout:** A two-column layout on desktop. Left side: Control Panel (Inputs/Sliders). Right side: Live Preview Area & Analytics (Contrast/Compliance).
- **Visual Style:** Clean, minimalist interface (similar to "Coolors" or "Adobe Color"). Use subtle shadows, rounded corners (8px+), and clear typography.
- **Interactivity:** All sliders and number inputs must be perfectly synchronized. Changing a slider updates the number; typing in a number updates the slider.

## 4. Functional Requirements

### 4.1 Color Controls (Background & Text)

- Two distinct control groups: **Background Color** and **Text Color**.
- Each group must contain:
  - Three Sliders (R, G, B) ranging from 0–255.
  - Three Number Input fields (R, G, B) ranging from 0–255.
  - A Hex code display/input for advanced users.

### 4.2 Text Size Control

- A slider (Range: 12px to 80px).
- A synchronized number input/display.
- Default value: 18px.

### 4.3 Live Preview Area

- A dedicated container that dynamically updates its `background-color`, `color`, and `font-size` based on the inputs.
- Should contain a few paragraphs of "Lorem Ipsum" or a sample "Readability Statement."

### 4.4 Technical Calculations (The Engine)

The application must implement the following mathematical formulas:

- **Luminance (L):** Calculated using the standard formula:
  - `L = 0.2126 * R + 0.7152 * G + 0.0722 * B` (where R, G, B are normalized 0–1 sRGB values).
- **Contrast Ratio:** Calculated as `(L1 + 0.05) / (L2 + 0.05)`, where L1 is the lighter color and L2 is the darker color. Result should be expressed as `X:1`.

### 4.5 WCAG Compliance Indicator

- **Normal Text (Level AA):** Pass if ratio >= 4.5:1.
- **Large Text (Level AA):** Pass if ratio >= 3:1 (defined as 18pt/24px or 14pt/18.6px bold).
- **Visual Feedback:**
  - Use "Pills" or "Badges" that turn Green (Success) or Red (Danger).
  - Include an icon (Checkmark / X) alongside the text label "PASS" or "FAIL".

## 5. Implementation Logic (JavaScript)

1. **Initialization:** Set default colors (e.g., BG: White, Text: Dark Grey).
2. **Event Delegation:** Use an `input` event listener on a parent container to capture all slider/number changes efficiently.
3. **Update Cycle:**
   - Update the UI state.
   - Update CSS Variables on the document root or preview element.
   - Recalculate Luminance for both sets.
   - Recalculate Contrast Ratio.
   - Evaluate WCAG status and update the DOM indicators.

## 6. Accessibility & Best Practices

- **Semantic HTML:** Use `<section>`, `<label>`, `<output>`, and `<fieldset>`.
- **ARIA Labels:** Ensure sliders have descriptive labels for screen readers.
- **Responsive Design:** Ensure the control panel stacks vertically on mobile devices.

## 7. Delivery Format

- Provide all code in a single `index.html` file.
- Use a `<style>` block for CSS and a `<script>` block for JS.
- Comment the logic for Luminance and Contrast calculations clearly for educational purposes.
