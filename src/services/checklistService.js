import api from "../api/api"

const createCheckList = async (data) => {
	const response = await api.post(`checklist/create`, data
	).then(res => res.data)
	
	return response
}

const checklistService = { createCheckList }
export default checklistService
