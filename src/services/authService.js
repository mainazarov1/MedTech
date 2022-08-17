import jwtDecode from "jwt-decode";
import api from "../api/api";

const login = async (userData) => {
	const response = await api.post(`auth/login`, userData);
	if (response.data) {
		const decoded = jwtDecode(response.data.access_token)
		const user = {
			user: decoded.user,
			jwt_token: response.data.access_token
		}
		localStorage.setItem('user', JSON.stringify(user))
	}
	return response.data
}

const forgotPass = async (userData) => {
	const response = await api.post(`auth/forgotpass`, userData);
	return response.data
}

const changePass = async (id, password, path) => {
	const response = await api.patch(`auth/changePass${path}/${id}`, { password });
	return response.data
}

const authService = { login, forgotPass, changePass }
export default authService