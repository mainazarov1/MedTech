import { Container } from "@mui/system";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { CalendarCustom } from "./components/Calendar/CalendarCustom";
import { CheckList } from "./components/CheckList/CheckList";
import { Header } from "./components/Header/Header";
import { Navigation } from "./components/Navigation/Navigation";
import { Schedule } from "./components/Schedule/Schedule";
import { Users } from "./components/Users/Users";
import Auth from "./pages/Auth/Auth";
import { DocWeb } from "./pages/DocWeb/DocWeb";
import { Main } from "./pages/Main/Main";

function App() {
	return (
		<div className="App">
			<>
				{/* <Auth /> */}
				{/* <DocWeb /> */}
				{/* <CalendarCustom /> */}
				<Routes>
					<Route path="/" element={<DocWeb />} />
					<Route path='/auth' element={<Auth />} />
					<Route path='/*' element={<Main />} />
				</Routes>
			</>
		</div>
	);
}

export default App;
