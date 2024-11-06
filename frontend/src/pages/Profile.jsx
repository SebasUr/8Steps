import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api"
import jsPDF from "jspdf"
import { AuthContext } from "../contexts/AuthContext"
import "../styles/Profile.css"

function Profile() {
    const { isAuthorized, auth } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState({})
    const [courses, setCourses] = useState([])
    const [certifications, setCertifications] = useState([])
    const [showCourseModal, setShowCourseModal] = useState(false)
    const [showCertificationModal, setShowCertificationModal] = useState(false)
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
    }, [])

    const generatePDF = (jobs) => {
        const doc = new jsPDF()
        jobs.forEach((item, index) => {
            doc.setFontSize(16)
            doc.text(`Título: ${item.title}`, 10, 10 + index * 40)
            doc.setFontSize(12)
            doc.text(`Duración: ${item.duration}`, 10, 20 + index * 40)
            doc.text(`Descripción: ${item.description}`, 10, 30 + index * 40)

            // Requerimientos
            if (item.requirements) {
                doc.text("Requerimientos:", 10, 40 + index * 40)
                item.requirements.forEach((req, i) => {
                    doc.text(`- ${req}`, 15, 50 + i * 10 + index * 40)
                })
            }

            // Trabajos recomendados
            if (item.jobs) {
                doc.text("Trabajos recomendados:", 10, 60 * 10 + index * 40)
                item.jobs.forEach((job, j) => {
                    doc.text(`- ${job}`, 15, 70 * 10 + j * 10 + index * 40)
                })
            }

            // Cursos recomendados
            if (item.courses) {
                doc.text("Cursos recomendados:", 10, 80 * 10 + index * 40)
                item.courses.forEach((course, k) => {
                    doc.text(`- ${course}`, 15, 90 * 10 + k * 10 + index * 40)
                })
            }
        })

        doc.save("filtered_data_report.pdf")
    }

    const handleCourseSubmit = async (e) => {
        e.preventDefault()
        const coursesName = document.getElementById("courses-name").value
        const coursesDescription = document.getElementById("courses-description").value
        if (coursesName && coursesDescription) {
            const newCourse = { title: coursesName, description: coursesDescription }
            setCourses((prevCourses) => [...prevCourses, newCourse])
            await api.patch("/users/api/user/profile/", {
                courses: { courses: [...courses, newCourse] },
            })
            alert("Curso añadido exitosamente")
            setShowCourseModal(false)
        }
    }

    const handleCertificationSubmit = async (e) => {
        e.preventDefault()
        const certificationName = document.getElementById("certification-name").value
        const certificationInstitution = document.getElementById("certification-institution").value
        if (certificationName && certificationInstitution) {
            const newCertification = { title: certificationName, institution: certificationInstitution }
            setCertifications((prevCertifications) => [...prevCertifications, newCertification])
            await api.patch("/users/api/user/profile/", {
                certifications: { certifications: [...certifications, newCertification] },
            })
            alert("Certificación añadida exitosamente")
            setShowCertificationModal(false)
        }
    }

    if (!isAuthorized) {
        alert("No estás autorizado para ver esta página")
        navigate("/login")
    }

    if (loading) {
        return <p>Cargando...</p>
    }

    return (
        <div className="body-profile">
            <div className="profile-card">
                {/* Columna izquierda con el encabezado de perfil y trayectorias */}
                <div className="left-column">
                    <div className="profile-header section-card">
                        <span className="username"><img src="/profile1.png" className="button-icon" style={{ width: '50px', height: '50px' }} />{userData.username}</span>
                        <span className="email">{userData.email}</span>
                    </div>
                    <div className="trajectory-list section-card">
                        <h3>Trayectorias Guardadas</h3>
                        {userData.last_trajectory && userData.last_trajectory.length > 0 ? (
                            userData.last_trajectory.map((trajectory, index) => (
                                <div key={index} className="item-card">
                                    <span>Ruta {index+1}</span>
                                    <button onClick={
                                        () => generatePDF(trajectory)
                                    }>Descargar</button>
                                </div>
                            ))
                        ) : (
                            <p>No tienes trayectorías guardadas</p>
                        )}
                    </div>
                </div>

                {/* Columna derecha con cursos y certificaciones */}
                <div className="right-column">
                    <div className="section-card">
                        <h3><img src="/course.png" className="button-icon" /> Cursos</h3>
                        <div className="item-list">
                            {courses.length > 0 ? (
                                courses.map((course, index) => (
                                    <div key={index} className="item-card">
                                        <h4>{course.title}</h4>
                                        <p>{course.description}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No tienes cursos registrados</p>
                            )}
                        </div>
                        <button onClick={() => setShowCourseModal(true)} className="add-button">
                            <img src="/add.png" className="button-icon" alt="add" />Añadir
                        </button>
                    </div>

                    <div className="section-card">
                        <h3><img src="/certificate.png" className="button-icon" />Certificaciones</h3>
                        <div className="item-list">
                            {certifications.length > 0 ? (
                                certifications.map((cert, index) => (
                                    <div key={index} className="item-card">
                                        <h4>{cert.title}</h4>
                                        <p>{cert.institution}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No tienes certificaciones registradas</p>
                            )}
                        </div>
                        <button onClick={() => setShowCertificationModal(true)} className="add-button">
                            <img src="/add.png" className="button-icon" alt="add" />Añadir
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Modal for adding a course */}
            {showCourseModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Añadir Curso</h3>
                        <form onSubmit={handleCourseSubmit}>
                            <label>Nombre del curso</label>
                            <input type="text" id="courses-name" required />
                            <label>Descripción breve</label>
                            <input type="text" id="courses-description" required />
                            <div className="button-container">
                                <button className="add-button" type="submit">Guardar</button>
                                {/* Cambio aquí para cerrar el modal de curso */}
                                <button className="add-button" type="button" onClick={() => setShowCourseModal(false)}>Cerrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


            {/* Modal for adding a certification */}
            {showCertificationModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Añadir Certificación</h3>
                        <form onSubmit={handleCertificationSubmit}>
                            <label>Nombre de la certificación</label>
                            <input type="text" id="certification-name" required />
                            <label>Institución certificadora</label>
                            <input type="text" id="certification-institution" required />
                            <div className="button-container">
                                <button className="add-button" type="submit">Guardar</button>
                                <button className="add-button" type="button" onClick={() => setShowCertificationModal(false)}>Cerrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Profile
