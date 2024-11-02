import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import { Main, Steps, Profile, LoginRegister } from "./pages"
import { AuthProvider } from "./contexts/AuthContext.jsx"
import { LoadingScreen, Navbar } from "./components"

function Logout() {
	localStorage.clear()
	return <Navigate to="/" />
}

function RegisterAndLogout() {
    localStorage.clear()
    return <LoginRegister />
}

function App() {
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		// Configura el tiempo de carga o la lógica de la animación aquí
		setTimeout(() => {
			setLoading(false)
		}, 2000) // Ajusta la duración según sea necesario
	}, [])

	return (
		<>
			<AuthProvider>
				{
					loading ? ( 
						<LoadingScreen /> // Muestra la pantalla de carga mientras `loading` sea verdadero
					) : (
						<>
							<Router>
								<Navbar />
								<Routes>
									<Route path="/" element={<Main />} />
									<Route path="/user/profile" element={<Profile />} />
									<Route path="/steps" element={<Steps />} />
									<Route path="/login-register" element={ <RegisterAndLogout /> } />
									<Route path="/logout" element={ <Logout />} />
								</Routes>
							</Router>
						</>
					)
				}
			</AuthProvider>
		</>
	)
}

export default App
