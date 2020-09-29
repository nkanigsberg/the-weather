import React from 'react'

/**
 * Formatted date
 */
export default function DateString(props) {
	
	const { time } = props;

	// console.log(time);


	let string = time;
	const lastIndex = string.lastIndexOf(' ');

	string = string.substring(0, lastIndex);

	return <span>{string}</span>;
}
