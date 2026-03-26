const API_KEY  = "f9e0ae67a17f77f8ff0132a5f9c97a32";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const OC_URL   = "https://api.openweathermap.org/data/2.5/onecall";
const AQI_URL  = "https://api.openweathermap.org/data/2.5/air_pollution";

// ── State ──────────────────────────────────────
let isFahrenheit = false;
let lastCity = "";

// ── DOM refs ───────────────────────────────────
const cityInput    = document.getElementById("city-input");
const searchBtn    = document.getElementById("search-btn");
const unitToggle   = document.getElementById("unit-toggle");
const statusMsg    = document.getElementById("status-msg");
const weatherCard  = document.getElementById("weather-card");

const cityNameEl   = document.getElementById("city-name");
const countryEl    = document.getElementById("country");
const localTimeEl  = document.getElementById("local-time");
const weatherIcon  = document.getElementById("weather-icon");
const conditionEl  = document.getElementById("condition");
const tempValueEl  = document.getElementById("temp-value");
const tempUnitEl   = document.getElementById("temp-unit");
const feelsLikeEl  = document.getElementById("feels-like");
const humidityEl   = document.getElementById("humidity");
const windSpeedEl  = document.getElementById("wind-speed");

const extrasSection = document.getElementById("extras-section");
const uvValueEl     = document.getElementById("uv-value");
const uvBadgeEl     = document.getElementById("uv-badge");
const uvMarkerEl    = document.getElementById("uv-marker");
const aqiDotEl      = document.getElementById("aqi-dot");
const aqiBadgeEl    = document.getElementById("aqi-badge");
const pm25ChipEl    = document.getElementById("pm25-chip");
const coChipEl      = document.getElementById("co-chip");

