import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/components/Navbar.css";

function Navbar() {
    const navigate = useNavigate();
    const { isAuthorized } = useContext(AuthContext);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1200);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Listener para actualizar el estado cuando cambia el tamaño de la ventana
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 1200);
        window.addEventListener("resize", handleResize);

        // Cleanup del event listener
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Cerrar el menú si se hace clic fuera de él
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.closest('.mobile-menu') || event.target.closest('.menu-toggle')) {
                return;
            }
            setIsMenuOpen(false); // Cierra el menú si el clic es fuera
        };

        // Añadir el event listener al clic fuera del menú
        document.addEventListener('click', handleClickOutside);

        // Limpiar el event listener cuando el componente se desmonte
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // Toggle de apertura/cierre del menú
    const toggleMenu = () => setIsMenuOpen(prevState => !prevState);

    return (
        <header className="navbar">
            {/* Logo a la izquierda */}
            <div className="site-logo" onClick={() => navigate("/")}>
                <img src="/logosvg.svg" alt="Icono" className="logo-icon" />
                <span className="bold-text">8STE</span><span className="normal-text">PS</span>
            </div>

            {/* Logo de Magneto a la derecha */}
            <a href="https://www.magneto365.com/es" className="site-link" target="_blank" rel="noopener noreferrer">
                <img src="/logo-magneto.svg" alt="Magneto Logo" className="magneto-logo" />
            </a>

            {/* Si estamos en una pantalla móvil, mostramos el botón para desplegar el menú */}
            {isMobile ? (
                <button className="menu-toggle" onClick={toggleMenu}>
                    {isMenuOpen ? "☰" : "☰"}
                </button>
            ) : (
                // Si no es móvil, mostramos el menú sin necesidad de botón
                <div className="site-menu">
                    {isAuthorized ? (
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
                    )}
                </div>
            )}

            {/* Menú desplegable para dispositivos móviles */}
            {isMobile && isMenuOpen && (
                <div className="mobile-menu">
                    {isAuthorized ? (
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
                    )}
                </div>
            )}
        </header>
    );
}

export default Navbar;
