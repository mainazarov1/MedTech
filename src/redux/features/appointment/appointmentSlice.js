import { createSlice } from "@reduxjs/toolkit";
import { getAppointmentsByDate, getAppointmentsByIdAndDate } from "./appointmentAction";
const initialState = {
	isLoading: null,
	isSuccess: null,
	message: null,
	//TODO 
	appointment: (JSON.parse(localStorage.getItem('user')))?.appointment || null,
}
export const appointmentSlice = createSlice({
	name: 'appointment',
	initialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAppointmentsByIdAndDate.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAppointmentsByIdAndDate.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.message = 'success';
				state.appointment = payload;
				state.isSuccess = true;
			})
			.addCase(getAppointmentsByIdAndDate.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.appointment = [];
				state.isSuccess = false;
			})
			.addCase(getAppointmentsByDate.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAppointmentsByDate.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.message = 'success';
				state.appointment = payload;
				state.isSuccess = true;
			})
			.addCase(getAppointmentsByDate.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.appointment = [];
				state.isSuccess = false;
			})
	},
	
})
export default appointmentSlice.reducer