import { CarInterface, HomePageInterface } from "../utils/interfaces";
import { carNames } from "../utils/utils";
import ColorForm from "./ColorForm";
import Page from "./Page";
import SingleCar from "./SingleCar";
import { useEffect, useState } from "react";

const HomePage = ({ setPageNumber, pageNumber }: HomePageInterface) => {
  const [carsData, setCarsData] = useState<CarInterface[]>([]);
  const [totalCars, setTotalCars] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  const changePage = (bool: boolean) => {
    if (bool && totalPages > pageNumber) {
      setPageNumber((pageNumber += 1));
    }
    if (!bool && pageNumber !== 1) {
      setPageNumber((pageNumber -= 1));
    }
  };
  //get all cars
  const getCars = (page: number) => {
    fetch(`http://localhost:3000/garage?_page=${page}&_limit=7`)
      .then<CarInterface[]>((response) => {
        if (response.headers.get("X-Total-Count") !== null) {
          setTotalCars(Number(response.headers.get("X-Total-Count")));
          if (
            Math.ceil(Number(response.headers.get("X-Total-Count")) / 7) !== 0
          ) {
            setTotalPages(
              Math.ceil(Number(response.headers.get("X-Total-Count")) / 7)
            );
          }
        }
        return response.json();
      })
      .then((data) => {
        if (data.length === 0) {
          changePage(false);
        }
        setCarsData(data);
      })
      .catch((error) => {
        throw new Error(error);
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
    getCars(pageNumber);
    // eslint-disable-next-line
  }, [pageNumber]);

  console.log(carsData);
  return (
    <div>
      <ColorForm
        actionText="Create Car"
        placeholderText="Car name (like: tesla )"
        addCar={addCar}
      />

      <div className="btns-block">
        <p className="garage-text">Cars in garage: {totalCars}</p>
        <button className="app-button">Start race</button>
        <button className="app-button">Reset</button>
        <button onClick={create100Cars} className="app-button">
          Create 100 cars
        </button>
      </div>

      <SingleCar carsData={carsData} />

      <Page
        pageNumber={pageNumber}
        totalPages={totalPages}
        changePage={changePage}
      />
    </div>
  );
};

export default HomePage;
