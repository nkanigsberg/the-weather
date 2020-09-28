import React from 'react';

import WeatherIcon from './WeatherIcon';
import Temperature from './Temperature';

import '../styles/CurrentWeather.css';

/**
 * The current weather
 */
export default function CurrentWeather(props) {

	const {city, province, country, weather, units } = props;

	return (
    <div className="currentWeather-container">
      <h2>{`${city ? `${city}, ` : ""}${province}, ${country}`}</h2>
      <p>{weather.current.weather[0].description}</p>
      <div className="currentWeather">
        <h3>
          <Temperature temp={weather.current.temp} units={units} />
        </h3>

        <WeatherIcon
          type={weather.current.weather[0].icon}
          description={weather.current.weather[0].description}
        />

        <p>
          Feels like:{" "}
          <Temperature temp={weather.current.feels_like} units={units} />
        </p>
      </div>
    </div>
  );
}
