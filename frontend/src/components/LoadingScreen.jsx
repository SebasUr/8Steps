// LoadingScreen.js
import React, { useEffect } from 'react';
import gsap from 'gsap';
import "../styles/components/LoadingScreen.css"

const LoadingScreen = () => {
  useEffect(() => {
    const loadingScreen = document.getElementById('loading-screen');
    const logo = document.querySelector('.loading-logo');

    gsap.fromTo(logo,
      { scale: 1, opacity: 1 },
      {
        scale: 0.5,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.inOut',
        onComplete: () => {
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
  }, []);

  return (
    <div id="loading-screen">
      <div className="loading-content">
        <img src="../../public/logosvg.svg" alt="Logo" className="loading-logo" />
      </div>
    </div>
  );
};

export default LoadingScreen;
