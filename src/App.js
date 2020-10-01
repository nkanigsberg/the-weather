import React, { Component } from 'react';
import firebase from './firebase';

import './styles/fonts.css';
import './styles/App.css';
import './styles/media1280.css';
import './styles/media768.css';

import openWeather from './API/openWeather';
import { reverseGeo, forwardGeo } from './API/locationIq';

import Header from './Components/Header';
import CurrentWeather from './Components/CurrentWeather';
import WeekForecast from './Components/WeekForecast';
import HourlyForecast from './Components/HourlyForecast';
import LocationList from './Components/LocationList'
import MapComponent from './Components/MapComponent';
import Footer from './Components/Footer';

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
			hourlyPage: 0,
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

				for (let key in user) {
					newState.push({key: key, data: user[key]});
				}

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
					const uid = user.uid;

					this.setState({
						uid: uid,
					})
        } else {
					// User is signed out.
					console.log('signed out');
        }
      });
  }

  // get location data for user's device
  getLocation = (e = null) => {
		if (e) e.preventDefault();

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {

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
		
		this.setState({
			isLoading: true,
		})

		reverseGeo(lat, lon).then(result => {
			
			const { city, state, country } = result.data.address;
		
      this.setState(
        {
          city: city,
          province: state,
          country: country,
          locationLoading: false,
        },
        this.updateList
      );	
		})
	}

	/**
	 * Update the location list from state
	 */
	updateList() {
		if (!this.state.firebaseLoading) {
      const dbRef = firebase.database().ref();
			let canPush = true;
			
      // check to see if location is already in list
      for (let loc in this.state.locationList) {
        const list = this.state.locationList;

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

		if (this.state.location) {
      forwardGeo(this.state.location).then((result) => {
        const location = result.data[0];
				
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

	updateUnits = e => {
		const { lat, lon, units } = this.state;

		this.getWeather(lat, lon, e.target.value);
	}
	

	/**
	 * Change location on selection from list
	 * @param {*} data 
	 */
	selectLocation = (data) => {
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

		dbRef.child('users').child(this.state.uid).child(key).remove();
	}


	updateMapType = value => {
		this.setState({
			mapType: value,
		})
	}

	hourlyScroll = page => {
		
		if (page >=0 && page <= 1) {
			this.setState({
			hourlyPage: page,
		})}
	}



  render() {
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
			hourlyPage,
    } = this.state;

    return (
      <div className="App">
        <Header
          getLocation={this.getLocation}
          submit={this.searchLocation}
          change={this.updateLocationState}
					updateUnits={this.updateUnits}
					units={units}
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

                    <HourlyForecast hourly={weather.hourly} units={units} page={hourlyPage} scroll={this.hourlyScroll} />
                  </>
                )}
              </div>

              <div className="main-right">
                <LocationList
                  onSelect={this.selectLocation}
                  onRemove={this.removeLocation}
									locations={this.state.locationList}
									city={city}
									state={province}
									country={country}
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