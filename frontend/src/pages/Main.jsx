import React, { useEffect, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"
import { Navbar } from "../components"
import api from "../api"
import "../styles/Main.css"

function Main() {
    const { isAuthorized, auth } = useContext(AuthContext)
    const navigate = useNavigate()
    const [searchType, setSearchType] = useState("soy")
    const [recommendedJobs, setRecommendedJobs] = useState([])

    useEffect(() => {
        auth()
    }, [auth])

    useEffect(() => {
        const coords = { x: 0, y: 0 }
        const circles = document.querySelectorAll(".circle")
        circles.forEach(function (circle, index) {
            circle.x = 0
            circle.y = 0
        })
        const handleMouseMove = (e) => {
            coords.x = e.clientX
            coords.y = e.clientY
        }
        window.addEventListener("mousemove", handleMouseMove)
        const animateCircles = () => {
            let x = coords.x
            let y = coords.y
            circles.forEach(function (circle, index) {
                circle.style.left = `${x - 12}px`
                circle.style.top = `${y - 12}px`
                circle.style.scale = (circles.length - index) / circles.length
                circle.x = x
                circle.y = y
                const nextCircle = circles[index + 1] || circles[0]
                x += (nextCircle.x - x) * 0.3
                y += (nextCircle.y - y) * 0.3
            })
            requestAnimationFrame(animateCircles)
        }
        animateCircles()
    }, [])

    useEffect(() => {
        const searchFields = document.getElementById("searchFields")
        const inputFields = searchFields.getElementsByClassName("input-field")
        if (searchType === "soy") {
            inputFields[0].style.display = "block"
            document.getElementById("andText").style.display = "block"
        } else {
            inputFields[0].style.display = "none"
            document.getElementById("andText").style.display = "none"
        }
    }, [searchType])

    useEffect(() => {
        const fetchRecommendations = () => {
            api.post("/recommendations/", {
                username: localStorage.getItem("username")
            })
            .then((res) => res.data)
            .then((data) => {
                setRecommendedJobs(data.recommendations);
            })
            .catch((err) => {
                console.error(err);
            });
        };
    
        if (isAuthorized) {
            fetchRecommendations();
        }
    }, [isAuthorized]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const selector = document.getElementById("optionSelector")
        const searchFields = document.getElementById("searchFields")
        const inputFields = searchFields.getElementsByClassName("input-field")
        let occupation = "", search = ""
        if (selector.value === "soy") {
            occupation = inputFields[0].value
            search = inputFields[1].value
        } else {
            if (isAuthorized) {
                let courses = []
                let certifications = []
                await api.get("/users/api/user/profile/")
                .then((res) => res.data)
                .then((data) => {
                    courses = data.courses.courses
                    certifications = data.certifications.certifications
                })
                .catch((err) => {
                    console.error(err)
                })
                const newTextCourses = courses.map((course) => course.title).join(", ")
                const newTextCertifications = certifications.map((certification) => certification.title).join(", ")
                search = `${inputFields[1].value} ${newTextCourses == "" ? "" : ` Tengo cursos de: ${newTextCourses}`} ${newTextCertifications == "" ? "" : ` Tengo certificaciones de: ${newTextCertifications}`}`
            } else {
                search = inputFields[1].value
            }
        }
        
        navigate("/steps", { state: { occupation, search } })
    }

    return (
        <>
            <Navbar />
            <div className="main-page">
                <div className="top-box"></div>
                <div className="wrapper">
                    {
                        Array(24).fill(0).map((_, i) => (
                            <div key={i} className="circle"></div>
                        ))
                    }
                    
                    <div className="header">
                        <div className="header-left">
                            Descubre la ruta a<br /><span>tu trabajo soñado</span>
                        </div>
                        <div className="header-rigth">
                            <a href="https://www.magneto365.com/es" className="site-link" target="_blank" rel="noopener noreferrer">

                            </a>
                            <img src="/main-image.png" alt="Magneto Logo" className="magneto-logo" />
                        </div>
                    </div>
            
                    <form onSubmit={handleSubmit} className="form-search-bar">
                        <div className="search-bar">
                            <select id="optionSelector" onChange={(e) => setSearchType(e.target.value)}>
                                <option value="soy">Soy</option>
                                <option value="busco">Quiero trabajar como</option>
                            </select>
                            <div id="searchFields" className="search-fields">
                                <input type="text" className="input-field" placeholder="Profesión o estudio actual" />
                                <span id="andText"> y quiero trabajar como</span>
                                <input type="text" className="input-field" placeholder="Trabajo deseado, puedes añadir en donde!" />
                            </div>
                        </div>
                        <button className="slide" type="submit">&nbsp;</button>
                    </form>
            
                    <div className="recommended-jobs-main">
                    {recommendedJobs.length > 0 ? (
                        <>
                        <h2>Rutas recomendadas</h2>
                        <div className="recommended-jobs-main-container">
                            {Array.isArray(recommendedJobs) &&
                            recommendedJobs.map((job, i) => (
                                <div key={i} className="recommended-main-job">
                                <div className="recommended-main-job-info">
                                    <h3>{job.RouteName}</h3>
                                    <p>{job.Description}</p>
                                    <button
                                    onClick={() => {
                                        navigate("/steps", { state: { occupation: "", search: job.RouteName } });
                                    }}
                                    >
                                    Ver trayectoria
                                    </button>
                                </div>
                                </div>
                            ))}
                        </div>
                        </>
                    ) : (
                        <>
                        <h2 style={{ filter: 'blur(20px)', display: 'block' }}>Rutas recomendadas</h2>
                        <div className="recommended-jobs-main-container" style={{ position: 'relative' }}>
                            
                            {/* Contenedor para el mensaje centrado */}
                            <div
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                zIndex: 1,
                                padding: '1px',
                                borderRadius: '5px',
                            }}
                            >
                            <p style={{ fontSize: '20px', textAlign: 'center', zIndex: '99', fontWeight: "300" }}>
                            <strong>
                                <a href="/login-register" style={{ color: 'rgb(104 227 150)', textDecoration: 'none' }}>Accede a tu cuenta</a> y/o 
                                <a href="/user/profile" style={{ color: 'rgb(104 227 150)', textDecoration: 'none' }}> llena tus datos </a>
                            </strong> 
                            para poder ver recomendaciones
                            </p>

                            </div>

                            {/* Contenido principal que se mantiene difuminado */}
                            <div className="recommended-main-job" style={{ filter: 'blur(20px)', display: 'block' }}>
                            <div className="recommended-main-job-info">
                                <h3>Ingeniero de Software Full-Stack</h3>
                                <p>Desarrollo web con Python y frameworks</p>
                                <button>Ver trayectoria</button>
                            </div>
                            </div>
                            <div className="recommended-main-job" style={{ filter: 'blur(20px)', display: 'block' }}>
                            <div className="recommended-main-job-info">
                                <h3>Desarrollador Python Senior</h3>
                                <p>Experiencia en desarrollo con Python</p>
                                <button>Ver trayectoria</button>
                            </div>
                            </div>
                            <div className="recommended-main-job" style={{ filter: 'blur(20px)', display: 'block' }}>
                            <div className="recommended-main-job-info">
                                <h3>Especialista en DevOps</h3>
                                <p>Automatización de procesos de desarrollo</p>
                                <button>Ver trayectoria</button>
                            </div>
                            </div>
                        </div>
                        </>
                    )}
                    </div>
                </div>
            </div>
            <a href="https://www.magneto365.com/es" target="_blank" rel="noopener noreferrer" className="fixed-button-magneto">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACzklEQVR4AWIY3GAUjIL/DIzs5xNUWS4mOrFcjHdmvx6nxtDQwARgtRyA5waiMJ4iuEuqQW3bGNe8TWore+1YxbgcdVTbtt2eartBbdv2SzOnubeZvzITv9nvN2+/93Y5j0OKkPLKPtJKjgbaKaFAXe5gq4LZF74yqBRv6FMEkz6F82/qyRv0BW/S6dzl4WXj4UW3dSuqhNXxckS9o0TUv2lnmLyH70sLhdSaWdLmTX0wCHyICzJPg37izaHD5BjpAEJP44Lsk/yAc6yTVaZ4QTs4WrDoH0QQPaUzA5zBf+GCjDNKFnEcAlHADnYWTD3L4uKFwTAYS8j7hCkZma5u9RYEi97FxfBTPtTdW8gb4LNvFymT0Bfs4MDsiIvnB2VTFIEIk0lJAFPfzBIDQz4TreBCuM+HLD12vvlO9GEPHlbB9WQFuH82PN9ke0G9lgJAb6PiFj3CnetdJGWqFCjDmP9wDxbANX9YK52IP9eEl8PqKkbsH26HVsgtPUt/jwD8Ee1BVTPcatJy8sHuqPOd5pMRH+ogQybeYPHS7kBlFwCre4M+ZpWrHNXuYwNyy1pJWDz8O4QDayVcAEN/mwmg32UBKFHtNgowEW+7kIFoXgPcyA4AOD6ExSf8wpv6q+wAQB1fzR6Auhf1wE5SPu6Bl5km1O97AJhsADR+FwoQUit5ANCHHia8hAJsrC3gJiTbsHhxv1Y13oieIhl4ygZQz6MAB5lVsBmLF+JLNIih677HFJzBM9BKYQBsQJvRAbWOCwAtFumCr1B1d8CTKECkXRGGCdeiZbifNHABDPowAwBKkw1AjqIAuwPFGBlbiZZhjDSOm/AgYsI9HlOwFFmELG4il5/RN8Yhi9FTZyvnRlweLPOXaQv+Cm0smEPqQw+o6bmZhEXGH1Wb+UOBJk4alb2da7sGZG9u/ftJY2g8Tf/HR//NXwtaEQ08GAWjAAAs5bldNnXYvgAAAABJRU5ErkJggg==" alt="Logo" className="fixed-button-logo-magneto" />
            </a>
        </>
    )
    
}

export default Main
