// WeatherReport.jsx
import { useEffect, useState } from "react";

export default function WeatherReport({ city, onTimezoneUpdate, onCityNameUpdate }) {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;

    const apiKey = "ec1245bb44c5398e07e815d7717e007e"; // replace with your OpenWeatherMap key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("City not found or API error");
        }
        return res.json();
      })
      .then((data) => {
        setWeather(data);
        setError(null);
        if (onTimezoneUpdate) onTimezoneUpdate(data.timezone);
        if (onCityNameUpdate) onCityNameUpdate(data.name);
      })
      .catch((err) => {
        setError(err.message);
        setWeather(null);
        if (onTimezoneUpdate) onTimezoneUpdate(null);
        if (onCityNameUpdate) onCityNameUpdate("");
      });
  }, [city, onTimezoneUpdate, onCityNameUpdate]);

  if (error) {
    return <p style={{ color: "red" }}>⚠️ {error}</p>;
  }

  if (!weather) {
    return <p className="status-message">Loading weather data...</p>;
  }

  return (
    <section className="weather-card">
      <h2 className="weather-title">{weather.name}</h2>
      <p className="weather-temp">{weather.main.temp}°C</p>
      <p className="weather-detail">🌥️ Condition: {weather.weather[0].description}</p>
      <p className="weather-detail">💨 Wind: {weather.wind.speed} m/s</p>
      <p className="weather-detail">💧 Humidity: {weather.main.humidity}%</p>
    </section>
  );
}
