import axios from 'axios';


const key = "53448e4501d116083d33a35d61c684e6bc519944f12d6267a16c8537";
const endpoint = "https://api.ipdata.co";


/**
 * Get user IP address
 * @returns {object} axiosPromise
 */
export default async function getIp() {

	// delete axios.defaults.headers.common['x-access-token'];
	return await axios({
    method: "GET",
    url: `${endpoint}?api-key=${key}`,
    dataResponse: "json",
  }).catch(err => {
		console.log(err);
	});
}