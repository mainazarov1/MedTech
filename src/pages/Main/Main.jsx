// React
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// MUI
import { Stack } from "@mui/material";
import { Container } from "@mui/system";
// Components
import {Progress} from "../../components/Progress/Progress";
import { Header } from "../../components/Header/Header";
import { Navigation } from "../../components/Navigation/Navigation";
// Pages
import Schedule from "./Schedule/Schedule";
import Patients from "./Patients/Patients";
import Employees from "./Employees/Employees";
import Profile from "./Profile/Profile";
// styles
import styles from './Main.module.css';
import { getAllDoctor } from "../../redux/features/doctor/doctorAction";
import { getAllPatient, getAllPatientDoc } from "../../redux/features/patient/patientAction";
import ProfilePatient from "./Profile/ProfilePatient";
const Main = () => {
	const { isLoading, user } = useSelector((state) => state.auth)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getAllDoctor())
		if (user?.role === 'doctor') {
			console.log('triger');
			dispatch(getAllPatientDoc(user.id))
		} else {
			dispatch(getAllPatient())
		}
	}, [dispatch, user])
	return (
		<>
			<Header />
			<Navigation />
			<Stack
				className={styles.main}
			>
				<Container
					maxWidth="xl"
					sx={{
						height: "100%",
						paddingTop: "20px",
						paddingBottom: "20px",
					}}
				>
					{isLoading ?
						<Progress />
						: null}
					<Routes>
						<Route path={"schedule"} element={<Schedule />} />
						<Route path={"employees"} element={<Employees />} />
						<Route path={"employees/:id"} element={<Profile />} />
						<Route path={"patients"} element={<Patients />} />
						<Route path={"patients/:id"} element={<ProfilePatient />} />
						<Route path={"profile"} element={<Profile/>} />
					</Routes>
				</Container>
			</Stack>
		</>
	);
};
export default Main