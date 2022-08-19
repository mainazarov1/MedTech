import api from "../api/api"

const createCheckList = async (data) => {
	const response = await api.post(`checklist/create`, data
	).then(res => res.data)
	return response
}

const createAnswers = async (data) => {
	const response = await api.post(`/answer`, data
	).then(res => res.data)
	console.log(response);
	return response
}

const checklistService = {
	createCheckList,
	createAnswers
	// downloadCheckList
}
export default checklistService
