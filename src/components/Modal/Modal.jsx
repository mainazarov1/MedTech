import { Stack } from '@mui/material'
import React from 'react'
import { images } from './../../assets/images/index'
import styles from './Modal.module.css'
import { InputAppContainer } from './../InputApp/InputAppContainer'
const Modal = () => {
	// const input = {
		
	// }
	return (
		<Stack className={styles.modal}>
			<Stack alignItems={'center'}>
				<img className={styles.modal_avatar} src={images.doctor} alt='avatar'/>
			</Stack>
			<Stack gap={'20px'}>
				<InputAppContainer label='Фамилия' />
				<InputAppContainer label='Имя' />
				<InputAppContainer label='Отчество' />
				<InputAppContainer label='Номер телефона' />
				<InputAppContainer label='Email' />
			</Stack>
		</Stack>
	)
}

export default Modal