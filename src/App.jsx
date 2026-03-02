import { useState } from "react";
import WeatherReport from "./WeatherReport.jsx";

export default function App() {
  let [inputValue, setInputValue] = useState("");
  let [showReport, setShowReport] = useState(false);
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    if (value.trim() === "") { setShowReport(false); }
  };

  const handleShowReport = () => {
    if (inputValue.trim() !== "") { setShowReport(true); }
  };

  return (
    <>
     <h1>Weather App</h1>
     <label htmlFor="city-input">
     <input 
     type="text" 
     value={inputValue} 
     onChange={handleInputChange} 
     placeholder="Enter any City name" 
     id="city-input" 
     />
     <button 
     id="info-btn" 
     type="button"
     onClick={handleShowReport} 
     disabled={inputValue.trim() === ""}
     >Show</button>
     </label>
     {showReport ? <WeatherReport city={inputValue} /> : null}
    </>
  )
}