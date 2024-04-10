import ColorForm from "./ColorForm";
import SingleCar from "./SingleCar";
import { useEffect, useState } from "react";

export interface CarInterface {
  name: string;
  id: number;
  color: string;
}

const carNames = {
  Porshe: ["Panamera", "Cayene", "Boxter", "911"],
  BMW: ["M3 e46", "M4", "540i", "X6"],
  Mersedes: ["AMG G55", "GT63 AMG", "CLS"],
  Lada: ["Priora", "Granta", "X-Ray", "2101"],
  Volkswagen: ["Polo GT", "Scirocco", "Golf GTI", "Beetle"],
  Hundai: ["Tiburon", "Santa Fe", "Accent", "Sonata"],
  Lamborgini: ["Aventador", "Urus", "Huracan", "Veneno"],
};

const HomePage = () => {
  const [carsData, setCarsData] = useState<CarInterface[]>([]);

  //get all cars
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

  //add car
  const addCar = (obj: { name: string; color: string }) => {
    fetch("http://localhost:3000/garage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    })
      .then<CarInterface>((response) => response.json())
      .then(() => {});
  };

  //create 100 cars random
  const create100Cars = () => {
    for (let i = 0; i < 100; i++) {
      const arr = Object.entries(carNames);
      const firstName = arr[Math.floor(Math.random() * arr.length)];
      const secondName =
        firstName[1][Math.floor(Math.random() * firstName[1].length)];
      const name = `${firstName[0]} ${secondName}`;
      const color = "#" + Math.random().toString(16).slice(3, 9);
      addCar({ name, color });
    }
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

      <div className="btns-block">
        <p className="garage-text">Cars in garage: {carsData?.length}</p>
        <button className="app-button">Start race</button>
        <button className="app-button">Reset</button>
        <button onClick={create100Cars} className="app-button">
          Create 100 cars
        </button>
      </div>

      <SingleCar carsData={carsData} />
    </div>
  );
};

export default HomePage;
