import React, { useState } from 'react';
import Calendar from 'react-calendar';
import style from './Calendar.module.css';
// import 'react-calendar/dist/Calendar.css';
export const CalendarCustom = () => {
	const [value, onChange] = useState(new Date());

	return (
		<Calendar
			className={style.calendar}
			onChange={onChange}
			value={value}
			defaultView={"month"}
			onClickDay={() => alert('click')}
			view={{}}
			// style={{
			// 	flexBasic: '100%'
			// }}
		/>
	);
}