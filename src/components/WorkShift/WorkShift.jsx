import React from 'react'
import { ButtonApp } from '../ButtonApp/ButtonApp'
import styles from './WorkShift.module.css'
export const WorkShift = () => {
	const workShift = [
		'09:00', '10:00', '11:00', '12:00',
		'14:00', '15:00', '16:00', '17:00',
	]
	const handleClick = (title) => {
		console.log(title);
		alert(title)
	}
	const times = () => {
		return workShift.map((el) => <ButtonApp handleClick={handleClick} className={styles.workshift__btn} title={el} style={{color: 'white', width: '90px'}} variant='contained' />)
	}
	return (
		<div className={styles.workshift}>
			{times()}
		</div>
	)
}

{/* <ButtonApp
	className={styles.btn}
	title={"Расписание"}
	type={""}
	variant={isActive ? 'contained' : 'text'}
	startIcon={true}
	icon={<IconCalendar props={isActive ? '#FFFFFF' : '#4C464B'} />}
	iconWidth="22px"
	isActive={isActive}
	color={isActive ? '#FFFFFF' : '#4C464B'}
	hover={""}
	fullWidth={false}
	style={{
		width: "fit-content",
		height: "44px",
		color: isActive ? '#FFFFFF' : '#4C464B'
	}}
/> */}