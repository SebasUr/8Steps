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
        let occupation = "", search = ""
        if (selector.value === "soy") {
            occupation = inputFields[0].value
            search = inputFields[2].value
        } else {
            search = inputFields[1].value
        }
        navigate("/steps", { state: { occupation, search } })
    }

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

    return (
        <>
        {Array(24)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="circle"></div>
        ))}

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
                    Descubre la ruta a<br /><span>tu trabajo soñado</span>
                    <div className="link"><a href="#">.</a></div>
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
        </>
    )
}

export default Main
