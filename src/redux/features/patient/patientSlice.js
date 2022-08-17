import { createSlice } from "@reduxjs/toolkit";
import { getAllPatient, getAllPatientDoc } from "./patientAction";
const initialState = {
	isLoading: null,
	patient: null,
}
export const patientSlice = createSlice({
	name: 'patient',
	initialState,
	reducers: {
		setSwitch: (state, { payload }) => {
			const i = state.patient.findIndex((item) => item.id === payload);
			if (i !== -1) {
				state.patient[i].active = !state.patient[i].active;
			}
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllPatient.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAllPatient.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.patient = payload;
			})
			.addCase(getAllPatient.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.patient = null;
			})
			.addCase(getAllPatientDoc.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAllPatientDoc.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.patient = payload;
			})
			.addCase(getAllPatientDoc.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.patient = null;
			})
	},
})

export const {
	setSwitch
} = patientSlice.actions;

export default patientSlice.reducer;

