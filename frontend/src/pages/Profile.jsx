import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api"
import { AuthContext } from "../contexts/AuthContext"

function Profile() {
    const { isAuthorized, auth } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState({})
    const [job, setJob] = useState("")
    const [company, setCompany] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        auth()
    }, [auth])

    useEffect(() => {
        api.get("/users/api/user/profile/")
        .then((res) => res.data)
        .then((data) => {
            setUserData(data)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        await api.patch("/users/api/user/profile/", {
            job: job || userData.job,
            company: company || userData.company
        })
        .then(() => {
            alert("Datos actualizados correctamente")
        })
        .catch(() => {
            alert("Error al actualizar datos")
        })
        .finally(() => {
            navigate("/")
        })
    }

    if (!isAuthorized) {
        alert("No estás autorizado para ver esta página")
        navigate("/login")
    }

    if (loading) {
        return <p>Cargando...</p>
    }

    return (
        <>
            <br /><br /><br /><br /><br /><br /><br />
            <p>Username: { userData.username }</p>
            <p>Email: { userData.email }</p>
            <p>Última trayectoria: { userData.last_trayectory || "No tienes trayectorías guardadas" }</p>
            <p>Posición: { userData.job || "No tienes una ocupación/trabajo registrado" }</p>
            <p>Compañia: { userData.company || "No tienes el nombre de una organización/compañía registrado"  }</p>
            <h2>Actualiza tus datos laborales y experiencia:</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={job}
                    onChange={(e) => setJob(e.target.value)}
                    placeholder="Trabajo actual"
                /><br />
                <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Empresa"
                /><br />
                <button
                    className="register-button"
                    type="submit"
                >Actualizar</button>
            </form>
        </>
    )
}

export default Profile