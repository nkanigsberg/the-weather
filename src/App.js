import React, { Component } from 'react';
import firebase from './firebase';

import './styles/fonts.css';
import './styles/App.css';

// import axios from "axios";

import openWeather from './API/openWeather';
import { reverseGeo, forwardGeo } from './API/locationIq';
// import ipdata from './API/ipdata';

import WeatherIcon from './Components/WeatherIcon';
// import SearchBar from './Components/SearchBar';

import Header from './Components/Header';
import CurrentWeather from './Components/CurrentWeather';
import WeekForecast from './Components/WeekForecast';
import HourlyForecast from './Components/HourlyForecast';
import LocationList from './Components/LocationList'
import Footer from './Components/Footer';

import MapComponent from './Components/MapComponent';


class App extends Component {
  constructor() {
    super();
    this.state = {
      lat: 43.6534,
      lon: -79.3839,
      location: "",
      weather: {},
      city: "",
      province: "",
      country: "",
      isLoading: false,
      weatherLoading: true,
      locationLoading: true,
      firebaseLoading: true,
      units: "metric",
			locationList: [],
			mapType: "clouds_new",
			uid: '',
    };
  }

  componentDidMount() {
		this.getLocation();

		const dbRef = firebase.database().ref();

		dbRef.on('value', response => {
			const newState = [];
			const data = response.val();
			
			// if there is data
			if (data) {
				const user = data.users[this.state.uid];

				// console.log(data);

				for (let key in user) {
					newState.push({key: key, data: user[key]});
				}

				// console.log(newState);
				this.setState({
					locationList: newState,
					firebaseLoading: false,
				})
			} else {
				this.setState({
          locationList: [],
          firebaseLoading: false,
        });
			}
		})


		// firebase anonymous account auth
		firebase
			.auth()
			.signInAnonymously()
			.catch(function (error) {
				// Handle Errors here.
				console.log(error.code);
				console.log(error.message);
			
			});

			firebase.auth().onAuthStateChanged( (user) => {
        if (user) {
          // User is signed in.
          const isAnonymous = user.isAnonymous;
					const uid = user.uid;
					console.log(uid);

					this.setState({
						uid: uid,
					})
          // ...
        } else {
					// User is signed out.
					console.log('signed out');
          // ...
        }
        // ...
      });

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
		// const dbRef = firebase.database().ref();
		
		this.setState({
			isLoading: true,
		})

		reverseGeo(lat, lon).then(result => {
			
			const { city, state, country } = result.data.address;
			
			// let allowPush = false;

			// console.log(result.data.address);
      this.setState(
        {
          city: city,
          province: state,
          country: country,
          locationLoading: false,
        },
        this.updateList
      );	
			
			// console.log(this.state.locationList);

			// for (let loc in this.state.locationList) {
      //   const list = this.state.locationList;
      //   console.log(this.state.locationList[loc]);
      //   // console.log(loc.data.city, loc.data.state, loc.data.country);
      //   // console.log(city, state, country);

      //   if (
      //     list[loc].data.city !== city &&
      //     list[loc].data.state !== state &&
      //     list[loc].data.country !== country
      //   ) {
      //     // if not in list, push city to firebase
      //     dbRef.push({
      //       city: city,
      //       state: state,
      //       country: country,
      //       lat: lat,
      //       lon: lon,
      //     });
      //   }
      // }



		})
		
	}

	/**
	 * Update the location list from state
	 */
	updateList() {
		console.log(this.state.firebaseLoading);
		if (!this.state.firebaseLoading) {
      const dbRef = firebase.database().ref();
			let canPush = true;
			
      // console.log(this.state.locationList);

      // check to see if location is already in list
      for (let loc in this.state.locationList) {
        const list = this.state.locationList;
        // console.log(this.state.locationList[loc]);
        // console.log(loc.data.city, loc.data.state, loc.data.country);
        // console.log(city, state, country);
        // console.log(list[loc]);
        // console.log(
        // 	list[loc].data.city, this.state.city,
        // 		list[loc].data.state, this.state.province,
        // 		list[loc].data.country, this.state.country
        // );

        if (
          list[loc].data.city === this.state.city &&
          list[loc].data.state === this.state.province &&
          list[loc].data.country === this.state.country
        ) {
          canPush = false;
        }
      }

      // if not in list, push city to firebase
      if (canPush && this.state.locationList.length < 6) {
				console.log('pushing');
        dbRef.child('users').child(this.state.uid).push({
          city: this.state.city ? this.state.city : '',
          state: this.state.province ? this.state.province : '',
          country: this.state.country,
          lat: this.state.lat,
          lon: this.state.lon,
        });
      }
    }
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
	

	/**
	 * Change location on selection from list
	 * @param {*} data 
	 */
	selectLocation = (data) => {
		console.log('select ', data);

		this.getWeather(data.lat, data.lon, this.state.units);

		this.setState({
			lat: data.lat,
			lon: data.lon,
			city: data.city,
			province: data.state,
			country: data.country,
			locationLoading: false,
		})
	}

	/**
	 * Remove location from list
	 * @param {*} key 
	 */
	removeLocation = (key) => {
		const dbRef = firebase.database().ref();
		console.log('remove', key);

		dbRef.child('users').child(this.state.uid).child(key).remove();
	}


	updateMapType = value => {
		// console.log('change', value);
		this.setState({
			mapType: value,
		})
	}




  render() {
    // console.log('render');
    const {
      weather,
      weatherLoading,
			locationLoading,
			isLoading,
      city,
      province,
      country,
			units,
			lat,
			lon,
			mapType,
    } = this.state;


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
            <div class="main-container">
              <div class="main-left">
                {/* display main content only after loaded from API */}
                {weatherLoading || locationLoading ? (
                  <p>{isLoading ? "Loading..." : ""}</p>
                ) : (
                  <>
                    <CurrentWeather
                      city={city}
                      province={province}
                      country={country}
                      weather={weather}
                      units={units}
                    />

                    <WeekForecast daily={weather.daily} units={units} />

                    <HourlyForecast hourly={weather.hourly} units={units} />
                  </>
                )}
              </div>

              <div className="main-right">
                <LocationList
                  onSelect={this.selectLocation}
                  onRemove={this.removeLocation}
                  locations={this.state.locationList}
                />

								<MapComponent
									lat={lat}
									lon={lon}
									mapType={mapType}
									onChange={this.updateMapType}
								/>
								
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }
}

export default App;