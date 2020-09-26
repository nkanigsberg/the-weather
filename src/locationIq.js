// LocationIQ API - locationiq.com

// import axios from 'axios'

export const locationEndpoint = "https://us1.locationiq.com/v1/reverse.php";
export const locationKey = "a2f6bb0bb601e5";

	// // get city name from coordinates
	// export default function getCity({ latitude, longitude }) {
	// 	console.log(latitude);
  //   axios({
  //     method: "GET",
  //     url: endpoint,
  //     dataResponse: "json",
  //     params: {
	// 			format: 'json',
  //       key: key,
  //       lat: latitude,
  //       lon: longitude,
  //     },
  //   }).then((result) => {
	// 		console.log(result.data.address.city);
	// 		// return result.data.address.city;
	// 		return result;
  //   });
  // }