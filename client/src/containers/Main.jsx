import React, { useState } from 'react';
import axios from 'axios';
import parseData from '../utils/parseData';
import WeatherDayCard from '../components/WeatherDayCard.jsx';
const API_KEY = 'fa56bfa56d667c9243a012b42283ad11';

// component to get ALL data from our created DB
const Main = () => {
  const [zipcode, setZipcode] = useState('');
  const [error, setError] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState('');

  // Fires when user enters Zipcode
  function handleSubmit(e) {
    e.preventDefault();
    setError('')
    console.log(zipcode)
    axios(`https://api.openweathermap.org/data/2.5/forecast?zip=${zipcode}&appid=${API_KEY}`)
    .then(res => {
      const parsedData = parseData(res.data.list);
      console.log('parsedData',parsedData);
      setWeatherData(parsedData);
      setCity(res.data.city.name)
    })
    // if Zipcode is invalid, error is thrown
    .catch(err => {
      console.log('err',err)
      setError('Invalid Zipcode')
    })
  };

  const list = [];
  weatherData.forEach((day, i) => {
    const { date, max, min, precipitation} = day
    list.push(
      <WeatherDayCard
        date={date}
        max={max}
        min={min}
        precipitation={precipitation}
        i={i}
        key={i}
      />
    );
  });

  return (
    <>
      <div id="search-container">
        <form className="form" id="addItemForm" autoComplete="off">
          <input
            type="text"
            id="search-bar"
            className="search-area"
            placeholder="search zipcode"
            onChange={(e) => setZipcode(e.target.value)}
          />
          <button id="check-weather-button" className="search-area" onClick={handleSubmit}>
            Check Weather
          </button>
        </form>
      </div>

      <div id="weather-body">
        {city 
          ? <div id="weather-header"><b>Weather for {city}</b></div>
          : <div id="weather-header"><b>Please enter a zipcode</b></div>
        }
        {error && <div id="error-message" className="search-area">{error}</div>}
        <div id="weather-rows">{list}</div>
      </div>
    </>
  );
};

export default Main;
