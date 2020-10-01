import React from 'react';

import WeatherIcon from './WeatherIcon';
import Temperature from './Temperature';
import TimeString from './TimeString'
import Location from './Location'

import '../styles/CurrentWeather.css';

/**
 * The current weather
 */
export default function CurrentWeather(props) {

	const {city, province, country, weather, units } = props;

	const time = new Date(weather.current.dt * 1000);


	return (
    <div className="currentWeather-container">
      <h2>
        <Location city={city} province={province} country={country} />
      </h2>
      <p>{time.toDateString()}</p>

      <div className="currentWeather">
        <div class="currentWeather-left">
          <p>Humidity: {weather.current.humidity}%</p>
          <p>
            Sunrise:{" "}
            <TimeString time={new Date(weather.current.sunrise * 1000)} />
          </p>
          <p>
            Sunset:{" "}
            <TimeString time={new Date(weather.current.sunset * 1000)} />
          </p>
        </div>

        <div className="currentWeather-middle">
          <p className="description">
            {weather.current.weather[0].description}
          </p>

          <WeatherIcon
            type={weather.current.weather[0].icon}
            description={weather.current.weather[0].description}
          />
        </div>

        <div className="currentWeather-right">
          <p className="currentWeather-temp">
            <Temperature temp={weather.current.temp} units={units} />
          </p>

          <p>
            Feels like:{" "}
            <Temperature temp={weather.current.feels_like} units={units} />
          </p>
        </div>
      </div>
    </div>
  );
}
