import React from 'react';

import WeatherIcon from './WeatherIcon';
import Temperature from './Temperature';
import HourString from './HourString'
import DateString from './DateString'
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
        <Location
					city={city}
					province={province}
					country={country}
				/>
      </h2>
      <p>{time.toDateString()}</p>

      <div className="currentWeather">
        <p className="description">{weather.current.weather[0].description}</p>

        <WeatherIcon
          type={weather.current.weather[0].icon}
          description={weather.current.weather[0].description}
        />

        <div className="currentWeather-right">
          <h3>
            <Temperature temp={weather.current.temp} units={units} />
          </h3>

          <p>
            Feels like:{" "}
            <Temperature temp={weather.current.feels_like} units={units} />
          </p>
        </div>
      </div>
    </div>
  );
}
