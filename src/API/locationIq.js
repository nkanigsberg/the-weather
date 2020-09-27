// LocationIQ API - locationiq.com

import axios from 'axios'

const endpoint = "https://us1.locationiq.com/v1/";
const key = "a2f6bb0bb601e5";


/**
 * Reverse Geocoding - get location data from coordinates
 * @param {number} latitude
 * @param {number} longitude
 * @returns {object} axiosPromise
 */
export function reverseGeo(latitude, longitude) {
	return axios({
    method: "GET",
    url: endpoint + "reverse.php",
    dataResponse: "json",
    params: {
      format: "json",
      key: key,
      lat: latitude,
			lon: longitude,
    },
  });
}


/**
 * Forward Geocoding - get coordinates from location name
 * @param {string} location The location to get coordinates for
 * @returns {object} axiosPromise
 */
export function forwardGeo(location) {
  return axios({
    method: "GET",
    url: endpoint + "search.php",
    dataResponse: "json",
    params: {
      format: "json",
      key: key,
      q: location,
    },
  });
}