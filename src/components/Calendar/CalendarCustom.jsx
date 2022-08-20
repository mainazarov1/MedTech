import React, { useState } from 'react';
import Calendar from 'react-calendar';
import styles from './Calendar.module.css';
import 'react-calendar/dist/Calendar.css';
export const CalendarCustom = ({ getDate, getDay, handleClick }) => {
	const [date, setDate] = useState(new Date().setHours(new Date().getHours - 10));
	// const formatDate = (val) => {
	// 	if (`${val}`.length === 1) {
	// 		return `0${val}`
	// 	}
	// 	return val
	// }
	return (
		<Calendar
			className={styles.calendar}
			onChange={setDate}
			value={date}
			onClickDay={(e) => {
				// console.log(`${new Date(e).toISOString()}`)
				let checkedDate = new Date(e)
				checkedDate.setUTCDate(checkedDate.getUTCDate() + 1)
				console.log(checkedDate.toISOString());
				getDate(checkedDate.toISOString())
				// getDay(`${new Date(e).getDay()}`)
			}}
			minDetail={'month'}
		/>
	);
}