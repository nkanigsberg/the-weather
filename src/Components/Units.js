import React, { Component } from 'react'

/**
 * Select which units of measurement to use
 */
export default class Units extends Component {
	constructor(props) {
		super();
		this.updateUnits = props.updateUnits;
	}

	render() {
		return (
			<div>
				<button value="metric" onClick={this.updateUnits}>metric</button> / <button value="imperial" onClick={this.updateUnits}>imperial</button> / <button value="kelvin" onClick={this.updateUnits}>kelvin</button>
			</div>
		)
	}
}
