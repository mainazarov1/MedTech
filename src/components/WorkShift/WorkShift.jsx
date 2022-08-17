import { CircularProgress, Stack, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import Ellipse from '../../assets/icons/Ellipse'
import EllipseEmpty from '../../assets/icons/EllipseEmpty'
import { ButtonApp } from '../ButtonApp/ButtonApp'
import styles from './WorkShift.module.css'
export const WorkShift = ({ modal, getTime }) => {
	const { workshift, isLoading } = useSelector(state => state.workshift);
	const { appointment } = useSelector((state) => state.appointment)

	const handleClick = (e) => {
		getTime(e.target.innerText);
		modal(true)
	}
	const times = () => {
		// // if (workShift.lenght !== 0) {
		// // 	return workShift.map((el, i) => <ButtonApp key={i} handleClick={handleClick} className={styles.workShift__btn} title={el} variant='contained' />)
		// // }
		// // if (workShift.lenght !== 0) {
		// return workshift?.map((el, i) => {
		// 	// return appointment.forEach(val => {
		// 	// 	console.log(val.date.slice(11,16) === el);
		// 	// })
		// 	if (appointment?.length !== 0) {
		// 		return appointment?.map(value => {
		// 			if (parseInt(value?.date.slice(11, 16)) === parseInt(el)) {
		// 				return <ButtonApp
		// 					key={i + value.id} padding='20px' handleClick={handleClick} className={styles.workShift__btn + ' ' + styles.workShift__btn_close} title={el.length < 5 ? '0' + el : el} variant='contained' />
		// 			} else {
		// 				return <ButtonApp key={i + value.id} padding='20px' handleClick={handleClick} className={styles.workShift__btn} title={el.length < 5 ? '0' + el : el} variant='contained'/>
		// 			}
		// 		})
		// 	} else {
		// 		return <ButtonApp key={i} padding='20px' handleClick={handleClick} className={styles.workShift__btn} title={el.length < 5 ? '0' + el : el} variant='contained'/>
		// 	}
		// 	// if (appointment?.length !== 0) {
		// 	// 	for (let index = 0; index < appointment?.length; index++) {
		// 	// 		if (parseInt(appointment[index]?.date.slice(11, 16)) === parseInt(el)) {
		// 	// 			return <ButtonApp key={i} padding='20px' handleClick={handleClick} className={styles.workShift__btn + ' ' + styles.workShift__btn_close} title={el.length < 5 ? '0' + el : el} variant='contained'/>
		// 	// 		} else {
		// 	// 			return <ButtonApp key={i} padding='20px' handleClick={handleClick} className={styles.workShift__btn} title={el.length < 5 ? '0' + el : el} variant='contained' />
		// 	// 		}
		// 	// 	}
		// 	// } else {
		// 	// 	return <ButtonApp key={i} padding='20px' handleClick={handleClick} className={styles.workShift__btn} title={el.length < 5 ? '0' + el : el} variant='contained' />
		// 	// }
		// }
		// )

		const workshiftArr = workshift?.map((item, i) => {
			return {
				time: item.length < 5 ? '0' + item : item,
				free: false,
			}
		})
		console.log(workshiftArr);

		appointment?.forEach((item, i) => {
			const time = item?.date.slice(11,16)
			workshiftArr.forEach((el, index) => {
				if (time === el?.time) {
					workshiftArr[index].free = true
				}
			})
		})
		return workshiftArr?.map((el, i) => {
			return <ButtonApp key={i} padding='20px' handleClick={handleClick} className={[styles.workShift__btn, el.free ? styles.workShift__btn_close : ''].join(' ')} title={el.time} variant='contained'/>
		})
	}
	return (workshift?.length !== 0 && workshift !== null
		? <Stack
			className={styles.workShift}
		>
			{isLoading ?
				<CircularProgress sx={{
					display: 'block',
					margin: 'auto'
				}} />
				:
				<Stack
					gap={'20px 0'}>
					<Typography
						className={styles.workShift__title}
						component={'h4'}
					>
						Часы приема
					</Typography>
					<Stack gap={'5px'}>
						<Typography className={styles.workShift__text}>
							<EllipseEmpty props={
								{
									color: '#68B7EC',
									style: {
										'marginRight': '4px',
									}
								}} />
							Свободное время
						</Typography>
						<Typography className={styles.workShift__text}>
							<Ellipse props={
								{
									color: '#68B7EC',
									style: {
										'marginRight': '4px',
									}
								}} />
							Занятое время
						</Typography>
					</Stack>
					<Stack
						className={styles.workShift__btns}>
						{times()}
					</Stack>
				</Stack>}
		</Stack >
		: <Stack
			className={styles.workShift__empty}
		>
			{isLoading ?
				<CircularProgress sx={{
					display: 'block',
					margin: 'auto'
				}} />
				:
				<div
					className={styles.workShift__empty__image}
				>
					<Typography
						className={styles.workShift__empty__text}
						textAlign={'center'}
						position={'relative'}
					>
						Выберите врача
					</Typography>
				</div>
			}
		</Stack>
	)
}