// ── Fetch & render ─────────────────────────────
async function fetchWeather(city) {
  if (!city.trim()) return;

  const units = isFahrenheit ? "imperial" : "metric";
  const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${units}`;

  setStatus("fetching data", "loading");
  weatherCard.classList.add("loading");

  try {
    const res = await fetch(url);

    if (!res.ok) {
      if (res.status === 404) {
        throw new Error(`City "${city}" not found — check the spelling`);
      } else if (res.status === 401) {
        throw new Error("Invalid API key");
      } else {
        throw new Error(`API error (${res.status})`);
      }
    }

    const data = await res.json();
    renderWeather(data);

    // Fetch UV + AQI in parallel using coordinates from the weather response
    const { lat, lon } = data.coord;
    const [uvResult, aqiResult] = await Promise.allSettled([
      fetch(`${OC_URL}?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${API_KEY}`).then(r => r.json()),
      fetch(`${AQI_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`).then(r => r.json())
    ]);

    let hasExtras = false;
    if (uvResult.status === "fulfilled" && uvResult.value.current?.uvi !== undefined) {
      renderUV(uvResult.value.current.uvi);
      hasExtras = true;
    }
    if (aqiResult.status === "fulfilled" && aqiResult.value.list?.[0]) {
      renderAQI(aqiResult.value.list[0]);
      hasExtras = true;
    }
    if (hasExtras) extrasSection.classList.remove("hidden");

    clearStatus();
  } catch (err) {
    setStatus(err.message, "error");
    weatherCard.classList.add("hidden");
    weatherCard.classList.remove("loading");
  }
}

function renderWeather(data) {
  const { name, sys, weather, main, wind, timezone } = data;

  cityNameEl.textContent  = name;
  countryEl.textContent   = sys.country;
  localTimeEl.textContent = getLocalTime(timezone);

  const icon = weather[0].icon;
  weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  weatherIcon.alt = weather[0].description;
  conditionEl.textContent = weather[0].main;

  const unitSymbol = isFahrenheit ? "°F" : "°C";
  const windUnit   = isFahrenheit ? "mph" : "m/s";

  tempValueEl.textContent  = Math.round(main.temp);
  tempUnitEl.textContent   = unitSymbol;
  feelsLikeEl.textContent  = `${Math.round(main.feels_like)}${unitSymbol}`;
  humidityEl.textContent   = `${main.humidity}%`;
  windSpeedEl.textContent  = `${wind.speed} ${windUnit}`;

  extrasSection.classList.add("hidden");
  weatherCard.classList.remove("hidden", "loading");
}

// ── UV Index ───────────────────────────────────
const UV_LEVELS = [
  { max: 2,  label: "Low",       color: "#4ade80" },
  { max: 5,  label: "Moderate",  color: "#facc15" },
  { max: 7,  label: "High",      color: "#fb923c" },
  { max: 10, label: "Very High", color: "#f87171" },
  { max: Infinity, label: "Extreme", color: "#c084fc" },
];

function uvLevel(uvi) {
  return UV_LEVELS.find(l => uvi <= l.max);
}

function renderUV(uvi) {
  const level = uvLevel(uvi);
  const MAX_UVI = 13;
  const pct = Math.min(uvi / MAX_UVI, 1) * 100;

  uvValueEl.textContent = uvi.toFixed(1);
  uvBadgeEl.textContent = level.label;
  uvBadgeEl.style.background = level.color + "28";
  uvBadgeEl.style.color = level.color;
  uvBadgeEl.style.border = `1px solid ${level.color}55`;
  uvMarkerEl.style.left = `${pct}%`;
}

// ── Air Quality Index ──────────────────────────
const AQI_LEVELS = [
  { label: "Good",      color: "#4ade80" },
  { label: "Fair",      color: "#a3e635" },
  { label: "Moderate",  color: "#facc15" },
  { label: "Poor",      color: "#f97316" },
  { label: "Very Poor", color: "#f87171" },
];

function renderAQI(item) {
  const aqi   = item.main.aqi;          // 1–5
  const level = AQI_LEVELS[aqi - 1];
  const { pm2_5, co } = item.components;

  aqiDotEl.style.background  = level.color;
  aqiDotEl.style.boxShadow   = `0 0 10px ${level.color}88`;
  aqiBadgeEl.textContent     = level.label;
  aqiBadgeEl.style.background = level.color + "28";
  aqiBadgeEl.style.color      = level.color;
  aqiBadgeEl.style.border     = `1px solid ${level.color}55`;

  pm25ChipEl.textContent = `PM2.5 · ${pm2_5.toFixed(1)} µg/m³`;
  coChipEl.textContent   = `CO · ${(co / 1000).toFixed(2)} mg/m³`;
}

// ── Local time from UTC offset ─────────────────
function getLocalTime(timezoneOffsetSeconds) {
  const utcMs     = Date.now();
  const localMs   = utcMs + timezoneOffsetSeconds * 1000;
  const localDate = new Date(localMs);

  const hours   = localDate.getUTCHours();
  const minutes = String(localDate.getUTCMinutes()).padStart(2, "0");
  const ampm    = hours >= 12 ? "PM" : "AM";
  const h12     = hours % 12 || 12;

  const days   = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const day   = days[localDate.getUTCDay()];
  const month = months[localDate.getUTCMonth()];
  const date  = localDate.getUTCDate();

  return `${day} ${month} ${date} · ${h12}:${minutes} ${ampm}`;
}

// ── Status helpers ─────────────────────────────
function setStatus(msg, type = "") {
  statusMsg.textContent = msg;
  statusMsg.className   = `status-msg ${type}`;
}

function clearStatus() {
  statusMsg.textContent = "";
  statusMsg.className   = "status-msg";
}

// ── Unit toggle ────────────────────────────────
unitToggle.addEventListener("click", () => {
  isFahrenheit = !isFahrenheit;
  unitToggle.classList.toggle("fahrenheit", isFahrenheit);
  if (lastCity) fetchWeather(lastCity);
});

// ── Search ─────────────────────────────────────
function handleSearch() {
  const city = cityInput.value.trim();
  if (!city) return;
  lastCity = city;
  fetchWeather(city);
}

searchBtn.addEventListener("click", handleSearch);

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSearch();
});
