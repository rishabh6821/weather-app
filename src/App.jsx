import { useState, useEffect } from "react";
import WeatherReport from "./WeatherReport.jsx";

export default function App() {
  let [inputValue, setInputValue] = useState("");
  let [showReport, setShowReport] = useState(false);
  let [timezoneOffset, setTimezoneOffset] = useState(null);
  let [cityName, setCityName] = useState("");
  let [currentTime, setCurrentTime] = useState(null);

  const formatOffset = (seconds) => {
    const sign = seconds >= 0 ? "+" : "-";
    const absSeconds = Math.abs(seconds);
    const hours = Math.floor(absSeconds / 3600);
    const minutes = Math.floor((absSeconds % 3600) / 60);
    return `UTC${sign}${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  };

  useEffect(() => {
    let timer;

    const updateCityTime = () => {
      const utcMs = Date.now() + new Date().getTimezoneOffset() * 60000;
      const cityMs = utcMs + timezoneOffset * 1000;
      setCurrentTime(new Date(cityMs));
    };

    if (showReport && timezoneOffset !== null) {
      updateCityTime();
      timer = setInterval(updateCityTime, 1000);
    } else {
      setCurrentTime(null);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [showReport, timezoneOffset]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    if (value.trim() === "") {
      setShowReport(false);
      setTimezoneOffset(null);
      setCurrentTime(null);
      setCityName("");
    }
  };

  const handleShowReport = () => {
    if (inputValue.trim() !== "") {
      setShowReport(true);
      setCityName("");
      setTimezoneOffset(null);
      setCurrentTime(null);
    }
  };

  const displayName = cityName || inputValue;
  const utcLabel = timezoneOffset !== null ? formatOffset(timezoneOffset) : "";

  return (
    <main className="app-container">
      <h1>Weather App</h1>

      <div className="search-form">
        <label htmlFor="city-input" className="search-label">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter any city name"
            id="city-input"
            className="city-input"
          />
        </label>

        <button
          id="info-btn"
          type="button"
          className="search-button"
          onClick={handleShowReport}
          disabled={inputValue.trim() === ""}
        >
          Show
        </button>
      </div>

      {showReport ? (
        <>
          <section className="clock-card">
            <p className="clock-date clock-label">
              Local time in {displayName}
            </p>
            <p className="clock-date">
              {currentTime
                ? currentTime.toLocaleDateString(undefined, {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "Loading date..."}
            </p>
            <p className="clock-time">
              {currentTime
                ? currentTime.toLocaleTimeString(undefined, {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                : "Loading time..."}
            </p>
            {utcLabel ? <p className="clock-utc">{utcLabel}</p> : null}
          </section>
          <WeatherReport
            city={inputValue}
            onTimezoneUpdate={setTimezoneOffset}
            onCityNameUpdate={setCityName}
          />
        </>
      ) : null}
    </main>
  )
}