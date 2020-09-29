import React from 'react'

import Temperature from './Temperature'
import HourString from './HourString'
import WeatherIcon from './WeatherIcon'

import '../styles/HourlyForecast.css'

export default function HourlyForecast(props) {
	
	const { hourly, units } = props;

	return (
		<div className="forecast-hourly-container">
			<h2>Hourly Forecast</h2>
			<div className="forecast-hourly">
				{hourly.map((hour, index) => {
          const time = new Date(hour.dt * 1000); // in milliseconds so multiply by 1000 to get seconds

          if (index < 12) {
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
			</div>
		</div>
	)
}
