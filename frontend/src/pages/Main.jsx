import React, { useEffect } from "react"
import "../styles/Main.css"
import { useNavigate } from "react-router-dom"

function Main() {
    const navigate = useNavigate()

    const updateSearchBar = () => {
        const selector = document.getElementById("optionSelector")
        const andText = document.getElementById("andText")
        const searchFields = document.getElementById("searchFields")
        const inputFields = searchFields.getElementsByClassName("input-field")
        
        if (selector.value === "soy") {
            inputFields[0].style.display = "block"
            inputFields[1].style.display = "none"
            andText.style.display = "inline"
            inputFields[2].style.display = "block"
        } else {
            inputFields[0].style.display = "none"
            inputFields[1].style.display = "block"
            andText.style.display = "none"
            inputFields[2].style.display = "none"
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const selector = document.getElementById("optionSelector")
        const searchFields = document.getElementById("searchFields")
        const inputFields = searchFields.getElementsByClassName("input-field")
        let ocupation = "", search = ""
        if (selector.value === "soy") {
            ocupation = inputFields[0].value
            search = inputFields[2].value
        } else {
            search = inputFields[1].value
        }
        navigate("/steps", { state: { ocupation, search } })
    }

    return (
        <div className="wrapper">
            <div className="site-logo">
                <img src="/logosvg.svg" alt="Icono" className="logo-icon" />
                <span className="bold-text">8STE</span><span className="normal-text">PS</span>
            </div>

            <div className="navbar">
                <a href="https://www.magneto365.com/es" className="site-link" target="_blank" rel="noopener noreferrer">
                    magneto
                </a>
                <div className="site-menu">
                    <div className="menu-item">about</div>
                    <div className="menu-item">contact</div>
                </div>
            </div>

            <div className="header">
                <div className="header-left">
                    Descubre la ruta a<br /><span>tu trabajo ideal</span>
                    <div className="link"><a href="#">view showreel</a></div>
                </div>
                <div className="header-right">
                    /dev
                    <div className="hover-text">
                        Tazana2<br />
                        DavidLondo<br />
                        SebasUr
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="form-search-bar">
                <div className="search-bar">
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
                </div>
                <button className="slide" type="submit">&nbsp;</button>
            </form>

            <video id="background-video" autoPlay muted loop>
                <source src="/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    )
}

export default Main
