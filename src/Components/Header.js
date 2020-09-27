import React, { Component } from 'react'

import SearchBar from './SearchBar'
import Units from './Units'

// import App from '../App';

export default class Header extends Component {
	constructor(props) {
		super();
		this.getLocation = props.getLocation;
		this.submit = props.submit;
		this.change = props.change;
		this.updateUnits = props.updateUnits;

		// console.log(props);
		// console.log(this.change);

		console.log(this.updateUnits);
	}
	
	render() {
		return (
      <header>
        <h1>Weather App</h1>

        <Units updateUnits={this.updateUnits} />

        <SearchBar
          getLocation={this.getLocation}
          submit={this.submit}
          change={this.change}
          id="search-location"
          placeholder="Enter Location"
        />
      </header>
    );
	}
}
