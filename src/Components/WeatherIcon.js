import React from 'react'

import { weatherIconEndpoint } from '../API/openWeather'

import '../styles/WeatherIcon.css'

export default function Icon(props) {
	
	const { type, description } = props;
	
	return (
		<img className="weather-icon" src={`${weatherIconEndpoint}${type}@2x.png`} alt={description}/>
	)
}
