import React, { useEffect, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"
import api from "../api"
import "../styles/Main.css"

function Main() {
    const { isAuthorized, auth } = useContext(AuthContext)
    const navigate = useNavigate()
    const [searchType, setSearchType] = useState("soy")

    useEffect(() => {
        const coords = { x: 0, y: 0 };
        const circles = document.querySelectorAll(".circle");
        circles.forEach(function (circle, index) {
            circle.x = 0;
            circle.y = 0;
        });

        const handleMouseMove = (e) => {
            coords.x = e.clientX;
            coords.y = e.clientY;
        };
        window.addEventListener("mousemove", handleMouseMove);

        const animateCircles = () => {
            let x = coords.x;
            let y = coords.y;
            circles.forEach(function (circle, index) {
                circle.style.left = `${x - 12}px`;
                circle.style.top = `${y - 12}px`;

                circle.style.scale = (circles.length - index) / circles.length;

                circle.x = x;
                circle.y = y;

                const nextCircle = circles[index + 1] || circles[0];
                x += (nextCircle.x - x) * 0.3;
                y += (nextCircle.y - y) * 0.3;
            });
            requestAnimationFrame(animateCircles);
        };
        animateCircles();
    }, []);

    useEffect(() => {
        auth()
    }, [auth])

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

                search = `${inputFields[1].value} ${newTextCourses == "" ? "" : `; Tengo cursos de: ${newTextCourses}`}; ${newTextCertifications == "" ? "" : `; Tengo certificaciones de: ${newTextCertifications}`}`
            } else {
                search = inputFields[1].value
            }
        }
        
        navigate("/steps", { state: { occupation, search } })
    }

    return (
        <>
            {
                Array(24).fill(0).map((_, i) => (
                    <div key={i} className="circle"></div>
                ))
            }
        
            <div className="wrapper">
                <div className="top-box"></div>
        
                <div className="header">
                    <div className="header-left">
                        Descubre la ruta a<br /><span>tu trabajo soñado</span>
                        <div className="link"><a href="#">.</a></div>
                    </div>
                    <div className="header-right">
                        
                    </div>
                </div>
        
                <form onSubmit={handleSubmit} className="form-search-bar">
                    {/* <div className="search-bar">
                        <select id="optionSelector" onChange={() => { updateSearchBar() }}>
                            <option value="soy">Soy</option>
                            <option value="quiero">Quiero trabajar como</option>
                        </select>
                        <div id="searchFields" className="search-fields">
                            <input type="text" placeholder="Profesión o estudio actual" className="input-field" />
                            <input type="text" placeholder="Trabajo deseado" className="input-field" id="input-field-soy" />
                            <span id="andText"> y quiero trabajar como</span>
                            <input type="text" placeholder="Trabajo deseado, puedes añadir en donde!" className="input-field" />
                        </div>
                    </div> */}
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
        
                <video id="background-video" autoPlay muted loop>
                    <source src="/video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </>
    )
}

export default Main
