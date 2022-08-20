import { Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ButtonApp } from '../../ButtonApp/ButtonApp'
import CloseIcon from '@mui/icons-material/Close';
import styles from './ModalAppointmentCreate.module.css'
import { InputApp } from '../../InputApp/InputApp';
import api from '../../../api/api';
import { useSelector } from 'react-redux';
export const ModalAppointmentCreate = ({ doctorId, handleClick, date, time, data }) => {
	const { patient } = useSelector(state => state.patient)
	const [patients, setPatients]=useState()
	const [search, setSearch] = useState('')
	// const [patientId, setPatientId] = useState()

	useEffect(() => {
		function getData() {
			if (patient !== null) {
				if (search) {
					const searchFilter = () => {
						return patient.filter((pat) => {
							const fullName = `${pat.last_name}${pat.name}${pat.patronymic}`.toLowerCase();
							const reversedFullName = `${pat.last_name}${pat.name}${pat.patronymic}`.toLowerCase();
							const trimmedSearchValue = search.replace(/\s+/g, '').toLowerCase();
							return fullName.includes(trimmedSearchValue) || reversedFullName.includes(trimmedSearchValue)
						})
					}
					setPatients((searchFilter()))
				}
				else {
					setPatients(patient)
				}
			}
		}
		getData()
	}, [search])
	console.log(date.slice(0,11),time,date.slice(16))
	
	const createAppointment = async (e) => {
		console.log(e);
		try {
			await api.get(`/patient/findBySurname/${search}`).then(res => res.data).then(data => {
				try {
					console.log(data[0]?.id);
					console.log(data);
					const patientId = data[0]?.id;
					api.post('/appointment', {
						date: `${date.slice(0, 11)}${time}${date.slice(16)}`,
						doctor: doctorId,
						patient: patientId
					})
					handleClick()
				} catch (error) {
					console.log('Apoointment not register');
				}
			})
		} catch (e) {
			console.log(e);
		};
	}
	const removeAppointment = async (e) => {
		const appointmentId = e.data.id
		try {
			await api.delete(`/appointment/cancel/${appointmentId}`)
			await handleClick()
		} catch (error) {
			console.log('Apoointment not delete');
		}
	}
	return (
		<Stack className={styles.modal}
		>
			<ButtonApp
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
			/>

			<Typography
				className={styles.modal__title}>
				{'Запись на прием'}
			</Typography>

			<Stack
				gap={'5px'}
				marginBottom={'20px'}
			>
				<Typography
					className={styles.modal__description}
				>
					Дата и время встречи
				</Typography>
				<Stack
					direction={'row'}
					gap={'15px'}
				>
					<Typography
						className={styles.modal__text}
					>
						{date.slice(0, 10).split('-').reverse().join('.')}
					</Typography>
					<Typography
						className={styles.modal__text}
					>
						{time}
					</Typography>
				</Stack>
			</Stack>
			<Stack
				gap={'30px'}
			>
				<InputApp label={'Пациент'} placeholder={'Выбрать пациента'}
					onChange={(e) => setSearch(e.target.value)}
					value={data?.patient?.last_name}
				/>
				
				<ButtonApp style={{
					height: '50px',
					background: data.free ? '#68b7ec' : '#d42027'
				}}
					handleClick={data.free ? () => createAppointment(data) : () => removeAppointment(data)}
					variant='contained' title={data.free ? 'Записать' : 'Отменить запись'} />
			</Stack>
		</Stack>
	)
}