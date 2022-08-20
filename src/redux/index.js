import { configureStore } from '@reduxjs/toolkit'
import appointmentSlice from './features/appointment/appointmentSlice'
import doctorSlice from './features/doctor/doctorSlice'
import patientSlice from './features/patient/patientSlice'
import authSlice from './features/user/userSlice'
import workshiftSlice from './features/workshift/workshiftSlice'
export const store = configureStore({
	reducer: {
		auth: authSlice,
		workshift: workshiftSlice,
		appointment: appointmentSlice,
		doctor: doctorSlice,
		patient: patientSlice,
	},
})