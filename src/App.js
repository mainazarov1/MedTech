// React Router
import { Route, Routes } from "react-router-dom";
// Components
import Auth from "./pages/Auth/Auth";
import { DocWeb } from "./pages/DocWeb/DocWeb";
import { Main } from "./pages/Main/Main";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/manual" element={<DocWeb />} />
				<Route path='/' element={<Auth />} />
				<Route path='/*' element={<Main />} />
			</Routes>
		</div>
	);
}

export default App;
