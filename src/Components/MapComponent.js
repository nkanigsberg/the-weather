import React, { Component } from 'react'

import { render } from "react-dom";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

import '../styles/MapComponent.css'

export default class MapComponent extends Component {
	constructor() {
		super();
		
		this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13,
    };
	}

  
	

	componentDidMount() {
    // // Initialize an empty map without layers (invisible map)
    // this.map = L.map("map", {
    //   center: [40.7259, -73.9805], // Map loads with this location as center
    //   zoom: 12,
    //   scrollWheelZoom: true,
    //   zoomControl: false,
    //   attributionControl: false,
		// });
		
		//   //Geocoder options
    // this.geocoderControlOptions = {
    //   bounds: false, //To not send viewbox
    //   markers: false, //To not add markers when we geocoder
    //   attribution: null, //No need of attribution since we are not using maps
    //   expanded: true, //The geocoder search box will be initialized in expanded mode
    //   panToPoint: false, //Since no maps, no need to pan the map to the geocoded-selected location
    // };

    // //Initialize the geocoder
    // this.geocoderControl = new L.control.geocoder(
    //   "a2f6bb0bb601e5",
    //   geocoderControlOptions
    // )
    //   .addTo(map)
    //   .on("select", function (e) {
    //     displayLatLon(
    //       e.feature.feature.display_name,
    //       e.latlng.lat,
    //       e.latlng.lng
    //     );
    //   });
  }


	render() {


		const position = [this.state.lat, this.state.lng];
		return (
			<Map center={position} zoom={this.state.zoom}>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
				/>
				<Marker position={position}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			</Map>
		);












		// const position = [this.state.lat, this.state.lng];

		// return (
    //   <Map center={position} zoom={this.state.zoom}>
    //     <TileLayer
    //       attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    //       url="https://tile.openweathermap.org/map/temp_new/2/1/3.png?appid=4de58afe7c0aa78a01498b122c46d7e2"
    //     />
    //     <Marker position={position}>
    //       <Popup>
    //         A pretty CSS3 popup. <br /> Easily customizable.
    //       </Popup>
    //     </Marker>
    //   </Map>

      // <div>
      //   {/* <!-- For the invisible map --> */}
      //   <div id="map"></div>
      //   {/* <!-- For the search box --> */}
      //   <div id="search-box"></div>
      //   {/* <!-- To display the result --> */}
      //   <div id="result"></div>
      // </div>
    // );
  }
}
