import React from 'react'

/**
 * Formatted date
 */
export default function Date(props) {
	
	const { time } = props;

	console.log(time);


	let string = time;
	const lastIndex = string.lastIndexOf(' ');

	string = string.substring(0, lastIndex);

	return {string};
}
