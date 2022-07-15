// Libraries and dependencies
import { Box, Stack, Typography, } from "@mui/material";
import { VisibilityOutlined } from "@mui/icons-material";
import IconArrow from "../../assets/icons/IconArrow";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// Components
import { ButtonApp } from "../ButtonApp/ButtonApp";
import { InputAppContainer } from "../InputApp/InputAppContainer";
// Styles
import styles from './Forms.module.css';
export const FormRecoveryWithPass = ({ prevStep, nextStep }) => {
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
	} = useForm({ resolver: yupResolver(schema) });

	// Functions
	const onSubmit = (data) => {
		console.log(data);
		// nextStep();
	};
	return (
		<Box
			className={styles.form}
			component="form"
			onSubmit={nextStep}
			// onSubmit={handleSubmit(onSubmit)}
		>
			<Stack
				className={styles.form__button_back}
				children={
					<ButtonApp
						variant="text"
						colorText="black"
						icon={<IconArrow props='#4C464B' />}
						startIcon={true}
						title="Назад"
						hover={false}
						prevStep={prevStep}
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
					Новый пароль был отправлен на вашу почту tarasova.margo01@gmail.com
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
			<ButtonApp
				className={styles.form__button}
				variant="contained"
				title="Продолжить"
				type="submit"
				fullWidth={false}
				disabled={false}
			/>
		</Box>
	);
};
