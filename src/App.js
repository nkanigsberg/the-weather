import React, { Component } from 'react';
import './styles/fonts.css';
import './styles/App.css';


// import axios from "axios";

import openWeather from './API/openWeather';
import { reverseGeo, forwardGeo } from './API/locationIq';

import WeatherIcon from './Components/WeatherIcon';
// import SearchBar from './Components/SearchBar';

import Header from './Components/Header';
import CurrentWeather from './Components/CurrentWeather';
import WeekForecast from './Components/WeekForecast';
import Footer from './Components/Footer';


class App extends Component {
  constructor() {
    super();
    this.state = {
			lat: 0,
			lon: 0,
			location: '',
      weather: {},
			city: "",
			province: "",
			country: "",
			weatherLoading: true,
			locationLoading: true,
			units: "metric",
		};
  }

  componentDidMount() {
		this.getLocation();
  }

  // get location data for user's device
  getLocation = (e = null) => {
		if (e) e.preventDefault();

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position);

				this.setState({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });

				const {lat, lon, units} = this.state;

				this.getCity(lat, lon);
				this.getWeather(lat, lon, units);

      });
    } else {
      console.log("No geolocation");
    }
  }

  // get city name from locationIQ API
  getCity(lat, lon) {
		reverseGeo(lat, lon).then(result => {
			// console.log(result.data.address);
      this.setState({
				city: result.data.address.city,
				province: result.data.address.state,
				country: result.data.address.country,
				locationLoading: false,
      });
    });
  }

	// get weather from openWeather API
  getWeather(lat, lon, units) {

		openWeather(lat, lon, units).then(result => {
      // console.log(result.data);
      // return result.data;
     	this.setState({
				 weather: result.data,
				 weatherLoading: false,
				 units: units,
			});
    });
	}

	/**
	 * Search for coordinates from input location
	 * @param {event} e 
	 */
	searchLocation = e => {
		e.preventDefault();
		console.log("location search");

		if (this.state.location) {
      forwardGeo(this.state.location).then((result) => {
        const location = result.data[0];
				// console.log(location);
				
				this.setState({
					lat: location.lat,
					lon: location.lon,
        });

				const { lat, lon, units} = this.state;

				this.getCity(lat, lon);
				this.getWeather(lat, lon, units);

			});
		}
	}

	/**
	 * Update the location state on change of input
	 */
	updateLocationState = e => {
		this.setState({
      location: e.target.value,
    });
	}


	// updateUnits = e => {
	// 	// console.log(e.target.value);
	// 	this.setState({
	// 		units: e.target.value,
	// 	}, () => { //callback function to guarantee execute AFTER state change
	// 		const { lat, lon, units } = this.state;
	// 		// console.log(units);

	// 		this.getWeather(lat, lon, units);
	// 	})
	// }

	updateUnits = e => {
		const { lat, lon, units } = this.state;
			// console.log(units);
			// units: e.target.value,
		this.getWeather(lat, lon, e.target.value);
	}
	


  render() {
		// console.log('render');
		const { weather, weatherLoading, locationLoading, city, province, country, units } = this.state;

    return (
      <div className="App">

				<Header
          getLocation={this.getLocation}
          submit={this.searchLocation}
          change={this.updateLocationState}
          updateUnits={this.updateUnits}
        />

        <main>
          <div className="wrapper">
						{/* display main content only after loaded from API */}
						{weatherLoading || locationLoading ? (
							<p>Loading...</p>
						) : (
							<>

								<CurrentWeather
									city={city}
									province={province}
									country={country}
									weather={weather}
									units={units}
								/>

								<WeekForecast 
									weather={weather}
									units={units}
								/>

							</>
						)}
					</div>
        </main>

				<Footer />

      </div>
    );
  }
}

export default App;