import { createSlice } from "@reduxjs/toolkit";
import { getWorkShift } from "./workshiftAction";
const initialState = {
	isLoading: null,
	isSuccess: null,
	message: null,
	workshift: (JSON.parse(localStorage.getItem('user')))?.workshift || null,
}
export const workshiftSlice = createSlice({
	name: 'workshift',
	initialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder
			.addCase(getWorkShift.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getWorkShift.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.message = 'success';
				state.workshift = payload;
				state.isSuccess = true;
			})
			.addCase(getWorkShift.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.workshift = [];
				state.isSuccess = false;
			})
	},
})
export default workshiftSlice.reducer