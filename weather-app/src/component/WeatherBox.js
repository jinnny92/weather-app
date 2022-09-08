import React from "react";

const WeatherBox = ({ weather }) => {
  return (
    <div className="weather-box">
      <div>{weather?.name}</div>
      {/* <div>{weather&&weather.name}</div> */}
      <h2>
        {weather?.main.temp}C/{weather?.main.temp * 1.8 + 32}F
      </h2>
      <h3>{weather?.weather[0].description}</h3>
    </div>
  );
};

export default WeatherBox;
