// Libraries and dependencies
import { Box, Stack, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// Components
import { ButtonApp } from "./../../../components/ButtonApp/ButtonApp";
import { InputAppContainer } from "./../../../components/InputApp/InputAppContainer";
// Styles
import styles from './Forms.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";
import { login } from "./../../../redux/features/user/userAction";
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from "react-router-dom";
import { InputApp } from "./../../../components/InputApp/InputApp";

export const FormSignIn = ({ toStep }) => {
	const dispatch = useDispatch();
	const {
		isLogged,
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
			isDirty,
			isValid
		}
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			email: '',
			password: ''
		},
		mode: 'onChange'
	});
	const navigate = useNavigate()

	// States

	// Functions
	const onSubmit = (data) => {
			dispatch(login(data))
	};

	useEffect(() => {
		if (isLogged && !user.isActivated) {
			toStep(4)
		} else {
			if (isLogged && ['admin','superadmin'].includes(user?.role)) {
				navigate('/schedule')
			}
			if (isLogged && user?.role === 'doctor') {
				navigate('/manual')
			}
		}
	}, [isLogged,
		user, navigate, toStep])
	
	return (
		<Box
			className={styles.form}
			component="form"
			onSubmit={handleSubmit(onSubmit)}
		>
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
							<InputApp
								field={field}
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
								label="Пароль"
								type="password"
								errors={errors}
							/>)}
					>
					</Controller>
				</Stack>
			</Stack>
			<ButtonApp
				className={styles.form__button}
				variant="contained"
				title="Войти"
				type="submit"
				disabled={!isDirty || !isValid}
			/>
			<Stack
				mt={"24px"}
				alignItems='center'
				children={
					<ButtonApp
						variant="text"
						title="Забыли пароль?"
						handleClick={() => toStep(2)}
					/>
				}
			/>
		</Box>
	);
};
