import CarImage from "./CarImage";
import "../App.css";
import { SingleCarInterface } from "../utils/interfaces";

const SingleCar = ({ carsData, deleteCar, changeCar }: SingleCarInterface) => {
  return (
    <>
      <div className="car-container">
        {carsData.map((car) => (
          <div key={car.id} className="car-component">
            <div className="car-component__image-block">
              <CarImage color={car.color} />
              <img
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhmWLe1i-nydIEDVwuWdNakukQ0h2R_W9ALlTDU4zHxBVkc-U-8fG-3RnlOowilBobV94OTOIGOc8dJCqEBOeSAvyR1G8Pri0-2JNpsxYaXBs3CwmTp9UTsPLBgm8m0R7fyWzPP658-etY/s0/crossed_two_checkered_flags.gif"
                alt="flag"
                width="90"
                className="image-block__flag"
              />
            </div>
            <p>{car.name}</p>
            <div className="btn-block">
              <button className="app-button">Start</button>
              <button className="app-button">Drive</button>
              <button className="app-button">Stop</button>
              <button onClick={() => changeCar(car)} className="app-button">
                Change
              </button>
              <button onClick={() => deleteCar(car.id)} className="app-button">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SingleCar;
