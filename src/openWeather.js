// OpenWeather API - openweathermap.org

// import axios from 'axios'

export const weatherEndpoint = 'https://api.openweathermap.org/data/2.5/onecall';
export const weatherKey = '4de58afe7c0aa78a01498b122c46d7e2';

// export default function getWeather({ latitude, longitude }) {
//   axios({
//     method: "GET",
//     url: endpoint,
//     dataResponse: "json",
//     params: {
//       appid: key,
//       lat: latitude,
//       lon: longitude,
//     },
//   }).then(result => {
// 		console.log(result.data);
// 		// return result.data;
// 		return result;
//   });
// }