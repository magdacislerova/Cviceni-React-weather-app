import React, { useEffect, useState } from 'react';
import './App.css';
import { getFilteredForecasts } from './utils/utils';
import { cities } from './utils/cities.js';

import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import Forecast from './components/Forecast/Forecast';
import Spinner from './components/Spinner/Spinner';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('Prague');
  const [forecasts, setForecasts] = useState(null);

  useEffect(() => {
    const API_ID = process.env.REACT_APP_MY_API_ID;
    const fetchWeather = (city) => {
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${API_ID}`,
      )
        .then((response) => response.json())
        .then((json) => setWeather(json));
    };

    const fetchForecasts = (city) => {
      fetch(
        `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_ID}`,
      )
        .then((response) => response.json())
        .then((json) => setForecasts(getFilteredForecasts(json.list)));
    };
    fetchWeather(city);
    fetchForecasts(city);
  }, [city]);

  const handleClick = (event) => {
    setCity(event.target.innerText);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>My Weather App</h1>
        <select name="city" id="citySelect" className="select" value={city}>
          {cities.map((city) => (
            <option value={city} onClick={handleClick}>
              {city}
            </option>
          ))}
        </select>
        <div className="weather">
          <CurrentWeather weather={weather} city={city} />

          <div className="weather__forecast" id="predpoved">
            {!forecasts ? (
              <div className="spinner-wrapper">
                <Spinner />
              </div>
            ) : (
              <>
                {forecasts?.map((forecast, index) => (
                  <Forecast forecast={forecast} key={index} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
