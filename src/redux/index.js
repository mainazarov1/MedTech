import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/user/userSlice'
export const store = configureStore({
	reducer: {
		auth: authSlice,
	},
})