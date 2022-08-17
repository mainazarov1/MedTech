// Libraries and dependencies
import { Box, Stack, Typography, } from "@mui/material";
import IconArrow from "./../../../assets/icons/IconArrow";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// Components
import { ButtonApp } from "./../../../components/ButtonApp/ButtonApp";
// Styles
import styles from './Forms.module.css';
import { InputApp } from "./../../../components/InputApp/InputApp";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { forgotPass } from "./../../../redux/features/user/userAction";
export const FormRecoveryWithLogin = ({ toStep, setUserData }) => {

	const dispatch = useDispatch();
const {message} = useSelector((state)=>state.auth)
	// Yup schema
	const schema = Yup.object().shape({
		email: Yup.string()
			.email('Неверно указана почта')
			.required('Введите Вашу почту'),
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
		},
		mode: 'onChange'
	});

	// Functions
	const onSubmit = (data) => {
		dispatch(forgotPass(data))
		setUserData(data)
	};
	useEffect(() => {
		if (message==="Confirmation code was successfully sent") {
			toStep(3)
		}
	},[message, toStep])
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
						handleClick={() => toStep(1)}
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
						name="email"
						control={control}
						render={({ field }) => (
							<InputApp
								field={field}
								className={styles.form__label}
								label="Логин"
								type="email"
								errors={errors}
							/>)}
					>
					</Controller>
				</Stack>
			</Stack>
			<ButtonApp
				className={styles.form__button}
				title="Войти"
				variant="contained"
				type="submit"
				disabled={!isDirty || !isValid}
			/>
		</Box>
	);
};
