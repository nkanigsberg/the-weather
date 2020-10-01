import React from 'react'

import Temperature from './Temperature'
import HourString from './HourString'
import WeatherIcon from './WeatherIcon'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import '../styles/HourlyForecast.css'

export default function HourlyForecast(props) {
	const { hourly, units, page, scroll } = props;

	// let minHour = 0;
	// let maxHour = 12;

	// const scrollRight = () => {
	// 	console.log('scroll right');
	// 	minHour = 12;
	// 	maxHour = 24;
	// }

	console.log(page);

	return (
    <div className="forecast-hourly-container">
      <h2>Hourly Forecast</h2>
      <div className="forecast-hourly">
        <button className={page === 0 ? 'disabled' : ''} onClick={() => scroll(page - 1)} aria-label="Scroll Left">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        {hourly.map((hour, index) => {
          const time = new Date(hour.dt * 1000); // in milliseconds so multiply by 1000 to get seconds

          if (index >= page * 12 && index < (page + 1) * 12) {
            //only 12 hours
            return (
              <div className="forecast-hour">
                <p>
                  <HourString time={time} />
                </p>

                <p>
                  <Temperature temp={hour.temp} units={units} />
                </p>

                <WeatherIcon
                  type={hour.weather[0].icon}
                  description={hour.weather[0].description}
                />
              </div>
            );
          }
        })}

        <button className={page === 1 ? 'disabled' : ''} onClick={() => scroll(page + 1)} aria-label="Scroll Right">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
}
