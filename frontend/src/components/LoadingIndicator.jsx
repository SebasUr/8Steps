
import React, { useEffect, useState } from 'react';
import "../styles/components/LoadingIndicator.css"

const LoadingIndicator = () => {
  const [hintCounter, setHintCounter] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHintCounter((prevCounter) => (prevCounter === 4 ? 1 : prevCounter + 1));
    }, 6000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div id="main-loader">
      <div className="loader-parent">
        <div className="loader-left">
          <div className="cnt1">
            <div className="cnt2">
              <div id="loader">
                <svg height="200" viewBox="0 0 40 60" width="200">
                  <polygon
                    className="triangle"
                    fill="none"
                    points="16,1 32,32 1,32"
                    stroke="#fff"
                    strokeWidth="1"
                  ></polygon>
                  <text className="loading" fill="#fff" x="0" y="45">
                    &nbsp;&nbsp;Loading
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="loader-right">
          <div className="cnt1">
            <div className="cnt2">
              <div className="loader-hints">
                <div className="hints">
                  <div className="hint-title">
                    <h3>Hints</h3>
                  </div>
                  <div className="hint-description">
                    <p
                      className={`hint-text ${hintCounter === 1 ? 'visible' : ''}`}
                    >
                      For getting better performance experience add your browser in the GPU control setting.
                    </p>
                    <p
                      className={`hint-text ${hintCounter === 2 ? 'visible' : ''}`}
                    >
                      Chrome (83+) and Opera GX (68+) are highly recommended for getting best experience.
                    </p>
                    <p
                      className={`hint-text ${hintCounter === 3 ? 'visible' : ''}`}
                    >
                      You can use the sound button (on the top left) to mute or unmute the music.
                    </p>
                    <p
                      className={`hint-text ${hintCounter === 4 ? 'visible' : ''}`}
                    >
                      If there was any problem feel free to contact me, I'm always available and listening to you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
