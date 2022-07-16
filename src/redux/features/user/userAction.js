import { createAsyncThunk } from "@reduxjs/toolkit"
import authService from "../../api/authService"
import jwt_decode from 'jwt-decode'
import { toast, Slide } from "react-toastify";
export const login = createAsyncThunk('auth/login',
	async (user, thunkAPI) => {
		try {
			const token = await authService.login(user).then(res => res.access_token)
			const decoded = jwt_decode(token)
			console.log(decoded);
			return decoded
		} catch (error) {
			const message =
				error.response.status
				// 	(error.response &&
				// 		error.response.data &&
				// 		error.response.data.message) ||
				// error.message ||
				// error.toString()
			toast.error('Неверно введён Логин или Пароль', {
				className: 'toastify',
				progressClassName: 'toastify__progress_error',
				position: toast.POSITION.TOP_CENTER,
				transition: Slide,
			})
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const loginOneTimes = createAsyncThunk('auth/loginOneTimes',
	async (user, thunkAPI) => {
		try {
			const token = await authService.loginOneTimes(user).then(res => res.access_token)
			const decoded = jwt_decode(token)
			console.log(decoded);
			return decoded
		} catch (error) {
			const message =
				error.response.status
				// 	(error.response &&
				// 		error.response.data &&
				// 		error.response.data.message) ||
				// error.message ||
				// error.toString()
			// toast.error('Неверно введён Логин или Пароль', {
			// 	className: 'toastify',
			// 	progressClassName: 'toastify__progress_error',
			// 	position: toast.POSITION.TOP_CENTER,
			// 	transition: Slide,
			// })
			return thunkAPI.rejectWithValue(message)
		}
	}
)