import axios from "axios";

const baseURL = 'https://med-tech.herokuapp.com/';

const api = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'application/json',
	}
});

console.log(baseURL);
export default api;