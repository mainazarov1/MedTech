import { createAsyncThunk } from "@reduxjs/toolkit"
import authService from "./../../../services/authService"
import jwt_decode from 'jwt-decode'
import { toast, Slide } from "react-toastify";
export const login = createAsyncThunk('auth/login',
	async (user, thunkAPI) => {
		try {
			let token = await authService.login(user).then(res => res.access_token);
			const decoded = jwt_decode(token)
			return decoded
		} catch (error) {
			const message = error.response.data.message
			toast.error('Неверно введены почта или пароль', {
				toastId: 'not dublicate',
				className: 'toastify',
				progressClassName: 'toastify__progress_error',
				position: toast.POSITION.TOP_CENTER,
				transition: Slide,
			})
			return thunkAPI.rejectWithValue(message)
		}
	}
)

export const forgotPass = createAsyncThunk('auth/forgotPass',
	async (user, thunkAPI) => {
		try {
			let response = await authService.forgotPass(user);
			return response
		} catch (error) {
			const message =
				error.response.status
			toast.error('Неверно введена почта', {
				className: 'toastify',
				progressClassName: 'toastify__progress_error',
				position: toast.POSITION.TOP_CENTER,
				transition: Slide,
			})
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const changePass = createAsyncThunk('auth/changePass',
	async (user, thunkAPI) => {
		try {
			const response = await authService.changePass(user.id, user.password, user.path)
			toast.success('Введите Вашу почту и новый пароль', {
				className: 'toastify',
				progressClassName: 'toastify__progress_success',
				position: toast.POSITION.TOP_CENTER,
				transition: Slide,
			})
			return response
		} catch (error) {
			const message =
				error.response.status
			return thunkAPI.rejectWithValue(message)
		}
	}
)