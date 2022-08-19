import { Stack } from '@mui/material'
import React from 'react'
import styles from './ModalCreateAdmin.module.scss'
import mainStyles from './../../../styles/index.module.scss'
import { InputApp } from '../../InputApp/InputApp'
import CloseIcon from '@mui/icons-material/Close';
import { ButtonApp } from '../../ButtonApp/ButtonApp'
import CreateDoctor from './CreateDoctor'
import CreateAdmin from './CreateAdmin'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import api from '../../../api/api'
const ModalCreateAdmin = ({ handleClick, role }) => {
	// Yup schema
	const schema = Yup.object().shape({
		last_name: Yup.string().required('Введите Фамилию'),
		name: Yup.string().required('Введите Имя'),
		patronymic: Yup.string().required('Введите Отчество'),
		address: Yup.string()
		// .required('Введите адрес')
		,
		phone: Yup.string()
			.min(13, 'Введите номер телефона'),
		email: Yup.string()
			.email('Неверно указана почта')
			.required('Введите Вашу почту'),
	}).required();
	const defaultUserValues = {
		last_name: '',
		name: '',
		patronymic: '',
		phone: '',
		email: '',
		address: '',
	}
	// React-Hook-Form
	const { handleSubmit, control,
		formState: {
			errors,
		},
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			...defaultUserValues,
		},
		// mode: 'onChange'
		mode: 'onSubmit'
	});
	const onSubmit = (data) => {
		console.log(data);
		if (role.role === 'doctor') {
			const req = async () => {
				const response = await api.post(`doctor/register`, data
				).then(res => res.data)
				console.log(response);
				handleClick(false)
			}
			req()
		} else {
			delete data.address
			const req = async () => {
				const response = await api.post(`admin/register`, {
					...data,
					role: role?.role
				}
				).then(res => res.data)
				console.log(response);
				handleClick(false)
			}
			req()
		}

	}
	return (
		<Stack
			component={'form'}
			onSubmit={handleSubmit(onSubmit)}
			className={styles.modal}
			gap={
				role.role !== 'doctor'
					? '30px'
					: '0px'}
		>
			{/* <ButtonApp
				sx={{
					marginBottom: '20px',
					'&.MuiButton-root': {
						padding: '0px',
						minWidth: '22px',
						maxWidth: '22px',
						marginLeft: 'auto',
						'&:hover': {
							color: 'red',
							'& span.MuiButton-startIcon': {
								marginRight: 0,
								'& svg': {
									'& path': {
										fill: 'red',
									}
								}
							}
						},
						'& span.MuiButton-startIcon': {
							marginRight: 0,
							'& svg': {
								'& path': {
									fill: '#4C464B',
								}
							}
						},
					}
				}}
				startIcon={<CloseIcon />}
				handleClick={handleClick}
			/> */}
			{/* <Stack
				justifyContent={'flex-end'}
				alignItems="flex-end"
			>
				<span
				className={mainStyles.btn_close}
				onClick={handleClick}>
				<CloseIcon/>
			</span>
			</Stack> */}
			<p
				className={styles.modal__title}
				children={`Создание ${role?.title.toLowerCase()}a`}
			/>
			{
				role.role === 'doctor'
					? <CreateDoctor control={control} errors={errors} />
					: <CreateAdmin control={control} errors={errors} />
			}
			<Stack direction={'row'} gap={'20px'}
				marginTop={
					role.role === 'doctor'
						? '30px'
						: '0px'}
			>
				<ButtonApp title='Сохранить' variant='contained' type={'submit'} />
				<ButtonApp title='Отменить' variant='outlined' handleClick={() => handleClick(false)} />
			</Stack>
		</Stack>
	)
}

export default ModalCreateAdmin