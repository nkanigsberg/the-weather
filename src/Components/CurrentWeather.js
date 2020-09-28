import React, { Component } from 'react'

import WeatherIcon from './WeatherIcon'

/**
 * The current weather
 */
export default function CurrentWeather(props) {

	const {city, province, country, weather, units } = props;

	return (
		<div className="currentWeather">
			<h2>{`${city ? `${city}, ` : ""}${province}, ${country}`}</h2>
			<h3>
				{weather.current.temp}
				{units === "metric" ? "°C" : units === "imperial" ? "°F" : "K"}
			</h3>

			<WeatherIcon
				type={weather.current.weather[0].icon}
				description={weather.current.weather[0].description}
			/>

			<p>
				Feels like: {weather.current.feels_like}
				{units === "metric" ? "°C" : units === "imperial" ? "°F" : "K"}
			</p>
		</div>
	);
}
