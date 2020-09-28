import React from 'react'

import { weatherIconEndpoint } from '../API/openWeather'

import '../styles/WeatherIcon.css'

export default function Icon(props) {
	return (
		<img className="weather-icon" src={`${weatherIconEndpoint}${props.type}@2x.png`} alt={props.description}/>
	)
}
