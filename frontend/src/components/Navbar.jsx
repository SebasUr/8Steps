import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"

function Navbar() {
    const navigate = useNavigate()
    const { isAuthorized } = useContext(AuthContext)

    return (
        <header className="navbar">
            <div className="site-logo">
                <img src="/logosvg.svg" alt="Icono" className="logo-icon" />
                <span className="bold-text">8STE</span><span className="normal-text">PS</span>
            </div>

            <a href="https://www.magneto365.com/es" className="site-link" target="_blank" rel="noopener noreferrer">
                <img src="/logo-magneto.svg" alt="Magneto Logo" className="magneto-logo" />
            </a>
            {
                isAuthorized ? (
                    <>
                        <button className="register-button" onClick={
                            () => {
                                navigate("/logout")
                            }
                        }>Bienvenido/Salir</button>
                        <button className="register-button" onClick={
                            () => {
                                navigate("/user/profile")
                            }
                        }>Mi Perfil</button>
                    </>
                    
                ) : (
                    <button className="register-button" onClick={
                        () => {
                            navigate("/login-register")
                        }
                    }>Registrarme</button>
                )
            }
        </header>
    )
}

export default Navbar