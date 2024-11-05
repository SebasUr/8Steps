import { useNavigate, useLocation } from "react-router-dom"
import React, { useEffect, useState, useRef } from "react"
import LocomotiveScroll from "locomotive-scroll"
import LoadingIndicator from "../components/LoadingIndicator"
import "../styles/Steps.css"

function Steps() {
    const location = useLocation()
    const { occupation, search } = location.state || {}
    const [jobs, setJobs] = useState([])
    const scrollContainerRef = useRef(null)
    const scrollInstance = useRef(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        console.log("occupation: ", occupation)
        console.log("search: ", search)
        
        setLoading(true)
        fetch("http://localhost:8000/steps/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ occupation, search })
            }
        )
            .then((response) => response.json())
            .then((data) => {
                setJobs(data)
                setLoading(false)
            })
            .catch((error) => {
                console.error("Error fetching jobs:", error)
                setLoading(false)
            })
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
    </div>
</main>
        </>
    )
}

export default Steps
