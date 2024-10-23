
import React, { useEffect, useState } from 'react';
import "../styles/components/LoadingIndicator.css"

const LoadingIndicator = () => {
  const [hintCounter, setHintCounter] = useState(1);
  const [dotsCounter, setDotsCounter] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHintCounter((prevCounter) => (prevCounter === 4 ? 1 : prevCounter + 1));
    }, 6000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDotsCounter((prevCounter) => (prevCounter === 4 ? 1 : prevCounter + 1));
    }, 500);

    return () => clearInterval(intervalId); 
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
                    &nbsp;&nbsp;Cargando{ ".".repeat(dotsCounter) }
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
                    <h3>Estamos preparando tu ruta</h3>
                  </div>
                  <div className="hint-description">
                    <p
                      className={`hint-text ${hintCounter === 1 ? 'visible' : ''}`}
                    > El mercado laboral está cambiando...
                    </p>
                    <p
                      className={`hint-text ${hintCounter === 2 ? 'visible' : ''}`}
                    >
                      ¿Sabías que la mayoría de los puestos de trabajo del futuro aún no existen? Se estima que el 85% de los empleos de 2030 todavía no han sido inventados.
                    </p>
                    <p
                      className={`hint-text ${hintCounter === 3 ? 'visible' : ''}`}
                    >
                      ¿Sabías que las habilidades blandas, como la empatía y la comunicación, son cada vez más valoradas? En el futuro, estas habilidades serán clave en muchos empleos.
                    </p>
                    <p
                      className={`hint-text ${hintCounter === 4 ? 'visible' : ''}`}
                    >
                      ¿Sabías que el salario no es el principal factor de satisfacción laboral? Según varias encuestas, los empleados valoran más el equilibrio entre trabajo y vida personal que el salario.
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
