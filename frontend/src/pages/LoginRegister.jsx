import React from "react"
import Form from "../components/Form"

function LoginRegister() {
    return (
        <>
            <header className="navbar">
                <div className="site-logo">
                    <img src="/logosvg.svg" alt="Icono" className="logo-icon" />
                    <span className="bold-text">8STE</span><span className="normal-text">PS</span>
                </div>
    
                <a href="https://www.magneto365.com/es" className="site-link" target="_blank" rel="noopener noreferrer">
                    <img src="/logo-magneto.svg" alt="Magneto Logo" className="magneto-logo" />
                </a>
            </header>
            <br /><br /><br /><br /><br />
            <div className="body">
                <div className="container" id="container">
                    <Form route="/users/api/token/" method="login"/>
                    <Form route="/users/api/user/register/" method="register"/>
                    <div className="toggle-container">
                        <div className="toggle">
                            <div className="toggle-panel toggle-left">
                                <h1>Bienvenido!</h1>
                                <p>Si ya estás registrado inicia sesión para seguir aprendendiendo</p>
                                <button className="hidden" id="login" onClick={() => {
                                    document.getElementById("container").classList.remove("active")
                                }}>Iniciar Sesión</button>
                            </div>
                            <div className="toggle-panel toggle-right">
                                <h1>¿Nuevo por aquí?</h1>
                                <p>Regístrate en Lumiere para comenzar a aprender</p>
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
