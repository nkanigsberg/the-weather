import React, { Component } from 'react'

import WeatherIcon from './WeatherIcon'

import '../styles/WeekForecast.css'

export default function WeekForecast(props) {

	const { weather } = props;

	return (
		<div>
			<h2>Weekly Forecast</h2>

			<div className="forecast-week">
				{weather.daily.map((day, index) => {
					if (index > 0) {
						const time = new Date(day.dt * 1000); // in milliseconds so multiply by 1000 to get seconds
						// console.log(time);

						// var month = time.getMonth() + 1; //months from 1-12
						// var date = time.getDate();
						// var year = time.getFullYear();

						return (
							<div className="forecast-day">
								<p>
									{time.toDateString()}: {day.temp.max}
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
	// }
}
