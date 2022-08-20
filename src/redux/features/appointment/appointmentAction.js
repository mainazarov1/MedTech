import { createAsyncThunk } from "@reduxjs/toolkit"
import appointmentService from "../../../services/appointmentService"

export const getAppointmentsByIdAndDate = createAsyncThunk('getAppointmentsByIdAndDate/get',
	async (data, thunkAPI) => {
		try {
			const response = await appointmentService.getAppointmentsByIdAndDate(data)
			return response
		} catch (error) {
			const message = error.response.data.message
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const getAppointmentsByDate = createAsyncThunk('getAppointmentsByDate/get',
	async (date, thunkAPI) => {
		try {
			const response = await appointmentService.getAppointmentsByDate(date)
			return response
		} catch (error) {
			const message = error.response.data.message
			return thunkAPI.rejectWithValue(message)
		}
	}
)