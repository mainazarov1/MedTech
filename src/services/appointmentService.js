import api from "../api/api"

const getAppointmentsByIdAndDate = async ({id, date}) => {
	const response = await api.get(`appointment/${id}/${date}`
	).then(res => res.data)
	
	return response
}
const getAppointmentsByDate = async (date) => {
	const response = await api.get(`appointment/date/${date}`
	).then(res => res.data)
	
	return response
}

const appointmentService = { getAppointmentsByIdAndDate, getAppointmentsByDate }
export default appointmentService
