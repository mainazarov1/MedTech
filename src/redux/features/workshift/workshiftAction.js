import { createAsyncThunk } from "@reduxjs/toolkit"
import workshiftService from "./../../../services/workshiftService"



export const getWorkShift = createAsyncThunk('workshift/get',
	async (data, thunkAPI) => {
		try {
			const response = await workshiftService.getWorkShift(data)
			return response
		} catch (error) {
			const message = error.response.data.message
			return thunkAPI.rejectWithValue(message)
		}
	}
)