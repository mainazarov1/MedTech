import { createSlice } from "@reduxjs/toolkit";
import { changePass, forgotPass, login } from "./userAction";
const initialState = {
	isLogged: localStorage.user ? true : null,
	isLoading: null,
	isSuccess: null,
	message: null,
	user: (JSON.parse(localStorage.getItem('user')))?.user || null,
}
export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: (state) => {
			state.isLogged = null;
			state.isLoading = null;
			state.isSuccess = null;
			state.message = null;
			state.user = null;
		},
	},
	extraReducers: (builder) => {
		builder
			/// login
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.isLogged = true;
				state.message = null;
				state.user = payload.user;
				state.isSuccess = true;
			})
			.addCase(login.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.isLogged = false;
				state.isSuccess = false;
				state.message = payload;
				state.user = null;
			})
			/// forgotPass
			.addCase(forgotPass.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(forgotPass.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.isLogged = false;
				state.isSuccess = payload.success;
				state.message = payload.message;
				state.user = null;
			})
			.addCase(forgotPass.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.isLogged = false;
				state.isSuccess = false;
				state.message = payload;
				state.user = null;
			})
			/// changePass
			.addCase(changePass.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(changePass.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.isLogged = false;
				state.isSuccess = true;
				state.message = payload.message;
				state.user = null;
			})
			.addCase(changePass.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.isLogged = false;
				state.isSuccess = false;
				state.message = payload;
				state.user = null;
			})
	},
})
export const { reset } = authSlice.actions;
export default authSlice.reducer