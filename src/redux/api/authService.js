import api from "./api";

const login = async (userData) => {
	const response = await api.post('admin/login', userData)
	if (response.data) {
		// localStorage.setItem('user', JSON.stringify(response.data))

	}
	return response.data
}

const authService = { login }
export default authService