import React, { useState } from 'react';
import Calendar from 'react-calendar';
import styles from './Calendar.module.css';
import 'react-calendar/dist/Calendar.css';
export const CalendarCustom = () => {
	const [value, onChange] = useState(new Date());

	return (
		<Calendar
			className={styles.calendar}
			onChange={onChange}
			value={value}
			defaultView={"month"}
			onClickDay={(e) => {
				alert(new Date(e))
			}}
			// view={{}}
			// style={{
			// 	flexBasic: '100%'
			// }}
		/>
	);
}