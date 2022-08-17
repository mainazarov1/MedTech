import api from "../api/api"

const createMedcard = async (data) => {
	const response = await api.post(`med-card`, data
	).then(res => res.data)
	console.log(response);
	return response
}

const medcardService = { createMedcard }
export default medcardService
