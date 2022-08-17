import api from "../api/api"

const getAllPatient = async () => {
	const response = await api.get(`patient`
	).then(res => res.data)
	return response
}
const getPatientById = async (id) => {
	const response = await api.get(`patient/${id}`).then(res=>res.data)
	return response;
}
const getAllPatientDoc = async (id) => {
	const response = await api.get(`patient/numberOfPatients/${id}`).then(res => res.data)
	return response;
}
const patientService = { getAllPatient, getPatientById, getAllPatientDoc }
export default patientService
