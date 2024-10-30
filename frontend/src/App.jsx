import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Main, Steps } from "./pages";
import LoadingScreen from "./components/LoadingScreen.jsx"; // Importa la pantalla de carga

function App() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Configura el tiempo de carga o la lógica de la animación aquí
		setTimeout(() => {
			setLoading(false);
		}, 2000); // Ajusta la duración según sea necesario
	}, []);

	return (
		<>
			{loading ? ( 
				<LoadingScreen /> // Muestra la pantalla de carga mientras `loading` sea verdadero
			) : (
				<Router>
					<Routes>
						<Route path="/" element={<Main />} />
						<Route path="/steps" element={<Steps />} />
					</Routes>
				</Router>
			)}
		</>
	);
}

export default App;
