import React, { useEffect } from "react";
import { CarImageProps } from "../utils/types";
import { useLocation } from "react-router-dom";

const CarImage = ({
  color,
  animationTime,
  engineBroke,
  width,
}: CarImageProps) => {
  const location = useLocation();

  const refImage = React.createRef<HTMLDivElement>();
  let startAnimo: number = 0;
  let myreq: number;

  function move(time: number) {
    if (!startAnimo) {
      startAnimo = time;
    }
    const progress = (time - startAnimo) / animationTime;
    const translate = progress * (window.innerWidth * 0.82);
    if (refImage.current !== null) {
      refImage.current.style.transform = `translate(${translate}px) rotateY(180deg)`;
    }
    if (progress < 1) {
      myreq = requestAnimationFrame(move);
    }
  }

  useEffect(() => {
    myreq = requestAnimationFrame(move);
    if (engineBroke) {
      cancelAnimationFrame(myreq);
    }
  }, [animationTime, engineBroke]);

  const inWinnersPage = location.pathname === "/winners";
  const carClassName = inWinnersPage ? "car-winners-page" : "car";

  return (
    <div
      className={carClassName}
      id="car"
      ref={refImage}
      style={{
        fill: color,
        width: `${width}px`,
        transform:
          animationTime === 0 ? "translate(0px) rotateY(180deg)" : undefined,
      }}
    >
      <svg
        style={{
          position: "absolute",
          top: "15px",
        }}
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 125 40"
      >
        <path d="M99.42,13.57c5.93,0,10.73,4.8,10.73,10.73c0,5.93-4.8,10.73-10.73,10.73s-10.73-4.8-10.73-10.73 C88.69,18.37,93.49,13.57,99.42,13.57L99.42,13.57z M79.05,5c-0.59,1.27-1.06,2.69-1.42,4.23c-0.82,2.57,0.39,3.11,3.19,2.06 c2.06-1.23,4.12-2.47,6.18-3.7c1.05-0.74,1.55-1.47,1.38-2.19c-0.34-1.42-3.08-2.16-5.33-2.6C80.19,2.23,80.39,2.11,79.05,5 L79.05,5z M23.86,19.31c2.75,0,4.99,2.23,4.99,4.99c0,2.75-2.23,4.99-4.99,4.99c-2.75,0-4.99-2.23-4.99-4.99 C18.87,21.54,21.1,19.31,23.86,19.31L23.86,19.31z M99.42,19.31c2.75,0,4.99,2.23,4.99,4.99c0,2.75-2.23,4.99-4.99,4.99 c-2.75,0-4.99-2.23-4.99-4.99C94.43,21.54,96.66,19.31,99.42,19.31L99.42,19.31z M46.14,12.5c2.77-2.97,5.97-4.9,9.67-6.76 c8.1-4.08,13.06-3.58,21.66-3.58l-2.89,7.5c-1.21,1.6-2.58,2.73-4.66,2.84H46.14L46.14,12.5z M23.86,13.57 c5.93,0,10.73,4.8,10.73,10.73c0,5.93-4.8,10.73-10.73,10.73s-10.73-4.8-10.73-10.73C13.13,18.37,17.93,13.57,23.86,13.57 L23.86,13.57z M40.82,10.3c3.52-2.19,7.35-4.15,11.59-5.82c12.91-5.09,22.78-6,36.32-1.9c4.08,1.55,8.16,3.1,12.24,4.06 c4.03,0.96,21.48,1.88,21.91,4.81l-4.31,5.15c1.57,1.36,2.85,3.03,3.32,5.64c-0.13,1.61-0.57,2.96-1.33,4.04 c-1.29,1.85-5.07,3.76-7.11,2.67c-0.65-0.35-1.02-1.05-1.01-2.24c0.06-23.9-28.79-21.18-26.62,2.82H35.48 C44.8,5.49,5.04,5.4,12.1,28.7C9.62,31.38,3.77,27.34,0,18.75c1.03-1.02,2.16-1.99,3.42-2.89c-0.06-0.05,0.06,0.19-0.15-0.17 c-0.21-0.36,0.51-1.87,1.99-2.74C13.02,8.4,31.73,8.52,40.82,10.3L40.82,10.3z" />
      </svg>
    </div>
  );
};

export default CarImage;
