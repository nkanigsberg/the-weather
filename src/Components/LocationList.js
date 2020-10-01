import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import Location from './Location'

import '../styles/LocationList.css'

export default function LocationList(props) {
	
	const { locations, onSelect, onRemove, city, state, country} = props;
	
	// /**
	//  * Return true if this is the selected location
	//  */
	const selectedLocation = (loc) => {
		return loc.data.city === city && loc.data.state === state && loc.data.country === country ? true : false;
	}


	return (
		<div className="LocationList">
			<h3>Saved Locations</h3>
			
			<ul>
				{!locations.length ? 
				<li><p>No locations in list</p></li> :
				
				locations.map( loc => {
					const { city, state, country } = loc.data;

					return (
            <div className={`LocationList-loc ${selectedLocation(loc) ? 'selected' : ''}`}>
              <li key={loc.key}>
                <button className="LocationList-select" onClick={() => onSelect(loc.data)}>
                  <Location city={city} province={state} country={country} />
                </button>
              </li>

              <button
                onClick={() => onRemove(loc.key)}
                className="LocationList-remove"
                aria-label="Remove"
                title="Remove"
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          );
				})}
			</ul>

		</div>
	)
}
