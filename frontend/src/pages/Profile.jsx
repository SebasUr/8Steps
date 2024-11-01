import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api"
import { AuthContext } from "../contexts/AuthContext"

function Profile() {
    const { isAuthorized, auth } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState({})
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
    })

    if (!isAuthorized) {
        alert("No estás autorizado para ver esta página")
        navigate("/login")
    }

    if (loading) {
        return <p>Cargando...</p>
    }

    return (
        <>
            <p>{ userData.username }</p>
            <p>{ userData.email }</p>
            <p>{ userData.last_trayectory }</p>
            <button className="register-button" onClick={
                () => {
                    navigate("/")
                }
            }>Volver</button>
        </>
    )
}

export default Profile