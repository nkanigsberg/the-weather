import React from 'react'

export default function Location(props) {
	
	const { city, province, country } = props;
	
	return (
    <span>
      {`${city ? `${city}, ` : ""}${province ? `${province}, ` : ""}${country}`}
    </span>
  );
}
