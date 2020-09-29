import React from 'react'

import Temperature from './Temperature'
import DateString from './DateString'

export default function HourlyForecast(props) {
	
	const { hourly, units } = props;

	return (
		<>
			<h2>Hourly Forecast</h2>
			<div className="forecast-hourly">
				{hourly.map((hour, index) => {
          const time = new Date(hour.dt * 1000); // in milliseconds so multiply by 1000 to get seconds

          if (index < 24) {
            //only 24 hours
            return (
              <div className="forecast-hour">
                <p>
                  {/* <DateString /> */}
                  {time.toLocaleTimeString()}
                </p>

                <p>
                  <Temperature temp={hour.temp} units={units} />
                </p>
              </div>
            );
          }
        })}
			</div>
		</>
	)
}
