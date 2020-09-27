import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchLocation, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";


export default function SearchBar(props) {

	// console.log(props);

	return (
    <form action="submit">
      <label htmlFor={props.id}>Search Location </label>
      <input
        onChange={props.change}
        type="text"
        id={props.id}
        placeholder={props.placeholder}
      />

      <button onClick={props.submit} type="submit">
        <FontAwesomeIcon icon={faSearchLocation} />
      </button>

      <button onClick={props.getLocation}>
        <FontAwesomeIcon icon={faMapMarkerAlt} />
      </button>
    </form>
  );
}

