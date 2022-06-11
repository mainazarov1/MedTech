import React, { useState } from 'react';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
export const CalendarCustom = () => {
  const [value, onChange] = useState(new Date());

  return (
    <div>
			<Calendar
				onChange={onChange}
				value={value}
				defaultView={"month"}
				onClickDay={() => alert('click')}
				
			/>
    </div>
  );
}