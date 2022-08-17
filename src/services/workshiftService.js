import api from "../api/api";

const token = JSON.parse(localStorage.getItem('user'))?.jwt_token;

const getWorkShift = async ({id, date}) => {
	const response = await api.get(`doctor-workshift/${id}/${date}`, {
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json'
		}
	}).then(res => res.data);
	return response
}


const workshiftService = { getWorkShift }
export default workshiftService

