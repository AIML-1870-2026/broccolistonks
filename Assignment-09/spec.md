# Project Spec: The Decision Neuron Quest
## Scenario: Study vs. Sleep (Multi-Scenario Feature)

### 1. Overview
Build a single-file interactive web application that simulates a biological neuron making a decision. The core logic uses a weighted sum of inputs passed through a Sigmoid activation function. The primary scenario is "Study vs. Sleep," but the app must support switching to other decision presets.

### 2. Technical Stack
- **Language:** HTML5, CSS3, JavaScript (ES6+).
- **Format:** Single-file architecture (`index.html` containing all styles and scripts).
- **No External Libraries:** Do not use React, Vue, or Chart.js. Use Vanilla DOM manipulation and CSS transitions.

### 3. Core Logic (The Math)
The neuron must calculate the decision using the following steps:
1.  **Weighted Sum ($z$):** $z = (w_1 \cdot i_1) + (w_2 \cdot i_2) + \dots + b$
    - Where $i$ is the input value (0.0 to 1.0), $w$ is the weight, and $b$ is the bias.
2.  **Activation ($a$):** Pass $z$ through the Sigmoid function:
    $$a = \frac{1}{1 + e^{-z}}$$
3.  **Threshold:** If $a \ge 0.5$, the neuron "fires" (Decision A); otherwise, it stays dormant (Decision B).

### 4. Feature 1: Multi-Scenario Implementation
The UI must include a "Scenario Selector" (buttons or dropdown) that updates the following dynamically:
- **Title & Emojis:** e.g., "📚 Study vs. 😴 Sleep" or "💪 Gym vs. 🛋️ Couch".
- **Input Labels:** Change "Exam Urgency" to "Energy Level", etc.
- **Default Weights/Bias:** Each scenario should have a unique "personality" (e.g., making Sleep harder to resist at night).
- **Success Message:** Custom celebration text when the neuron fires.

### 5. UI Requirements
- **Input Section:** Two or three range sliders (0 to 1) for the inputs.
- **The Neuron Visual:** A central circle that:
    - Glows/pulses based on the activation value ($a$).
    - Changes color dramatically when it "fires" (e.g., grey to gold).
- **Math Dashboard:** A live display showing the current calculation ($z$ and $a$) so the user can see the logic in real-time.
- **Scenario Panel:** A clean set of buttons to toggle between:
    1. Study vs. Sleep (Primary)
    2. Adopt a Pet
    3. Tech Upgrade

### 6. Interactive Behavior
- Moving any slider should immediately update the Math Dashboard and the Neuron's visual state.
- When the threshold is met, trigger a CSS "burst" animation or a text "Celebration" appearing on screen.

### 7. File Structure Constraints
- All CSS must be within `<style>` tags in the `<head>`.
- All JS must be within `<script>` tags at the end of the `<body>`.
- Use a mobile-responsive layout (Flexbox/Grid).
