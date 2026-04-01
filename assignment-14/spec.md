# Weather Dashboard — Project Spec

## Overview

Build a weather dashboard as a static webpage that fetches live weather data from the [OpenWeatherMap API](https://openweathermap.org/api). The page must work without any backend — all API calls are made directly from the browser using an API key embedded in the request URL.

---

## Features

### Required

- **City search**: User can type any city name (e.g., Omaha, Paris, London) and retrieve the current weather for that location.
- **Temperature unit toggle**: User can switch between Celsius and Fahrenheit. The display should update immediately on toggle.
- **Current weather display**: After a search, show at minimum:
  - City name and country
  - Current temperature
  - Weather condition (e.g., Clear, Rain, Clouds)
  - Weather condition icon (use OpenWeatherMap's icon CDN: `https://openweathermap.org/img/wn/{icon}@2x.png`)
  - Feels-like temperature
  - Humidity (%)
  - Wind speed

### Stretch Challenges

- **UV Index** — Included in the `/onecall` endpoint. Displays the numeric value with a Low/Moderate/High/Very High/Extreme badge and a color-coded gradient bar (green → yellow → orange → red → purple) with a position marker.
- **Air Quality Index (AQI)** — `/air_pollution` endpoint returns AQI (1–5 scale) plus pollutant breakdown. Displayed with a color-coded dot and badge (Good/Fair/Moderate/Poor/Very Poor) and PM2.5 / CO pollutant chips.

### Nice to Have (implemented)

- Error handling for invalid/unknown city names
- Loading state while the API call is in flight
- Local time / timezone for the searched city

---

## API Details

**Base URL:** `https://api.openweathermap.org/data/2.5/weather`

**Example request:**
```
https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units={metric|imperial}
```

- `q` — city name (e.g., `Omaha`, `London,UK`)
- `appid` — the API key stored as `const API_KEY` at the top of `app.js`
- `units` — `metric` for Celsius, `imperial` for Fahrenheit

**UV Index endpoint:**
```
https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=minutely,hourly,daily,alerts&appid={API_KEY}
```
UV value read from `current.uvi`.

**Air Pollution endpoint:**
```
https://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={API_KEY}
```
AQI read from `list[0].main.aqi`. Pollutants from `list[0].components` (pm2_5, co).

Coordinates (`lat`, `lon`) come from the `coord` field of the current weather response — no extra geocoding call needed.

---

## Tech Stack

- Plain HTML, CSS, and JavaScript (no frameworks)
- Split into `index.html` / `style.css` / `app.js`
- Runs correctly on GitHub Pages (no server-side dependencies)

---

## Design

**SKYVAULT** — dark glassmorphism aesthetic with animated background orbs, `Syne` / `Syne Mono` typefaces, gradient temperature display, and smooth CSS transitions throughout. Responsive for desktop and mobile.

---

## File Structure

```
assignment-14/
├── index.html
├── style.css
├── app.js
└── spec.md
```
