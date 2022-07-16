import { createSlice } from "@reduxjs/toolkit";
import { login, loginOneTimes } from "./userAction";
const initialState = {
	isLogged: null,
	isLoading: null,
	isSuccess: null,
	message: null,
	user: null,
}
export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		// reset: (state) => {
		// 	state.isLogged = null;
		// 	state.isLoading = null;
		// 	state.isSuccess = null;
		// 	state.message = null;
		// 	state.user = null;
		// },
	},
	extraReducers: (builder) => {
		builder
			// loginOneTimesPass
			.addCase(loginOneTimes.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(loginOneTimes.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.message = payload;
				state.user = payload;
				state.isSuccess = true;
			})
			.addCase(loginOneTimes.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.isLogged = true;
				state.isSuccess = false;
				state.message = payload;
				state.user = null;
			})
			/// login
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.message = payload;
				state.user = payload;
				state.isSuccess = true;
			})
			.addCase(login.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.isLogged = true;
				state.isSuccess = false;
				state.message = payload;
				state.user = null;
			})

	},
	// extraReducers: {
	// 	[login.pending]: (state, { payload }) => {
	// 		state.loading = true;
	// 		state.user = payload;
	// 	},
	// 	[login.fulfilled]: (state, { payload }) => {
	// 		state.loading = false;
	// 		state.user = payload;
	// 		console.log(payload);
	// 	},
	// 	[login.rejected]: (state, { payload }) => {
	// 		state.loading = false;
	// 		state.message = payload;
	// 	},
	// },
})
export const { signIn, signInOneTimes } = authSlice.actions;
export default authSlice.reducer