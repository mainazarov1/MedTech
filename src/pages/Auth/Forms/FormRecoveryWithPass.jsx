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
import { login } from "./../../../redux/features/user/userAction";
import { useEffect } from "react";
import { resetMessage } from "../../../redux/features/user/userSlice";
export const FormRecoveryWithPass = ({ toStep, userData }) => {
	const { user } = useSelector((state) => state.auth)
	const dispatch = useDispatch()

	// Yup schema
	const schema = Yup.object().shape({
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
			password: ''
		},
		mode: 'onChange'
	});

	// Functions
	const onSubmit = (data) => {
		dispatch(login({ ...userData, ...data }))
	};
	useEffect(() => {
		if (user) {
			toStep(4)
		}
	}, [user, toStep, dispatch])
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
						handleClick={() => {
							toStep(2)
							dispatch(resetMessage())
						}}
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
				<Typography
					className={styles.form__subtitle}
					component="p">
					Новый пароль был отправлен на вашу почту {userData.email}
				</Typography>
			</Typography>
			<Stack direction="column" spacing="30px" pb="60px">
				<Stack className={styles.form__inputWrap}>
					<Controller
						name="password"
						control={control}
						render={({ field }) => (
							<InputAppContainer
								field={field}
								// className={styles.form__label}
								label="Пароль"
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
