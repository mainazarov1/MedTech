import axios from "axios";

const baseURL = 'https://med-tech.herokuapp.com/';

const api = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'application/json',
	}
});

api.interceptors.request.use(
	req => {
		req.headers = {
			Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.jwt_token
		}
		return req;
	}
)

// api.interceptors.response.use(
// 	res => {
		
// 	}
// )

export default api;