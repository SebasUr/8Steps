import { useNavigate } from "react-router-dom"
import React, { useEffect, useState, useRef } from "react"
import LocomotiveScroll from "locomotive-scroll"
import LoadingIndicator from "../components/LoadingIndicator"
import "../styles/Steps.css"
import results from "../../../archive/resultado.json"

function Steps() {
    const [jobs, setJobs] = useState([])
    const scrollContainerRef = useRef(null)
    const navigate = useNavigate()
    
    useEffect(() => {
        setJobs(results)
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
                            {job.title} - {job.description}
                            {job.about_work && <p>ES DE TRABAJO</p>}
                        </section>
                    ))}
                </div>
            </main>
        </>
    )
}

export default Steps
