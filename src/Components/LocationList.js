import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import Location from './Location'

import '../styles/LocationList.css'

export default function LocationList(props) {
	
	const { locations, onSelect, onRemove } = props;
	
	return (
		<div className="LocationList">
			<h3>Saved Locations</h3>
			
			<ul>
				{!locations.length ? 
				<li><p>No locations in list</p></li> :
				
				locations.map( loc => {
					// console.log(loc);
					const { city, state, country } = loc.data;

					return (
            <div className="LocationList-loc">
              <li key={loc.key}>
                <button onClick={() => onSelect(loc.data)}>
                  <Location
										city={city}
										province={state}
										country={country} 
									/>
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
