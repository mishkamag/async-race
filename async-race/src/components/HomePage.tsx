import { CarInterface, HomePageInterface } from "../utils/interfaces";
import { carNames } from "../utils/utils";
import ColorForm from "./ColorForm";
import Page from "./Page";
import SingleCar from "./SingleCar";
import { useEffect, useRef, useState } from "react";

const HomePage = ({ setPageNumber, pageNumber }: HomePageInterface) => {
  const [carsData, setCarsData] = useState<CarInterface[]>([]);
  const [totalCars, setTotalCars] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [carObj, setCarObj] = useState<CarInterface>({
    name: "",
    color: "#FFFFFF",
    id: -1,
  });
  const save = useRef(false);

  //get all cars
  const getCars = (page: number) => {
    fetch(`http://localhost:3000/garage?_page=${page}&_limit=7`)
      .then((response) => {
        if (response.ok) {
          const totalCount = Number(response.headers.get("X-Total-Count"));
          setTotalCars(totalCount);
          setTotalPages(Math.ceil(totalCount / 7));
          return response.json();
        } else {
          throw new Error("Failed to fetch cars data");
        }
      })
      .then((data) => {
        setCarsData(data);
      })
      .catch((error) => {
        console.error("Error fetching cars data:", error);
      });
  };

  //add car
  const addCar = (obj: { name: string; color: string }) => {
    const newCar: CarInterface = {
      name: obj.name,
      color: obj.color,
      id: Date.now(),
    };
    setCarsData([...carsData, newCar]);

    fetch("http://localhost:3000/garage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCar),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add car");
        }
        return response.json();
      })
      .then(() => {
        getCars(pageNumber);
      })
      .catch((error) => {
        console.error("Error adding car:", error);
      });
  };

  //delete car
  const deleteCar = (id: number) => {
    fetch(`http://localhost:3000/garage/${id}`, { method: "DELETE" }).then(
      (response) => {
        if (response.status === 200) {
          getCars(pageNumber);
        }
      }
    );
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

  //change car
  const changeCar = (obj: CarInterface) => {
    localStorage.removeItem("changeInpLoginovskiy");
    setCarObj(obj);
    save.current = true;
  };

  // fetch change cars
  const fetchChangedCar = (
    obj: { name: string; color: string },
    id: number | undefined
  ) => {
    fetch(`http://localhost:3000/garage/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    })
      .then<CarInterface>((response) => response.json())
      .then((data) => {
        const arr = [...carsData];
        const index = arr.findIndex((car) => car.id === data.id);
        arr.splice(index, 1, data);
        setCarsData(arr);
      });
  };

  //pagination
  const changePage = (bool: boolean) => {
    if (bool && totalPages > pageNumber) {
      setPageNumber((pageNumber += 1));
    }
    if (!bool && pageNumber !== 1) {
      setPageNumber((pageNumber -= 1));
    }
  };

  useEffect(() => {
    getCars(pageNumber);
    // eslint-disable-next-line
  }, [pageNumber]);

  return (
    <div>
      <ColorForm actionText="Create Car" propFuncCar={addCar} />

      <ColorForm
        actionText="Change Car"
        carObj={carObj}
        setCarObj={setCarObj}
        save={save.current}
        propFuncCar={fetchChangedCar}
      />

      <div className="btns-block">
        <p className="garage-text">Cars in garage: {totalCars}</p>
        <button className="app-button">Start race</button>
        <button className="app-button">Reset</button>
        <button onClick={create100Cars} className="app-button">
          Create 100 cars
        </button>
      </div>

      <SingleCar
        carsData={carsData}
        deleteCar={deleteCar}
        changeCar={changeCar}
      />

      <Page
        pageNumber={pageNumber}
        totalPages={totalPages}
        changePage={changePage}
      />
    </div>
  );
};

export default HomePage;
