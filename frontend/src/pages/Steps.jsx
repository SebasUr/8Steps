import { useNavigate } from "react-router-dom"
import React, { useEffect, useState, useRef } from "react"
import LocomotiveScroll from "locomotive-scroll"
import LoadingIndicator from "../components/LoadingIndicator"
import "../styles/Steps.css"
// import results from "../../../archive/resultado.json"

function Steps() {
    const [jobs, setJobs] = useState([])
    const scrollContainerRef = useRef(null)
    const navigate = useNavigate()
    
    // useEffect(() => {
    //     setJobs(results)
    // }, [])

    useEffect(() => {
        // Realiza la solicitud al backend para obtener los trabajos
        fetch("http://localhost:8000/steps/")
            .then((response) => response.json())
            .then((data) => setJobs(data))
            .catch((error) => console.error("Error fetching jobs:", error))
    }, [])
    
    useEffect(() => {
        if (scrollContainerRef.current) {
            const scroll = new LocomotiveScroll({
                el: scrollContainerRef.current,
                smooth: true,
                direction: "horizontal"
            })

            const blocks = document.querySelectorAll(".block[data-block-section]")
            scroll.on("scroll", () => {
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
                scroll.destroy()
            }
        }
    }, [jobs])

    if (!jobs.length) {
        return <LoadingIndicator />
    }

    return (
        <>
            <div className="blocks">
                <div className="navbar-steps">
                    <div className="navbar-steps-logo">
                        <img src="/logosvg.svg" alt="Logo" className="logo" onClick={() => navigate("/")} />
                    </div>
                    <ul className="navbar-steps-menu"></ul>
                </div>
                {jobs.map((job, index) => (
                    <div
                        key={index}
                        className="block init"
                        data-block-section={index + 1}
                        data-href={job.dataHref || "journal"}
                    >
                        <div className="block__title">{`Step${index + 1}`}</div>
                        <div className="block__number">{index + 1}</div>
                    </div>
                ))}
            </div>

            <main data-scroll-container ref={scrollContainerRef}>
    <div className="wrap" data-scroll-section>
        {jobs.map((job, index) => (
            <section
                key={index}
                className={`section ${index}`}
                data-block-section={index + 1}
                id="home"
            >
                <div className="main-section-container"> 
                    <div><b>{job.title}</b></div> <br></br>
                    
                    {job.duration && <p>Duración: {job.duration}</p>}
                    <div>{job.description}</div>
                    <div>Requisitos: {job.requirements}</div>

                   
                    
                    {job.jobs_list && (
                        <>
                        <div className="job-card-container">
                            <p>Trabajos recomendados</p>
                            {job.jobs_list.map((job, jobIndex) => (
                                <a 
                                    key={jobIndex} 
                                    href={job.link} 
                                    className="job-card"
                                >
                                    <div className="job-title">{job.title}</div>
                                    <div className="job-company">{job.company}</div>
                                    <div className="job-description">{job.snipet}</div>
                                    <div className="job-location">{job.location}</div>
                                </a>
                            ))}
                        </div>
                        </>
                    )}

                    

                    {job.courses_list && (
                        <>
                        <p>Cursos recomendados</p>
                        <div className="course-card-container">
                            {job.courses_list.map((course, courseIndex) => (
                                <a
                                    key={courseIndex}
                                    href={course.link}
                                    className="course-card"
                                >
                                    <div className="course-title">{course.title}</div>
                                    <div className="course-description">{course.description}</div>
                                    </a>
                            ))}
                        </div>
                        </>
                    )}

                </div>
            </section>
        ))}
    </div>
</main>

        </>
    )
}

export default Steps
