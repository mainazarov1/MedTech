import api from "../api/api"

const achivateUser = async ({role,id}) => {
	const response = await api.patch(`${role}/archive/${id}`
	).then(res => res.data)
	
	return response
}

const achivateService = { achivateUser }
export default achivateService
