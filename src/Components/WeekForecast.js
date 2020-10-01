import React from 'react'

import WeatherIcon from './WeatherIcon'
import Temperature from './Temperature'
import DateString from './DateString'

import '../styles/WeekForecast.css'

export default function WeekForecast(props) {

	const { daily, units } = props;

	return (
		<div className="forecast-week-container">
			<h2>Weekly Forecast</h2>

			<div className="forecast-week">
				{daily.map((day, index) => {
					if (index > 0) {
						const time = new Date(day.dt * 1000); // in milliseconds so multiply by 1000 to get seconds

						return (
              <div className="forecast-day">
                <p className="forecast-date">
                  <DateString time={time.toDateString()} />
                </p>

                <WeatherIcon
                  type={day.weather[0].icon}
                  description={day.weather[0].description}
                />

                <p className="description">{day.weather[0].description}</p>

                <p>
                  <Temperature temp={day.temp.max} units={''} /> / <Temperature temp={day.temp.min} units={units} />
                </p>
              </div>
            );
					}
				})}
			</div>
		</div>
	)
}
