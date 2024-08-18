/* Mouse circles -------------------------------------------------------------------------*/

const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");
const colors = ["#FFFFFF"];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function(e){
  coords.x = e.clientX;
  coords.y = e.clientY;
});

function animateCircles() {
  let x = coords.x;
  let y = coords.y;
  
  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";
    
    circle.style.scale = (circles.length - index) / circles.length;
    
    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });
 
  requestAnimationFrame(animateCircles);
}

animateCircles();

/* Loadpage -------------------------------------------------------------------------*/

window.addEventListener('load', function () {
    const loadingScreen = document.getElementById('loading-screen');
    const logo = document.querySelector('.loading-logo');
    
    /* Logo animation */ 
    gsap.fromTo(logo, 
        { scale: 1, opacity: 1 }, 
        { 
            scale: 0.5, 
            opacity: 0,
            duration: 1.5,
            ease: 'power2.inOut',
            onComplete: () => {
                // Ocultar la pantalla de carga después de la animación
                gsap.to(loadingScreen, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                        loadingScreen.style.display = 'none';
                    }
                });
            }
        }
    );
});

const allcontainer = gsap.utils.toArray(".container-item");
const venueImageWrap = document.querySelector(".container-img-wrap");
const venueImage = document.querySelector(".container-img");

function initcontainer() {
    allcontainer.forEach((link) => {
        link.addEventListener("mouseenter", venueHover);
        link.addEventListener("mouseleave", venueHover);
        link.addEventListener("mousemove", moveVenueImage);
    });
}

function moveVenueImage(e) {
    // Obtener el ancho y alto de la ventana
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    // Calcular la posición central de la pantalla
    let centerX = windowWidth / 2.65;
    let centerY = windowHeight / 1.2;

    const tl = gsap.timeline();
    tl.to(venueImageWrap, {
        x: centerX,
        y: centerY,
    });
}

function init() {
    initcontainer();
}

window.addEventListener("load", function () {
    init();
});


/*Intro animations  ---------------------------------------------------- */ 
tl = new TimelineMax();

tl.from(".navbar > div", 1.6, {
    opacity: 0,
    y: 60,
    ease: Expo.easeInOut,
    delay: 0.6,
});

tl.from(
    ".site-logo",
    1.6,
    {
        opacity: 0,
        y: 40,
        ease: Expo.easeInOut,
    },
    "-=1.6"
);

tl.staggerFrom(
    ".site-menu > div",
    1,
    {
        opacity: 0,
        y: 60,
        ease: Power2.easeOut,
    },
    0.2
);

tl.staggerFrom(
    ".header > div",
    1,
    {
        opacity: 0,
        y: 60,
        ease: Power2.easeOut,
        delay: -1.4,
    },
    0.2
);

gsap.from(
".separator, #background-video, .video-section, .search-bar",
2,
{
    y: "200",
    opacity: 0,
    ease: Expo.easeInOut,
    delay: 1,
    stagger: 0.08,
}
);


// tl.from(".search-bar", 1.6, {
//     opacity: 0,
//     y: 60,
//     ease: Expo.easeInOut,
//     delay: 0.6,
// });

/*Searchbar script  ---------------------------------------------------- */ 

function updateSearchBar() {
const selector = document.getElementById("optionSelector");
const andText = document.getElementById("andText");
const searchFields = document.getElementById("searchFields");
const inputFields = searchFields.getElementsByClassName("input-field");

if (selector.value === "soy") {
    inputFields[0].style.display = "block";
    inputFields[1].style.display = "none"
    andText.style.display = "inline";
    inputFields[2].style.display = "block";
} else {
    inputFields[0].style.display = "none";
    inputFields[1].style.display = "block";
    andText.style.display = "none";
    inputFields[2].style.display = "none";
}
}