import api from "../api/api"

const getAllDoctor = async () => {
	const response = await api.get(`doctor`
	).then(res => res.data)
	return response
}
// Search doctor by ID
const getDoctorById = async (id) => {
	const response = await api.get(`doctor/${id}`).then(res => res.data)
	return response;
}
const getDoctorBySurname = async (surname) => {
	const response = await api.get(`doctor/findDoctorsBySurname/${surname}`).then(res => res.data)
	return response;
}
const doctorService = { getAllDoctor, getDoctorById, getDoctorBySurname }

export default doctorService
