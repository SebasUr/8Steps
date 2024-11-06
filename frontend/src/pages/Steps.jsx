import React, { useEffect, useState, useRef, useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import LocomotiveScroll from "locomotive-scroll"
import LoadingIndicator from "../components/LoadingIndicator"
import { AuthContext } from "../contexts/AuthContext"
import api from "../api"
import "../styles/Steps.css"

function Steps() {
    const { isAuthorized, auth } = useContext(AuthContext)
    const location = useLocation()
    const { occupation, search } = location.state || {}
    const [jobs, setJobs] = useState([])
    const [trajectories, setTrajectories] = useState([])
    const scrollContainerRef = useRef(null)
    const scrollInstance = useRef(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        auth()
    }, [auth])

    useEffect(() => {
        console.log("occupation: ", occupation)
        console.log("search: ", search)
        setLoading(true)
        api.post("/steps/", { occupation, search })
            .then((response) => response.data)
            .then((data) => {
                setJobs(data)
                setLoading(false)
            })
            .catch((error) => {
                console.error("Error fetching jobs:", error)
                setLoading(false)
            })

        if (isAuthorized) {
            api.get("/users/api/user/profile/")
                .then((response) => response.data)
                .then((data) => {
                    setTrajectories(data.last_trajectory)
                })
                .catch((error) => {
                    console.error("Error fetching trayectories:", error)
                }
            )
        }
    }, [])

    useEffect(() => {
        if (scrollContainerRef.current && jobs.length) {
            scrollInstance.current = new LocomotiveScroll({
                el: scrollContainerRef.current,
                smooth: true,
                direction: "horizontal"
            })

            const blocks = document.querySelectorAll(".block[data-block-section]")
            scrollInstance.current.on("scroll", () => {
                blocks.forEach((block) => {
                    const attr = block.getAttribute("data-block-section")
                    const section = document.querySelector(`section[data-block-section="${attr}"]`)
                    
                    if (section.getBoundingClientRect().left <= block.offsetWidth * 2) {
                        block.classList.add("fixed")
                        block.classList.remove("init", "active")
                        block.style.left = ""
                    } else if (section.getBoundingClientRect().left >= window.innerWidth - block.offsetWidth * 2) {
                        block.classList.add("init")
                        block.classList.remove("active", "fixed")
                        block.style.left = ""
                    } else {
                        block.classList.add("active")
                        block.classList.remove("init", "fixed")
                    }

                    if (block.classList.contains("active")) {
                        block.style.left = `${section.getBoundingClientRect().left}px`
                    }
                })
            })

            return () => {
                if (scrollInstance.current) scrollInstance.current.destroy()
            }
        }
    }, [jobs])

    const saveToProfile = async () => {
        if (!isAuthorized) {
            alert("Debes iniciar sesión para guardar en tu perfil")
            navigate("/")
            return
        }
        const newTrajectory = trajectories === null ? [jobs] : [...trajectories, jobs]
        await api.patch("/users/api/user/profile/", { last_trajectory: newTrajectory })
            .then((response) => response.data)
            .then((data) => {
                navigate("/user/profile")
            })
            .catch((error) => {
                console.error("Error saving to profile:", error)
            })
    }

    if (loading) return <LoadingIndicator />

    return (
        <>
            <div className="blocks">
                <div className="navbar-steps">
                    <div className="navbar-steps-logo">
                        <img src="/logosvg.svg" alt="Logo" className="logo" onClick={() => navigate("/")} />
                    </div>
                    <ul className="navbar-steps-menu"></ul>
                </div>
                {
                    jobs.length > 0 ? jobs.map((job, index) => (
                        <div
                            key={index}
                            className="block init"
                            data-block-section={index + 1}
                            data-href={job.dataHref || "journal"}
                        >
                            <div className="block__title">{`Step${index + 1}`}</div>
                            <div className="block__number">{index + 1}</div>
                        </div>
                    )) : null
                }
            </div>

            <main data-scroll-container ref={scrollContainerRef}>
                <div className="wrap" data-scroll-section>
                    {
                        jobs.length > 0 ? jobs.map((job, index) => (
                            <section
                                key={index}
                                className={`section ${index}`}
                                data-block-section={index + 1}
                                id="home">
                                <div className="main-section-container"> 
                                    <div className="main-job-title"><b>{job.title}</b></div> <br></br>
                                    
                                    {job.duration && <p>Duración: {job.duration}</p>} <br></br>
                                    <div>{job.description}</div> <br></br>
                                    {job.requirements && (
                                        <div>
                                            <p><b>Requisitos:</b></p>
                                            <ul>
                                                {
                                                    job.requirements.map((requirement, requirementIndex) => (
                                                        <p key={requirementIndex}>• {requirement}</p>
                                                        
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    )} <br></br>
                                    {
                                        index === jobs.length - 1 ? (
                                            <button onClick={saveToProfile} className="register-button">
                                                Guardar en mi perfil 
                                            </button>
                                        ) : null
                                    }
                                    {
                                        job.jobs_list && (
                                            <>
                                            <p><b>Trabajos recomendados</b></p>
                                            <div className="job-card-container">
                                                {job.jobs_list.map((job, jobIndex) => (
                                                    <a 
                                                        key={jobIndex} 
                                                        href={job.redirect_url}  // Para adzuna
                                                        // href={job.link} Para Jooble
                                                        className="job-card"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <div className="job-title">{job.title}</div>
                                                        {/* <div className="job-company">{job.company}</div>
                                                        <div className="job-description">{job.snipet}</div>
                                                        <div className="job-location">{job.location}</div> Para Jooble*/}
                                                    </a>
                                                ))}
                                            </div>
                                            </>
                                        )
                                    }
                
                                    {
                                        job.courses_list && (
                                            <>
                                            <p><b>Cursos recomendados</b></p>
                                            <div className="course-card-container">
                                                {job.courses_list.map((course, courseIndex) => (
                                                    <a
                                                        key={courseIndex}
                                                        href={course.link}
                                                        className="course-card"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <div className="course-title">{course.title}</div>
                                                        <div className="course-description">{course.description}</div>
                                                        </a>
                                                ))}
                                            </div>
                                            </>
                                        )
                                    }
                                </div>
                            </section>
                        )) : null
                    }
                    <section
                        className="section resumen"
                        data-block-section={jobs.length + 1}
                        id="summary"
                    >
                        <div className="main-section-container">
                            <h2>Resumen de Trabajos</h2>
                            <ul>
                                {jobs.map((job, index) => (
                                    <li key={index}>
                                        <h3>{job.title}</h3>
                                        <p>{job.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}

export default Steps