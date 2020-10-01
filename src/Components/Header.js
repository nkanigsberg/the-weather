import React from 'react'

import SearchBar from './SearchBar'
import Units from './Units'
import WeatherIcon from './WeatherIcon'

import '../styles/Header.css'


export default function Header(props) {
	const { getLocation, submit, change, updateUnits, units } = props;
		
	return (
    <header>
      <div className="wrapper">
        <div className="header-container">
          <h1>
            <a href="#">
              <WeatherIcon type="02d" description="TheWeather Logo" />
              <span>The</span>Weather
            </a>
          </h1>

          <div className="header-right">
            <Units updateUnits={updateUnits} units={units} />

            <SearchBar
              getLocation={getLocation}
              submit={submit}
              change={change}
              id="search-location"
              placeholder="Enter Location"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
