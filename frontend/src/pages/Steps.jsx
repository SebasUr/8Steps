import { useNavigate } from "react-router-dom"
import React, { useEffect } from "react"
import LocomotiveScroll from "locomotive-scroll"
import "../styles/Steps.css"

function Steps() {
    const navigate = useNavigate()
    useEffect(() => {
        const scroll = new LocomotiveScroll({
            el: document.querySelector("[data-scroll-container]"),
            smooth: true,
            direction: "horizontal"
        })

        let blocks = document.querySelectorAll(".block[data-block-section]")        
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
    }, [])

    return (
        <>
            <div className="blocks">
                <div className="navbar-steps" >
                    <div className="navbar-steps-logo" >
                        <img src="/logosvg.svg" alt="Logo" className="logo" onClick={
                            () => {
                                // Does not work because of the html structure of the page
                                // navigate("/")
                            }
                        }/>
                    </div>
                    <ul className="navbar-steps-menu">
                    </ul>
                </div>
                <div className="block init" data-block-section="1" data-href="journal">
                    <div className="block__title">Step1</div>
                    <div className="block__number">01</div>
                </div>
                <div className="block init" data-block-section="2" data-href="collection">
                    <div className="block__title">Step2</div>
                    <div className="block__number">02</div>
                </div>
                <div className="block init" data-block-section="3" data-href="material">
                    <div className="block__title">Step3</div>
                    <div className="block__number">03</div>
                </div>
                <div className="block init" data-block-section="4" data-href="production">
                    <div className="block__title">Step4</div>
                    <div className="block__number">04</div>
                </div>
                <div className="block init" data-block-section="5" data-href="journal">
                    <div className="block__title">Step5</div>
                    <div className="block__number">05</div>
                </div>
                <div className="block init" data-block-section="6" data-href="journal">
                    <div className="block__title">Step6</div>
                    <div className="block__number">06</div>
                </div>
                <div className="block init" data-block-section="7" data-href="journal">
                    <div className="block__title">Step7</div>
                    <div className="block__number">07</div>
                </div>
                <div className="block init" data-block-section="8" data-href="journal">
                    <div className="block__title">Step8</div>
                    <div className="block__number">08</div>
                </div>
                <div className="block init" data-block-section="9" data-href="journal">
                    <div className="block__title">Resume</div>
                    <div className="block__number">R</div>
                </div>
            </div>

            <main data-scroll-container>
                <div className="wrap" data-scroll-section>
                    <section className="section 1" data-block-section="1" id="home">
                        <div className="Jobs">
                            <div className="JobsCard">
                                <h1 className="JobsCard-Title">Frontend Developer</h1>
                                <h2 className="JobsCard-Image">
                                    <i className="#"></i>
                                </h2>
                                <div className="JobsCard-JobDescription">
                                    Bacon ipsum dolor amet flank chicken cupim 
                                </div>
                                <div className="Button" onClick={
                                    () => {
                                        // We should change this in the future
                                        console.log("Read more");
                                    }
                                }>Read more</div>
                            </div>

                            <div className="JobsCard">
                                <h1 className="JobsCard-Title">Full Stack Developer</h1>
                                <h2 className="JobsCard-Image">
                                    <i className="#"></i>
                                </h2>
                                <div className="JobsCard-JobDescription">
                                    Bacon ipsum dolor amet flank chicken cupim 
                                </div>
                                <div className="Button" onClick={
                                    () => {
                                        // We should change this in the future
                                        console.log("Read more");
                                    }
                                }>Read more</div>
                            </div>

                            <div className="JobsCard">
                                <h1 className="JobsCard-Title">BackEnd Developer</h1>
                                <h2 className="JobsCard-Image">
                                    <i className="#"></i>
                                </h2>
                                <div className="JobsCard-JobDescription">
                                    Bacon ipsum dolor amet flank chicken cupim 
                                </div>
                                <div className="Button" onClick={
                                    () => {
                                        // We should change this in the future
                                        console.log("Read more");
                                    }
                                }>Read more</div>
                            </div>
                        </div>
                    </section>
                    <section className="section 2" data-block-section="2" id="collection">
                        
                        <div className="Jobs">
                            <div className="JobsCard">
                                <h1 className="JobsCard-Title">Frontend Developer</h1>
                                <h2 className="JobsCard-Image">
                                    <i className="#"></i>
                                </h2>
                                <div className="JobsCard-JobDescription">
                                    Bacon ipsum dolor amet flank chicken cupim 
                                </div>
                                <div className="Button" onClick={
                                    () => {
                                        // We should change this in the future
                                        console.log("Read more");
                                    }
                                }>Read more</div>
                            </div>

                            <div className="JobsCard">
                                <h1 className="JobsCard-Title">Full Stack Developer</h1>
                                <h2 className="JobsCard-Image">
                                    <i className="#"></i>
                                </h2>
                                <div className="JobsCard-JobDescription">
                                    Bacon ipsum dolor amet flank chicken cupim 
                                </div>
                                <div className="Button" onClick={
                                    () => {
                                        // We should change this in the future
                                        console.log("Read more");
                                    }
                                }>Read more</div>
                            </div>

                            <div className="JobsCard">
                                <h1 className="JobsCard-Title">BackEnd Developer</h1>
                                <h2 className="JobsCard-Image">
                                    <i className="#"></i>
                                </h2>
                                <div className="JobsCard-JobDescription">
                                    Bacon ipsum dolor amet flank chicken cupim 
                                </div>
                                <div className="Button" onClick={
                                    () => {
                                        // We should change this in the future
                                        console.log("Read more");
                                    }
                                }>Read more</div>
                            </div>
                        </div>
                    </section>
                    <section className="section 3" data-block-section="3" id="material">
                        Material Lorem Ipsum is <br />
                        simply dummy text of the <br />
                        printing and typesetting <br />industry.
                    </section>
                    <section className="section 4" data-block-section="4" id="production" >
                        Production Lorem Ipsum is <br />
                        simply dummy text of the <br />
                        printing and typesetting <br />industry.
                    </section>
                    <section className="section 5" data-block-section="5" id="journal">
                        Journal Lorem Ipsum is <br />
                        simply dummy text of the <br />
                        printing and typesetting <br />industry.
                    </section>
                    <section className="section 6" data-block-section="6" id="journal">
                        Journal Lorem Ipsum is <br />
                        simply dummy text of the <br />
                        printing and typesetting <br />industry.
                    </section>
                    <section className="section 7" data-block-section="7" id="journal">
                        Journal Lorem Ipsum is <br />
                        simply dummy text of the <br />
                        printing and typesetting <br />industry.
                    </section>
                    <section className="section 8" data-block-section="8" id="journal">
                        Journal Lorem Ipsum is <br />
                        simply dummy text of the <br />
                        printing and typesetting <br />industry.
                    </section>
                    <section className="section 9" data-block-section="9" id="journal">
                        XD <br />
                        simply dummy text of the <br />
                        printing and typesetting <br />industry.
                    </section>
                </div>
            </main>
        </>
    )
}

export default Steps
