import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Snowfall from 'react-snowfall'
import './index.css'
import App from './App.jsx'


// Get CSS variables with fallback values
const getCSSVariable = (varName, fallback) => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  return value || fallback;
};

let primary1 = getCSSVariable('--primary-color', '#007bff');
let primary2 = getCSSVariable('--secondary-color', '#6c757d');

const listPrimaryColors = [primary1, primary2];

createRoot(document.getElementById('background-shade')).render(
  <StrictMode>
    <Snowfall 
    color={listPrimaryColors[Math.floor(Math.random() * listPrimaryColors.length)]}
    enable3DRotation
    rotationSpeed={[2, 2]}
    radius={[5, 2]}
    wind={[10, -10]}
    />
  </StrictMode>
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
