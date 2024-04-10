import CarImage from "./CarImage";
import "../App.css";
import { CarInterface } from "./HomePage";

interface Props {
  carsData: CarInterface[];
}

const SingleCar = ({ carsData }: Props) => {
  return (
    <div>
      {carsData.map((car) => (
        <div key={car.id} className="car-component">
          <div className="car-component__image-block">
            <CarImage color={car.color} />
          </div>
          <p>{car.name}</p>
        </div>
      ))}
    </div>
  );
};

export default SingleCar;
