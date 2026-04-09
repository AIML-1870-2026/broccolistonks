# LLM Switchboard — Spec

Single-page HTML app (one file, no build tools) that lets a user interact with LLMs through their APIs.

## API Key Handling
- Accept keys via file upload (.env or .csv) **or** manual paste into input fields.
- Store keys in memory only (JS variables). Never persist to localStorage or anywhere else.
- Show a clear privacy notice: "Keys are held in memory only and cleared when you close or refresh this page."
- Support two providers: **OpenAI** and **Anthropic**.

## Provider & Model Selection
- Toggle between OpenAI and Anthropic.
- Hardcoded model lists per provider:
  - **OpenAI:** gpt-4o, gpt-4o-mini, gpt-4-turbo, gpt-3.5-turbo
  - **Anthropic:** claude-sonnet-4-20250514, claude-haiku-4-5-20251001
- Dropdown to pick a model after selecting a provider.

## Dual Output Modes
- Toggle between **Unstructured** (free text) and **Structured** (JSON schema) mode.
- In **Unstructured** mode: send the prompt as-is, display the plain text response.
- In **Structured** mode:
  - Show a JSON schema editor (textarea) alongside the prompt textarea.
  - For OpenAI: use `response_format: { type: "json_schema", json_schema: { name: "response", schema: <user_schema>, strict: true } }`.
  - For Anthropic: append instructions to the prompt telling the model to respond with JSON matching the schema (Anthropic doesn't have a native structured output param from the browser).
  - Parse and pretty-print the JSON response.

## Example Prompts & Schemas
Provide a dropdown of at least 4 example prompts. When selected, auto-fill the prompt textarea (and schema textarea if structured mode). Examples should be engineering-flavored, e.g.:
1. "Describe the properties of titanium for aerospace use" — schema: `{ type: "object", properties: { name: { type: "string" }, density_kg_m3: { type: "number" }, yield_strength_mpa: { type: "number" }, applications: { type: "array", items: { type: "string" } } }, required: ["name","density_kg_m3","yield_strength_mpa","applications"] }`
2. "Explain Ohm's Law" (unstructured)
3. "Compare AC and DC motors" — schema with fields for each motor type
4. "Recommend a microcontroller for a weather station" — schema with name, price_range, pros, cons

## CORS Handling
- OpenAI's API supports browser CORS; call it directly via `fetch`.
- Anthropic's API does **not** support browser CORS. Detect this and show a friendly message: "Anthropic's API doesn't allow direct browser requests (CORS). To test Anthropic models, you'd need a backend proxy. OpenAI works directly from the browser!"
- Do NOT just show a cryptic network error. Catch the failure and explain it.

## Response Display
- Show responses in a styled output panel with markdown-like formatting (or just `<pre>` for structured JSON).
- For long responses, make the panel scrollable with a max-height.

## Error Handling
- Invalid/missing API key → clear message.
- Network timeout → clear message.
- Rate limit → clear message with suggestion to wait.
- Empty prompt → prevent submission.

## Side-by-Side Comparison (Stretch Goal — IMPLEMENT THIS)
- Let the user select **two** models (can be same or different providers).
- Send the same prompt to both models simultaneously.
- Display responses side by side in two panels.
- Show response time for each model.
- Show token count if returned by the API.
- This is the main differentiating feature — make the comparison UI clean and prominent. Consider making it the default view or a clearly accessible tab/toggle.

## UI / Design
- Clean, modern single-page layout. Dark or light theme, your call.
- Sections: API Key Setup → Model Selection → Prompt Area → Response Area.
- Use only vanilla HTML/CSS/JS. No frameworks, no npm.
- Mobile-responsive is nice but not required.

## File Structure
```
index.html   ← everything in one file
```
