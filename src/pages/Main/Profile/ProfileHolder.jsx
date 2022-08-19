import { useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import api from "../../../api/api";
import doctorService from "../../../services/doctorService";
import Profile from "./Profile"

const ProfileHolder = ({ mode = 'myProfile' }) => {
	const { id } = useParams();
	const { user } = useSelector(state => state.auth)
	const [data, setData] = useState(null);

	
	const handlUpdateProfile = (data) => {
		api.patch(`/doctor/updateDoc/${data.id}`, data).then(res=>res)
	}
	useEffect(() => {
		if (mode === 'employeesProfile') {
			doctorService.getDoctorById(id)
				.then((res) => setData(res));
		}
		else {
			setData(user);
		}
	}, [id, user, mode]);
	return (
		<>
			{
				data &&
				<Profile data={data} mode={mode} onUpdateProfile={ handlUpdateProfile} />
			}
		</>
	)
}

export default ProfileHolder;