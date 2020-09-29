import React from 'react'

export default function HourString(props) {
	
	const { time } = props;

	const hours = time.getHours();
	let string = hours % 12 ? (hours % 12).toString() : '12';


	if ( hours / 12 >= 1 ) {
		string += 'pm'
	} else {
		string += 'am'
	}


	return <span>{string}</span>;
}
