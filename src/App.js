// React, Redux, Router
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
// Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Components
import { Progress } from "./components/Progress/Progress";
import Auth from "./pages/Auth/Auth";
import Main from "./pages/Main/Main";
import DocWeb from "./pages/DocWeb/DocWeb";

function App() {
	const { isLoading, isLogged } = useSelector((state) => state.auth)
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLogged) navigate('/');
	}, [isLogged, navigate]);
	return (
		<div className="App">
			{isLoading ?
				<Progress />
				: null}
			<ToastContainer
				style={{
					width: 'fit-content',
				}}
				autoClose={2000}
			/>
			<Routes>
				<Route path='/' element={<Auth />} />
				{isLogged &&
					<>
						<Route path="/manual" element={<DocWeb />} />
						<Route path='/*' element={<Main />} />
					</>}
			</Routes>
		</div>
	);
}

export default App;
