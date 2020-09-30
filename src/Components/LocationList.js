import React from 'react'

import '../styles/LocationList.css'

export default function LocationList(props) {
	
	const { locations } = props;
	
	return (
		<div className="LocationList">
			<h3>Saved Locations</h3>
			
			<ul>
				{locations.map( loc => {
					return <li>{}</li>
				})}
			</ul>

		</div>
	)
}
