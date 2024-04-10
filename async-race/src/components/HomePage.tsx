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

  const addCar = (obj: { name: string; color: string }) => {
    fetch("http://localhost:3000/garage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    })
      .then<CarInterface>((response) => response.json())
      .then(() => {});
  };

  useEffect(() => {
    getCars();
  }, []);

  console.log(carsData);
  return (
    <div>
      <ColorForm
        actionText="Create Car"
        placeholderText="Car name (like: tesla )"
        addCar={addCar}
      />
      <p>Garage is {carsData?.length} car</p>

      <SingleCar carsData={carsData} />
    </div>
  );
};

export default HomePage;
