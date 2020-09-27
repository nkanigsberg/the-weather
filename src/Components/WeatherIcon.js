import React from 'react'

import { weatherIconEndpoint } from '../API/openWeather'

export default function Icon(props) {
	return (
		<img src={`${weatherIconEndpoint}${props.type}@2x.png`} alt={props.description}/>
	)
}
