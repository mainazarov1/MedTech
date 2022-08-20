import { createAsyncThunk } from "@reduxjs/toolkit"
import doctorService from "../../../services/doctorService"

export const getAllDoctor = createAsyncThunk('getAllDoctor/get',
	async (data, thunkAPI) => {
		try {
			const response = await doctorService.getAllDoctor(data)
			return response
		} catch (error) {
			const message = error.response.data.message
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const getDoctorById = createAsyncThunk('getDoctorById/get',
	async (data, thunkAPI) => {
		try {
			const response = await doctorService.getDoctorById(data)
			return response
		} catch (error) {
			const message = error.response.data.message
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const getDoctorBySurname = createAsyncThunk('getDoctorBySurname/get',
	async (data, thunkAPI) => {
		try {
			const response = await doctorService.getDoctorBySurname(data)
			return response
		} catch (error) {
			const message = error.response.data.message
			return thunkAPI.rejectWithValue(message)
		}
	}
)
	