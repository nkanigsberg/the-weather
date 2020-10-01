import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchLocation, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

import '../styles/SearchBar.css'

/**
 * The search bar for looking up new locations
 * @param {object} props 
 */
export default function SearchBar(props) {

	return (
    <form action="submit" className="searchBar">
      <label className="sr-only" htmlFor={props.id}>Search Location</label>
      <input
        onChange={props.change}
        type="text"
        id={props.id}
        placeholder={props.placeholder}
      />

      <button
        onClick={props.submit}
        type="submit"
        aria-label="Search Location"
        title="Search Location"
      >
        <FontAwesomeIcon icon={faSearchLocation} />
      </button>

      <button
        onClick={props.getLocation}
        aria-label="Use Current Location"
        title="Use Current Location"
      >
        <FontAwesomeIcon icon={faMapMarkerAlt} />
      </button>
    </form>
  );
}

