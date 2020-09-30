// import { ImageOverlay } from 'leaflet';
import React, { Component } from 'react'

import { render } from "react-dom";
import { Map, TileLayer, LayersControl } from "react-leaflet";

import '../styles/MapComponent.css'

// import Search from 'react-leaflet-search';

export default function MapComponent(props) {

	const { lat, lon, mapType, onChange } = props;
	let zoom = 5;

	const position = [lat, lon];

	/**
	 * Pass the value to parent component
	 */
	const passValue = e => {
		// console.log(e.target.value);
		onChange(e.target.value);
	}



	return (
    <div className="MapComponent">
      <Map center={position} zoom={zoom}>
        {/* <TileLayer
							attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
						/> */}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />

        <TileLayer
          url={`https://tile.openweathermap.org/map/${mapType}/{z}/{x}/{y}.png?appid=4de58afe7c0aa78a01498b122c46d7e2`}
          /* bounds={[[lat - 10, lon - 10], [lat + 10, lon + 10]]} */
          /* zIndex={2} */
        />

        {/* <Marker position={position}>
							<Popup>
								A pretty CSS3 popup. <br /> Easily customizable.
							</Popup>
						</Marker> */}
      </Map>

      {/* map layer control */}
      <form onChange={passValue} className="mapLayer" action="#">
        <div className="mapLayer-control">
          <input
            type="radio"
            name="mapLayerControl"
            id="clouds_new"
            value="clouds_new"
            checked={mapType === "clouds_new" ? true : false}
          />
          <label htmlFor="clouds_new">Clouds</label>
        </div>
        <div className="mapLayer-control">
          <input
            type="radio"
            name="mapLayerControl"
            id="precipitation_new"
            value="precipitation_new"
            checked={mapType === "precipitation_new" ? true : false}
          />
          <label htmlFor="precipitation_new">Precipitation</label>
        </div>
        <div className="mapLayer-control">
          <input
            type="radio"
            name="mapLayerControl"
            id="temp_new"
            value="temp_new"
            checked={mapType === "temp_new" ? true : false}
          />
          <label htmlFor="temp_new">Temperature</label>
        </div>
      </form>
    </div>
  );
}
