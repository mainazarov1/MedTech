import { Stack, Typography } from '@mui/material'
import React from 'react'
import { ButtonApp } from '../../ButtonApp/ButtonApp'
import CloseIcon from '@mui/icons-material/Close';
import styles from './ModalAppointmentCreate.module.css'
import { InputApp } from '../../InputApp/InputApp';
export const ModalAppointmentCreate = ({ handleClick, date, time }) => {
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
				<InputApp label={'Пациент'} placeholder='Выбрать пациента' />
				<ButtonApp style={{
					height: '50px'
				}} variant='contained' title={'Записать'} />
			</Stack>
		</Stack>
	)
}