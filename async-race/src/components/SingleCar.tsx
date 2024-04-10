import CarImage from "./CarImage";
import "../App.css";

const SingleCar = () => {
  return (
    <div className="car-component">
      <div className="car-component__image-block">
        <CarImage color="red" />
      </div>
      <div className="car-component__image-block">
        <CarImage color="blue" />
      </div>
      <div className="car-component__image-block">
        <CarImage color="green" />
      </div>
      <p>taxi</p>
    </div>
  );
};

export default SingleCar;
