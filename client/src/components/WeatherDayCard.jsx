import React, { useState } from 'react';

// component to get ALL data from our created DB
const WeatherDayCard = (props) => {

  const { date, max, min, precipitation, i } = props;

  // Refine fields to display
  const precipPercent = Math.round(precipitation*100);
  const weekday = (i===0) ? 'Today' : date.slice(0,3);
  const day = date.slice(4, 10);

  return (
    <div className="weather-row">

      <div className="col" style={{minWidth: "60px"}}>
        <div style={{fontSize: "22px"}}>{weekday}</div>
        <div style={{fontSize: "16px"}}>{day}</div>
      </div>

      <div className="col" style={{marginRight: "5px"}}>
        <div className="img-container">
          <img src="https://img.icons8.com/ultraviolet/40/000000/thermometer.png"/>
        </div>
      </div>

      <div className="col" style={{minWidth: "100px"}}>
        <div style={{fontSize: "14px"}}>High / Low </div>
        <div style={{fontSize: "22px"}}>{max} / {min}</div>
      </div>
      

      <div className="col" style={{marginRight: "10px"}}>
        <div className="img-container">
          <img src="https://img.icons8.com/cotton/64/000000/rain--v1.png"/>
        </div>
      </div>
      
      <div className="col">
        <div style={{fontSize: "22px", position: "relative", top: "5px"}}>{precipPercent}%</div>
      </div>

    </div>
  );
};

export default WeatherDayCard;
