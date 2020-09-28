import React, { Component } from 'react'

import WeatherIcon from './WeatherIcon'
import Temperature from './Temperature'
// import Date from './Date'

import '../styles/WeekForecast.css'

export default function WeekForecast(props) {

	const { weather, units } = props;

	return (
		<div className="forecast">
			<h2>Weekly Forecast</h2>

			<div className="forecast-week">
				{weather.daily.map((day, index) => {
					if (index > 0) {
						const time = new Date(day.dt * 1000); // in milliseconds so multiply by 1000 to get seconds

						console.log(time.toDateString());

						return (
							<div className="forecast-day">
                {/* <p><Date time={time.toDateString()} /></p> */}
                <p>
                  <Temperature temp={day.temp.max} units={units} />
                </p>

                <WeatherIcon
                  type={day.weather[0].icon}
                  description={day.weather[0].description}
                />
              </div>
            );
					}
				})}
			</div>
		</div>
	)
}
