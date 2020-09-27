// OpenWeather API - openweathermap.org

import axios from 'axios'

const endpoint = 'https://api.openweathermap.org/data/2.5/onecall';
const key = '4de58afe7c0aa78a01498b122c46d7e2';

export const weatherIconEndpoint = 'http://openweathermap.org/img/wn/';


export default function openWeather(latitude, longitude, units) {
	return axios({
		method: "GET",
		url: endpoint,
		dataResponse: "json",
		params: {
			appid: key,
			units: units,
			lat: latitude,
			lon: longitude,
		}
	})
}