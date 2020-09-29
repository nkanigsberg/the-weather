import React from 'react'

/**
 * Display temperature with provided unit
 */
export default function Temperature(props) {

	const { temp, units } = props;

	return (
    <span>
      {temp.toFixed(1)}
      {!units ? '' : units === "metric" ? "°C" : units === "imperial" ? "°F" : "K"}
    </span>
  );
}
