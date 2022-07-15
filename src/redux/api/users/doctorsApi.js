import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const login = createAsyncThunk('auth/login', async (payload) => {
	const response = await api.post('/login', payload);
	console.log(response.data);
	return response.data;
});


// import https from "./../https-common";
// const getAll = () => {
//   return https.get("/doctor");
// };
// const get = id => {
//   return https.get(`/tutorials/${id}`);
// };
// const create = data => {
//   return https.post("/tutorials", data);
// };
// const update = (id, data) => {
//   return https.put(`/tutorials/${id}`, data);
// };
// const remove = id => {
//   return https.delete(`/tutorials/${id}`);
// };
// const removeAll = () => {
//   return https.delete(`/tutorials`);
// };
// const findByTitle = title => {
//   return https.get(`/tutorials?title=${title}`);
// };
// const TutorialService = {
//   getAll,
//   get,
//   create,
//   update,
//   remove,
//   removeAll,
//   findByTitle
// };
// export default TutorialService;