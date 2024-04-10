import ColorForm from "./ColorForm";
import SingleCar from "./SingleCar";
import { useEffect, useState } from "react";

export interface CarInterface {
  name: string;
  id: number;
  color: string;
}

const HomePage = () => {
  const [carsData, setCarsData] = useState<CarInterface[]>([]);

  const getCars = () => {
    fetch(`http://localhost:3000/garage`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: CarInterface[]) => {
        setCarsData(data);
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
      });
  };

  useEffect(() => {
    getCars();
  }, []);

  console.log(carsData);
  return (
    <div>
      <ColorForm actionText="Create" placeholderText="Car name" />
      <ColorForm actionText="Change" placeholderText="Change Car" />
      <SingleCar carsData={carsData} />
    </div>
  );
};

export default HomePage;
