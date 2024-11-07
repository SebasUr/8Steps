import React from "react"
import { Form, Navbar } from "../components"

function LoginRegister() {
    return (
        <>
            <Navbar />
            <div className="body">
                <div className="container" id="container">
                    <Form route="/users/api/token/" method="login"/>
                    <Form route="/users/api/user/register/" method="register"/>
                    <div className="toggle-container">
                        <div className="toggle">
                            <div className="toggle-panel toggle-left">
                                <h1>Bienvenido!</h1>
                                <p>Si ya estás registrado inicia sesión</p>
                                <button className="hidden" id="login" onClick={() => {
                                    document.getElementById("container").classList.remove("active")
                                }}>Iniciar Sesión</button>
                            </div>
                            <div className="toggle-panel toggle-right">
                                <h1>¿Nuevo por aquí?</h1>
                                <p>Regístrate en 8Steps para descubrir tu trayectoria laboral</p>
                                <button className="hidden" id="register" onClick={() => {
                                    document.getElementById("container").classList.add("active")
                                }}>Registrarse</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginRegister
