import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchLocation, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

/**
 * The search bar for looking up new locations
 * @param {object} props 
 */
export default function SearchBar(props) {

	return (
    <form action="submit" className="searchBar">
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

