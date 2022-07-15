import { Box, CircularProgress, Grid } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import Progress from "../../components/Progress/Progress";
import {
	FormSignIn,
	FormRecoveryWithLogin,
	FormRecoveryWithPass,
	FormRecoveryWithNewPass,
} from "./../../components/Forms";
import styles from "./Auth.module.css";
import { ToastContainer, toast } from 'react-toastify';
import { Toast } from "../../components/Toast/Toast";

const Auth = () => {
	const [step, setStep] = useState(1);
	const {
		isLoading,
		isSuccess,
		message,
		user } = useSelector((state) => state.auth)
	const nextStep = () => {
		setStep(step + 1);
	};
	const prevStep = () => {
		setStep(step - 1);
	};

	const view = () => {
		switch (step) {
			case 1:
				return <FormSignIn nextStep={nextStep} prevStep={prevStep} />;
			case 2:
				return <FormRecoveryWithLogin nextStep={nextStep} prevStep={prevStep} />;
			case 3:
				return <FormRecoveryWithPass nextStep={nextStep} prevStep={prevStep} />;
			case 4:
				return <FormRecoveryWithNewPass nextStep={nextStep} prevStep={prevStep} />;
			default:
				return;
		}
	};


	return (
		<Grid className={styles.auth} container height="100vh">
			{isLoading ?
				<Progress />
				: null}
			<Grid className={styles.auth__left} item xs={0} sm={6}>
				<div className={styles.auth__bg}></div>
			</Grid>
			<Grid className={styles.auth__right} item xs={12} sm={6} display="flex">
				{view()}
			</Grid>
		</Grid>
	);
};
export default Auth;
