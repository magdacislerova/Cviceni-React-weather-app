import React, { useEffect, useState } from 'react';
import './App.css';

import CurrentWeather from './components/CurrentWeather/CurrentWeather';

const App = () => {
  const API_ID = process.env.REACT_APP_MY_API_ID;

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('Prague');

  const fetchWeather = () => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${API_ID}`,
    )
      .then((response) => response.json())
      .then((json) => setWeather(json));
  };

  useEffect(() => {
    fetchWeather();
  }, [city]);

  const handleClick = (event) => {
    setCity(event.target.innerText);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>My Weather App</h1>
        <div className="weather">
          <div className="button-group">
            <button className="button" onClick={handleClick}>
              Brisbane
            </button>
            <button className="button" onClick={handleClick}>
              Prague
            </button>
            <button className="button" onClick={handleClick}>
              Malaga
            </button>
          </div>
          <CurrentWeather weather={weather} city={city} />
          <div className="weather__forecast" id="predpoved">
            <div className="forecast">
              <div className="forecast__day">Day, date</div>
              <div className="forecast__icon">
                {/* <img
                  src={URL FROM OPEN WEATHER}
                  style={{ height: "100%" }}
                  alt="current weather icon"
                /> */}
              </div>
              <div className="forecast__temp">-- °C</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
