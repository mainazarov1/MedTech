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
		setSwitch: (state, { payload }) => {
			const i = state.doctor.findIndex((item) => item.id === payload);
			if (i !== -1) {
				state.doctor[i].active = !state.doctor[i].active;
			}
		}
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
export const {
	setSwitch
} = doctorSlice.actions;
export default doctorSlice.reducer