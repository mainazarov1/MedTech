// Libraries and dependencies
import { Box, Stack, Typography } from "@mui/material";
import { VisibilityOutlined } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// Components
import { ButtonApp } from "../ButtonApp/ButtonApp";
import { InputAppContainer } from "../InputApp/InputAppContainer";
// Styles
import styles from './Forms.module.css'


import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";
import { login, loginOneTimes } from "../../redux/features/user/userAction";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from "react-router-dom";

export const FormSignIn = ({ toStep }) => {
	const dispatch = useDispatch();
	// const state = useSelector(state=>state.auth)
	const {
		isLogged,
		isLoading,
		isSuccess,
		message,
		user } = useSelector((state) => state.auth)


	// Yup schema
	const schema = Yup.object().shape({
		email: Yup.string()
			.email('Неверно указана почта')
			.required('Введите Вашу почту'),
		password: Yup.string()
			.min(6, 'Пароль должен быть больше 6 символов')
			.max(40, 'Пароль должен быть менее 40 символов')
			.required('Введите Ваш пароль'),
	}).required();

	// React-Hook-Form
	const { handleSubmit, control,
		formState: {
			errors,
		}
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			email: '',
			password: ''
		}
	});

	const navigate = useNavigate()
	// Functions
	const onSubmit = (data) => {
		const userData = { email: data.email, short: data.password };
		(dispatch(loginOneTimes(userData)))
		
			isSuccess === true
				? toStep(4)
				: (dispatch(login(data)))
		// nextStep();
	};


	useEffect(() => {
		if (user?.user?.role === 'admin') {
			navigate('/manual')
		}
		if (user?.user?.role === 'doctor') {
			navigate('/schedule')
		}
		if (message === 404) {
			console.log('errrrrrroooor');
		}
	}, [isLogged,
		isLoading,
		isSuccess,
		message,
		user, dispatch, navigate])

	return (
		<Box
			className={styles.form}
			component="form"
			// onSubmit={nextStep}
			onSubmit={handleSubmit(onSubmit)}
		>
			<ToastContainer
				style={{
					width: 'fit-content',
				}}
				autoClose={2000}
			/>
			<Typography
				className={styles.form__title}
				component="h3">
				Вход
			</Typography>
			<Stack direction="column" spacing="30px" pb="60px">
				<Stack className={styles.form__inputWrap}>
					<Controller
						name="email"
						control={control}
						render={({ field }) => (
							<InputAppContainer
								field={field}
								className={styles.form__label}
								label="Логин"
								type="email"
								errors={errors}
							/>)}
					>
					</Controller>
				</Stack>
				<Stack className={styles.form__inputWrap}>
					<Controller
						name="password"
						control={control}
						render={({ field }) => (
							<InputAppContainer
								field={field}
								className={styles.form__label}
								label="Пароль"
								type="password"
								errors={errors}
								icon={<VisibilityOutlined />}
							/>)}
					>
					</Controller>
				</Stack>
			</Stack>
			{/* <Link
				to={"manual"}
				style={{
					textDecoration: "none",
				}}
			> */}
			<ButtonApp
				className={styles.form__button}
				variant="contained"
				title="Войти"
				type="submit"
				fullWidth={false}
				disabled={false}
			/>
			{/* </Link> */}
			<Stack
				mt={"24px"}
				alignItems='center'
				children={
					<ButtonApp
						variant="text"
						title="Забыли пароль?"
						fullWidth="false"
						step={2}
						toStep={toStep}
					/>
				}
			/>
		</Box>
	);
};
