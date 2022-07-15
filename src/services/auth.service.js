import axios from "axios";
const API_URL = "https://med-tech.herokuapp.com/api/#/";
const register = (username, email, password) => {
	return axios.post(API_URL + "Doctor/DoctorController_register", {
		username,
		email,
		password,
	});
};
const login = (username, password) => {
	return axios
		.post(API_URL + "Doctor/DoctorController_login", {
			username,
			password,
		})
		.then((response) => {
			if (response.data.accessToken) {
				localStorage.setItem("user", JSON.stringify(response.data));
			}
			return response.data;
		});
};
const logout = () => {
	localStorage.removeItem("user");
};
const authService = {
	register,
	login,
	logout,
};
export default authService;