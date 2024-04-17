import { useEffect, useRef, useState } from "react";
import ColorForm from "./ColorForm";
import SingleCar from "./SingleCar";
import Page from "./Page";
import Modal from "./Modal";
import { carNames } from "../utils/utils";
import {
  CarInterface,
  WinnerDataInterface,
  WinnerObjectInterface,
} from "../utils/interfaces";
import { HomePageInterface } from "../utils/types";

const HomePage = ({
  setPageNumber,
  pageNumber,
  changeWinners,
  winners,
}: HomePageInterface) => {
  const [carsArr, setCarsArr] = useState<CarInterface[]>([]);
  const [carObj, setCarObj] = useState<CarInterface>({
    name: "",
    color: "",
    id: -1,
  });
  const [serverError, setServerError] = useState<boolean>(false);
  const [totalCars, setTotalCars] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [startRace, setStartRace] = useState<boolean>(false);
  const [winnerData, setWinnerData] = useState<WinnerDataInterface>({
    name: "",
    time: 0,
  });
  const [endRace, setEndRace] = useState<boolean>(false);
  const save = useRef(false);

  // GET all cars
  const getCars = (page: number) => {
    fetch(`http://localhost:3000/garage?_page=${page}&_limit=7`)
      .then<CarInterface[]>((response) => {
        setServerError(false);
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
        setCarsArr(data);
      })
      .catch((error) => {
        setServerError(true);
        throw new Error(error);
      });
  };

  // ADD car
  const addCar = (obj: { name: string; color: string }) => {
    fetch("http://localhost:3000/garage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    })
      .then<CarInterface>((response) => response.json())
      .then(() => {
        getCars(pageNumber);
      });
  };

  //Delete car
  const deleteCar = (id: number) => {
    fetch(`http://localhost:3000/garage/${id}`, { method: "DELETE" }).then(
      (response) => {
        if (response.status === 200) {
          getCars(pageNumber);
        }
      }
    );
    const index = winners.findIndex((elem) => elem.id === id);
    if (index !== -1) {
      fetch(`http://localhost:3000/winners/${id}`, { method: "DELETE" });
    }
  };

  //Create 100 cars random
  const create100Cars = () => {
    let promise = Promise.resolve();
    for (let i = 0; i < 100; i++) {
      promise = promise.then(() => {
        const arr = Object.entries(carNames);
        const firstName = arr[Math.floor(Math.random() * arr.length)];
        const secondName =
          firstName[1][Math.floor(Math.random() * firstName[1].length)];
        const name = `${firstName[0]} ${secondName}`;
        const color = "#" + Math.random().toString(16).slice(3, 9);
        return addCar({ name, color });
      });
    }
  };

  //Change car
  const changeCar = (obj: CarInterface) => {
    localStorage.removeItem("changedCar");
    setCarObj(obj);
    save.current = true;
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

  //Fetched change cars
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
        const arr = [...carsArr];
        const index = arr.findIndex((car) => car.id === data.id);
        arr.splice(index, 1, data);
        setCarsArr(arr);
      });
  };

  let winnersArr: WinnerObjectInterface[] = [];
  const createWinner = (obj: CarInterface, time: number, status: boolean) => {
    winnersArr.push({ obj, time, status });
    if (winnersArr.length === carsArr.length) {
      setEndRace(true);
      const winner = winnersArr.find((elem) => elem.status === true);
      if (winner) {
        setWinnerData({ name: winner.obj.name, time: winner.time });
        changeWinners(winner.obj.id, winner.time);
        winnersArr = [];
      }
    }
  };

  //Reset race
  const stopRace = () => {
    setStartRace(false);
    setEndRace(false);
    setWinnerData({ name: "", time: 0 });
  };

  useEffect(() => {
    getCars(pageNumber);
    stopRace();
    // eslint-disable-next-line
  }, [pageNumber]);

  return (
    <main className="home-page">
      <ColorForm propFunc={addCar} />
      <ColorForm
        propFunc={fetchChangedCar}
        changeObj={carObj}
        setCarObj={setCarObj}
        save={save.current}
      />

      <div className="home-page__button-block">
        <p className="home-page__garage-info">
          Cars in garage: <span>{totalCars}</span>{" "}
        </p>
        <button
          onClick={() => setStartRace(true)}
          className="home-page__action-button"
          disabled={startRace}
        >
          Start race
        </button>
        <button
          onClick={stopRace}
          className="home-page__action-button"
          disabled={!endRace}
        >
          Reset
        </button>
        <button onClick={create100Cars} className="home-page__action-button">
          Create 100 cars
        </button>
      </div>
      <Page
        pageNumber={pageNumber}
        totalPages={totalPages}
        changePage={changePage}
      />
      {carsArr.map((item) => (
        <SingleCar
          carData={item}
          changeCar={changeCar}
          deleteCar={deleteCar}
          getCars={getCars}
          startRace={startRace}
          pageNumber={pageNumber}
          createWinner={createWinner}
          key={item.id}
        />
      ))}

      {/* Winner modal */}
      {winnerData.name && (
        <p className="home-page__winner-info">
          Winner {winnerData.name} with time {winnerData.time / 1000}s
        </p>
      )}

      {serverError && <Modal />}
    </main>
  );
};

export default HomePage;
