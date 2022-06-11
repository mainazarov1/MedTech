import React from "react";
import { CalendarCustom } from "./components/Calendar/CalendarCustom";
import Auth from "./pages/Auth/Auth";
import { DocWeb } from "./pages/DocWeb/DocWeb";

function App() {
	return (
		<div className="App">
			<>
				<Auth />
				<DocWeb />
				{/* <CalendarCustom /> */}
			</>

		</div>
	);
}

export default App;
