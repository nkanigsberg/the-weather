import React, { Component } from 'react';
import './App.css';

import axios from "axios";

import { weatherEndpoint, weatherKey } from './openWeather';
import { locationEndpoint, locationKey } from './locationIq';



// const tempLat = 33.441792;
// const tempLon = -94.037689;


class App extends Component {
  constructor() {
    super();
    this.state = {
			coords: {
				lat: null,
				lon: null,
			},
      weather: {},
      city: "",
    };
  }

  componentDidMount() {
		this.getLocation();
  }

  // get location data for user's device
  getLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);

        this.setState({
          // coords.lat: 1,
				});
				
				this.getCity(position.coords);
				this.getWeather(position.coords);

      });
    } else {
      console.log("No geolocation");
    }
  }

  // get city name from coordinates
  getCity({ latitude, longitude }) {
    console.log(latitude);
    axios({
      method: "GET",
      url: locationEndpoint,
      dataResponse: "json",
      params: {
        format: "json",
        key: locationKey,
        lat: latitude,
        lon: longitude,
      },
    }).then((result) => {
			console.log(result.data.address.city);
      this.setState({
        city: result.data.address.city,
      });
    });
  }

	// get weather from API
  getWeather({ latitude, longitude }) {
    axios({
      method: "GET",
      url: weatherEndpoint,
      dataResponse: "json",
      params: {
				appid: weatherKey,
				units: "metric",
        lat: latitude,
        lon: longitude,
      },
    }).then((result) => {
      console.log(result.data);
      // return result.data;
     	this.setState({
				 weather: result.data,
			 })
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Weather App</h1>
        <h2>Your Location: {this.state.city}</h2>
        <h2>
          Currrent temperature:{" "}
          {this.state.weather.current
            ? this.state.weather.current.temp
            : null}{" "}
        </h2>
      </div>
    );
  }
}

export default App;
