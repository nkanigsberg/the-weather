import React, { Component } from 'react'

export default class WeekForecast extends Component {
	constructor(props) {
		super();
		this.weather = props.weather;
	}
	
	render() {


		return (
			<div>
				{this.weather.daily.map(day => {
					
					const time = new Date(day.dt * 1000); // in milliseconds so multiply by 1000 to get seconds
					console.log(time);

					var month = time.getMonth() + 1; //months from 1-12
          var date = time.getDate();
          var year = time.getFullYear();

					return <p>{time.toDateString()}: {day.temp.max}</p>;
				})}
			</div>
		)
	}
}
