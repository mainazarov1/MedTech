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
	const toStep = (val) => {
		setStep(val);
	};
	

	const view = () => {
		switch (step) {
			case 1:
				return <FormSignIn toStep={toStep} />;
			case 2:
				return <FormRecoveryWithLogin toStep={toStep} />;
			case 3:
				return <FormRecoveryWithPass toStep={toStep} />;
			case 4:
				return <FormRecoveryWithNewPass toStep={toStep} />;
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
