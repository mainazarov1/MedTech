// Libraries and dependencies
import { Box, Stack, Typography, } from "@mui/material";
import { VisibilityOutlined } from "@mui/icons-material";
import IconArrow from "./../../../assets/icons/IconArrow";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// Components
import { ButtonApp } from "./../../../components/ButtonApp/ButtonApp";
import { InputAppContainer } from "./../../../components/InputApp/InputAppContainer";
// Styles
import styles from './Forms.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePass } from "./../../../redux/features/user/userAction";
import { useEffect } from "react";

export const FormRecoveryWithNewPass = ({ toStep }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch();
	const {
		isLogged,
		isLoading,
		isSuccess,
		message,
		user } = useSelector((state) => state.auth)
	// Yup schema
	const schema = Yup.object().shape({
		password: Yup.string()
			.min(6, 'Пароль должен быть больше 6 символов')
			.max(40, 'Пароль должен быть менее 40 символов')
			.required('Введите Ваш пароль'),
		passwordConfirmation: Yup.string()
			.min(6, 'Пароль должен быть больше 6 символов')
			.max(40, 'Пароль должен быть менее 40 символов')
			.oneOf([Yup.ref('password'), null], 'Пароль не соответствует')
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
			password: '',
			passwordConfirmation: ''
		},
		mode: 'onChange'
	});

	// Functions
	const onSubmit = async (data) => {
		// const response = user?.role === 'doctor'
		// 	? dispatch(changePass({ id: user.id, password: data.password, path: 'Doctor' }))
		// 	: dispatch(changePass({ id: user.id, password: data.password, path: 'Admin' }))
		
		const response = dispatch(changePass({ id: user.id, password: data.password, path: user?.role === 'doctor' ? 'Dcotor' :'Admin' }))
	};
	useEffect(() => {
		if (message === 'Password was successfully changed') {
			toStep(1)
		}
	},
		[message, toStep]
	)

	return (
		<Box
			className={styles.form}
			component="form"
			onSubmit={handleSubmit(onSubmit)}
		>
			<Stack
				className={styles.form__button_back}
				children={
					<ButtonApp
						title="Назад"
						variant="text"
						startIcon={<IconArrow props='#4C464B' />}
						handleClick={() => toStep(3)}
						style={{
							color: '#4C464B'
						}}
					/>
				}
			/>
			<Typography
				className={styles.form__title}
				component="h3"
			>
				Восстановление пароля
			</Typography>
			<Stack direction="column" spacing="30px" pb="60px">
				<Stack className={styles.form__inputWrap}>
					<Controller
						name="password"
						control={control}
						render={({ field }) => (
							<InputAppContainer
								field={field}
								className={styles.form__label}
								label="Новый пароль"
								type="password"
								errors={errors}
								icon={<VisibilityOutlined />}
							/>)}
					>
					</Controller>
				</Stack>
				<Stack className={styles.form__inputWrap}>
					<Controller
						name="passwordConfirmation"
						control={control}
						render={({ field }) => (
							<InputAppContainer
								field={field}
								className={styles.form__label}
								label="Повторите новый пароль"
								type="password"
								errors={errors}
								icon={<VisibilityOutlined />}
							/>)}
					>
					</Controller>
				</Stack>
			</Stack>
			<ButtonApp
				className={styles.form__button}
				title="Продолжить"
				variant="contained"
				type="submit"
				disabled={!isDirty || !isValid}
			/>
		</Box>
	);
};
