import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import api from "../api"
import { AuthContext } from "../contexts/AuthContext"
import "../styles/components/Form.css"

function Form({route, method}) {
    const { setIsAuthorized } = useContext(AuthContext)
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
            if (method === "login") {
                const response = await api.post(route, { username, password })
                localStorage.setItem(ACCESS_TOKEN, response.data.access)
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh)
                setIsAuthorized(true)
                navigate("/")
            } else {
                const response = await api.post(route, { username, email, password })
                localStorage.setItem(ACCESS_TOKEN, response.data.access)
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh)
                navigate("/")
            }
        } catch (error) {
            let message = ""
            try {
                const errors = JSON.parse(error.response.request.response)
                for (let key in errors) {
                    message += `${key}: ${errors[key]}\n`
                }
            } catch{
                message = "Network Error"
            }
            alert(message)
        } finally {
            setLoading(false)
            setUserName("")
            setPassword("")
            setEmail("")
        }
    }

    return (
        <form onSubmit={handleSubmit} className={method === "login" ? "form-container sign-in" : "form-container sign-up"}>
            {
                method === "login" ? (
                    <>
                        <div>
                            <h1>{ method === "login" ? "Iniciar Sesión" : "Crear Cuenta" }</h1>
                            <span>{ method === "login" ? "Ingresa tu usuario y contraseña" : "Ingresa tus datos para registrarte" }</span>
                            <input 
                                className="form-input" 
                                type="text" 
                                value={username} 
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="Username" 
                            />
                            { method === "register" && 
                            <input 
                                className="form-input" 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            /> }
                            <input 
                                className="form-input" 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password" 
                            />
                            { loading &&  <p>Cargando...</p> }
                            <button className="form-button" type="submit">
                                { method === "login" ? "Inicia Sesión" : "Regístrate" }
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <h1>{ method === "login" ? "Iniciar Sesión" : "Crear Cuenta" }</h1>
                            <span>{ method === "login" ? "Ingresa tu usuario y contraseña" : "Ingresa tus datos para registrarte" }</span>
                            <input 
                                className="form-input" 
                                type="text" 
                                value={username} 
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="Username" 
                            />
                            { method === "register" && 
                            <input 
                                className="form-input" 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            /> }
                            <input 
                                className="form-input" 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password" 
                            />
                            { loading &&  <p>Cargando...</p> }
                            <button className="form-button" type="submit">
                                { method === "login" ? "Inicia Sesión" : "Regístrate" }
                            </button>
                        </div>
                    </>
                )
            }
        </form>
    )
}

export default Form