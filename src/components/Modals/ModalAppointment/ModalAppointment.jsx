import { Stack, Typography } from '@mui/material'
import React from 'react'
import { ButtonApp } from '../../ButtonApp/ButtonApp'
import CloseIcon from '@mui/icons-material/Close';
import styles from './ModalAppointment.module.css'
import { useSelector } from 'react-redux';
import {icons} from './../../../assets/icons/index'
export const ModalAppointment = ({ handleClick, data }) => {
	const { patient } = useSelector(state => state.patient)
	const { doctor } = useSelector(state => state.doctor)
	console.log(data);
	console.log(doctor, patient);
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
			<Stack
				className={styles.modal__profile}
				direction={'row'}
				alignItems={'center'}
				gap={'25px'}
				marginBottom={'10px'}
			>
				<img
					className={styles.modal__avatar}
					src={data?.image === null ? data.image : icons.avatar} alt='avatar'></img>
				<Stack
					gap={'10px'}
				>
					<Typography
						className={styles.modal__text}>
						{data.doctor}
					</Typography>
					<a className={styles.modal__text} href="tel:+996 700 999 666">{data.doctorPhone}</a>
				</Stack>
			</Stack>
			<Stack
				direction={'row'}
				alignItems={'center'}
				gap={'25px'}
				marginBottom={'20px'}
				className={styles.modal__profile}
			>
				<img
					className={styles.modal__avatar}
					src={data?.image === null ? data.image : icons.avatar} alt='avatar'/>
				<Stack
					gap={'10px'}
				>
					<Typography className={styles.modal__text}>
						{data.patient}
					</Typography>
					<a className={styles.modal__text} href={`tel:${data.patientPhone}`}>{data.patientPhone}</a>
				</Stack>
			</Stack>
			<Stack
				gap={'20px'}>
				<Stack
					gap={'5px'}
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
							{data.date}
						</Typography>
						<Typography
							className={styles.modal__text}
						>
							{data.time}
						</Typography>
					</Stack>
				</Stack>
				<Stack
					gap={'5px'}
				>
					<Typography
						className={styles.modal__description}
					>
						Причины встречи
					</Typography>
					<Stack>
						<Typography
							className={styles.modal__text}
						>
							{data.description}
						</Typography>
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	)
}