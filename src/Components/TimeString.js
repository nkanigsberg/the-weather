import React from "react";

export default function TimeString(props) {
  const { time } = props;

	const hours = time.getHours();
	const mins = time.getMinutes();
	const minString = mins.toString().padStart(2, "0");
	
	let string =
    hours % 12
      ? `${(hours % 12).toString()}:${minString}`
      : `12:${minString}`;

  if (hours / 12 >= 1) {
    string += "pm";
  } else {
    string += "am";
  }

  return <span>{string}</span>;
}
