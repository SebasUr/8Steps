import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"
import "../styles/components/Navbar.css"

function Navbar() {
    const navigate = useNavigate()
    const { isAuthorized } = useContext(AuthContext)

    return (
        <header className="navbar">
            <div className="site-logo" onClick={() => navigate("/")}>
                <img src="/logosvg.svg" alt="Icono" className="logo-icon" />
                <span className="bold-text">8STE</span><span className="normal-text">PS</span>
            </div>

            <a href="https://www.magneto365.com/es" className="site-link" target="_blank" rel="noopener noreferrer">
                <img src="/logo-magneto.svg" alt="Magneto Logo" className="magneto-logo" />
            </a>

            <div className="site-menu">
                {
                    isAuthorized ? (
                        <div className="auth-buttons">
                            <button className="register-button" onClick={() => navigate("/user/profile")}>
                                <img src="/profile.png" className="button-icon" />
                                Mi Perfil
                            </button>
                            <button className="register-button" onClick={() => navigate("/logout")}>
                                <img src="/logout.png" className="button-icon" />
                                Cerrar sesión
                            </button>
                        </div>
                    ) : (
                        <button className="register-button" onClick={() => navigate("/login-register")}>
                            <img src="/login.png" className="button-icon" />
                            Registrarme
                        </button>
                    )
                }
            </div>
        </header>
    )
}

export default Navbar
