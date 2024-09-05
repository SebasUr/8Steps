import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Main, Steps } from "./pages"

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/steps" element={<Steps />} />
				</Routes>
			</Router>
		</>
	)
}

export default App