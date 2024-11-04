import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api"
import { AuthContext } from "../contexts/AuthContext"

function Profile() {
    const { isAuthorized, auth } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState({})
    const [courses, setCourses] = useState([])
    const [certifications, setCertifications] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        auth()
    }, [auth])

    useEffect(() => {
        api.get("/users/api/user/profile/")
        .then((res) => res.data)
        .then((data) => {
            setUserData(data)
            setCourses(data.courses.courses)
            setCertifications(data.certifications.certifications)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [userData])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const coursesName = document.getElementById("courses-name").value
        const coursesDescription = document.getElementById("courses-description").value
        const certificationName = document.getElementById("certification-name").value
        const certificationInstitution = document.getElementById("certification-institution").value

        const newCourse = coursesName && coursesDescription ? { title: coursesName, description: coursesDescription } : null
        const newCertification = certificationName && certificationInstitution ? { title: certificationName, institution: certificationInstitution } : null

        if (newCourse) {
            setCourses((prevCourses) => [...prevCourses, newCourse])
        }
        if (newCertification) {
            setCertifications((prevCertifications) => [...prevCertifications, newCertification])
        }

        const data = {
            courses: {
                courses: newCourse ? [...courses, newCourse] : [...courses]
            },
            certifications: {
                certifications: newCertification ? [...certifications, newCertification] : [...certifications]
            }
        }

        await api.patch("/users/api/user/profile/", data)
            .then(() => {
                alert("Datos actualizados")
            })
            .catch((err) => {
                alert("Ocurrió un error")
                console.error(err)
            })
            .finally(() => {
                // Limpiar los campos del formulario
                document.getElementById("courses-name").value = ""
                document.getElementById("courses-description").value = ""
                document.getElementById("certification-name").value = ""
                document.getElementById("certification-institution").value = ""
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
            <p><strong>Cursos:</strong></p>
            {
                courses.length > 0 ? (
                    courses.map((course, index) => (
                        <li key={index}>- { course.title } - { course.description }</li>
                    ))
                ) : (
                    <p><strong>No tienes cursos registrados</strong></p>
                )
            }
            <br />
            <p><strong>Certificaciones:</strong></p>
            {
                certifications.length > 0 ? (
                    certifications.map((certification, index) => (
                        <li key={index}>- { certification.title } - { certification.institution }</li>
                    ))
                ) : (
                    <p><strong>No tienes certificaciones registradas</strong></p>
                )
            }
            <br />
            <h2>Actualiza tus datos (cursos y certificaciones):</h2>
            <form onSubmit={handleSubmit}>
                <br />
                <h3>Sobre cursos:</h3>
                <label htmlFor="">Nombre del curso</label>
                <input type="text" id="courses-name"/>
                <br />
                <label htmlFor="">Descripción breve del curso:</label>
                <input type="text" id="courses-description" />
                <br /><br />
                <h3>Sobre certificaciones:</h3>
                <label htmlFor="">Nombre de la certificación:</label>
                <input type="text" id="certification-name" />
                <br />
                <label htmlFor="">Institución encargada de la certificación:</label>
                <input type="text" id="certification-institution" />
                <button type="submit">Actualizar</button>
            </form>
        </>
    )
}

export default Profile