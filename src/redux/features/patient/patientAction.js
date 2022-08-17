import { createAsyncThunk } from "@reduxjs/toolkit"
import patientService from "../../../services/patientService"

export const getAllPatient = createAsyncThunk('getAllPatient/get',
	async (data, thunkAPI) => {
		try {
			const response = await patientService.getAllPatient(data)
			return response
		} catch (error) {
			const message = error.response.data.message
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const getAllPatientDoc = createAsyncThunk('getAllPatientDoc/get',
	async (data, thunkAPI) => {
		try {
			const response = await patientService.getAllPatientDoc(data)
			return response
		} catch (error) {
			const message = error.response.data.message
			return thunkAPI.rejectWithValue(message)
		}
	}
)
