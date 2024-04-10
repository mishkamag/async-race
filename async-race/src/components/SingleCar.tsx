import CarImage from "./CarImage";
import "../App.css";
import { CarInterface } from "./HomePage";

interface Props {
  carsData: CarInterface[];
}

const SingleCar = ({ carsData }: Props) => {
  return (
    <>
      <div>
        {carsData.map((car) => (
          <div key={car.id} className="car-component">
            <div className="car-component__image-block">
              <CarImage color={car.color} />
            </div>
            <p>{car.name}</p>
            <div className="btns-block">
              <button className="app-button">Drive</button>
              <button className="app-button">Stop</button>
              <button className="app-button">Change</button>
              <button className="app-button">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SingleCar;
