# Product Review Generator — spec.md

## Overview
Single-file (`index.html`) web app that lets users generate AI-powered product reviews by calling LLM APIs directly from the browser. Ready for GitHub Pages deployment.

## LLM Providers
- **OpenAI** — discover available models via `GET https://api.openai.com/v1/models` (filter to GPT chat models). Generate reviews via `POST https://api.openai.com/v1/chat/completions`.
- **Google Gemini** — discover models via `GET https://generativelanguage.googleapis.com/v1beta/models?key=KEY` (filter to generateContent-capable models). Generate via `POST https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key=KEY`.

## API Key Handling
- On page load, prompt for API keys via a setup modal (fields for OpenAI key and Gemini key; at least one required).
- Store keys **in memory only** (JS variables). Never persist to localStorage or send anywhere except the respective API.
- Show a small "Change Keys" button in the header to re-open the modal.

## UI Layout

### Header
- App title: **Product Review Generator**
- "About" button → modal explaining FTC rules on AI-generated reviews, the alignment problem, and ethical use (use content from the assignment).
- "Change Keys" button.

### Basic Product Information (fieldset)
- **Product Name** — text input (required).
- **Category** — dropdown: Electronics, Home & Kitchen, Sports & Outdoors, Books, Clothing, Food & Beverage, Automotive, Other.

### Review Settings — Rich UI Components (sliders, not dropdowns)
- **Length** — range slider: Short / Medium / Long (3 stops, labeled).
- **Tone** — range slider: Formal ↔ Conversational (continuous or 3-5 stops).
- **Comments** — textarea for extra instructions (key features, strengths, weaknesses, experiences).

### LLM and Sentiment Selection (fieldset)
- **LLM Family** dropdown — populated dynamically: show "OpenAI (N models)" and/or "Google Gemini (N models)" based on which keys were provided. On family change, update the Model dropdown.
- **Model** dropdown — populated from the discovered models for the selected family. Star (⭐) the flagship/latest model and select it by default.
- **Sentiment** — emoji row or segmented control: Very Negative 😡 | Negative 😟 | Neutral 😐 | Positive 🙂 | Very Positive 😍. Default to Positive.

### Generate Button
- Prominent "Generate Review" button.
- Disable and show spinner while waiting for API response.

### Review Output
- Display the generated review in a styled card below the form.
- **Render markdown** from the model response as formatted HTML (use a lightweight lib like `marked` from CDN, or hand-roll basic markdown→HTML).
- Include a "Copy to Clipboard" button on the review card.

## Prompt Construction
Build the system/user prompt from the form inputs:

```
System: You are a product reviewer. Write a {length} {tone} review for a product in the {category} category with a {sentiment} sentiment.

User: Product: {name}
Additional context: {comments}
```

Map slider positions to descriptive words (e.g., tone slider at 20% → "very formal", at 80% → "casual and conversational").

## Model Discovery & Caching
- Fetch available models once per session when a key is entered.
- Cache the model lists in memory so switching families is instant.
- Show "Models discovered successfully (cached)" status text.
- Handle errors gracefully (invalid key → clear message, network error → retry option).

## Technical Constraints
- **Single file**: one `index.html`, all CSS and JS inline. External CDN imports allowed (marked.js, etc.).
- **No backend / no Node.js server**: all API calls go directly from the browser via fetch.
- **No localStorage**: keys and state live in JS variables only.
- **Responsive**: should look decent on mobile.

## About Modal Content
Include sections on:
1. **FTC Rule** — The FTC banned fake/AI-generated reviews as of Oct 21 2024. Fines up to $51,744 per violation. Covers fake reviews, incentivized reviews, insider reviews, fake social media indicators.
2. **Ethical Use** — Risks of deepfakes, misinformation, bias in AI models. Importance of responsible use.
3. **Human Alignment** — The alignment problem, paperclip maximizer thought experiment, real-world examples (TrafficFlow experiment with ChatGPT o1).
