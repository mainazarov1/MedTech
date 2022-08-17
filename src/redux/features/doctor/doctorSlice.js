import { createSlice } from "@reduxjs/toolkit";
import { getAllDoctor, getDoctorById, getDoctorBySurname } from "./doctorAction";
const initialState = {
	isLoading: null,
	doctor: null,
}
export const doctorSlice = createSlice({
	name: 'doctor',
	initialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllDoctor.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAllDoctor.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.doctor = payload;
			})
			.addCase(getAllDoctor.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.doctor = null;
			})
			.addCase(getDoctorById.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getDoctorById.fulfilled, (state, { payload }) => {
				state.isLoading = false;
			})
			.addCase(getDoctorById.rejected, (state, { payload }) => {
				state.isLoading = false;
			})
			.addCase(getDoctorBySurname.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getDoctorBySurname.fulfilled, (state, { payload }) => {
				state.isLoading = false;
			})
			.addCase(getDoctorBySurname.rejected, (state, { payload }) => {
				state.isLoading = false;
			})
			
	},
})
export default doctorSlice.reducer