import api from "../api/api"

const archiveUser = async ({role,id}) => {
	const response = await api.patch(`${role}/archive/${id}`
	).then(res => res.data)
	
	return response
}

const archiveService = { archiveUser }
export default archiveService
