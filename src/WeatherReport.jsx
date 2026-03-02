// WeatherReport.jsx
import { useEffect, useState } from "react";

export default function WeatherReport({ city }) {
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
      })
      .catch((err) => {
        setError(err.message);
        setWeather(null);
      });
  }, [city]);

  if (error) {
    return <p style={{ color: "red" }}>⚠️ {error}</p>;
  }

  if (!weather) {
    return <p>Loading weather data...</p>;
  }

  return (
    <>
    <div style={{ marginTop: "20px" }}>
      <h2 style={{color: 'var(--text-color)', textDecoration: 'underline'}}>{weather.name}</h2>
      <p color={{color: 'var(--secondary-color)'}}>🌡️ Temperature: {weather.main.temp}°C</p>
      <p color={{color: 'var(--secondary-color)'}}>🌥️ Condition: {weather.weather[0].description}</p>
      <p color={{color: 'var(--secondary-color)'}}>💨 Wind: {weather.wind.speed} m/s</p>
      <p color={{color: 'var(--secondary-color)'}}>💧 Humidity: {weather.main.humidity}%</p>
    </div>
    </>
  );
}
