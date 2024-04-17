import { useEffect, useState } from "react";
import CarImage from "./CarImage";
import { CarInterface, RaceInterface } from "../utils/interfaces";

type Props = {
  carData: CarInterface;
  changeCar: (obj: CarInterface) => void;
  getCars: (page: number) => void;
  startRace: boolean;
  pageNumber: number;
  createWinner: (obj: CarInterface, time: number, status: boolean) => void;
  deleteCar: (id: number) => void;
};

const SingleCar = ({
  carData,
  changeCar,
  startRace,
  createWinner,
  deleteCar,
}: Props) => {
  const [engineBroke, setEngineBroke] = useState<boolean>(false);
  const [animationTime, setAnimationTime] = useState<number>(0);
  const [engineStarted, setEngineStarted] = useState<boolean>(false);
  const [driveMode, setDriveMode] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  let winnerTime = 0;
  let startEngine = false;

  const StartEngine = async (status: string) => {
    if (status === "drive") {
      if (winnerTime !== 0) {
        setAnimationTime(winnerTime);
      } else setAnimationTime(time);
      setDriveMode(true);
    }
    if (status === "stopped") {
      setTime(0);
      setEngineBroke(false);
      setEngineStarted(false);
      setDriveMode(false);
      setAnimationTime(0);
      winnerTime = 0;
      startEngine = false;
    }
    const response = await fetch(
      `http://localhost:3000/engine?id=${carData.id}&status=${status}`,
      { method: "PATCH" }
    );
    if (response.status === 500) {
      setEngineBroke(true);
      createWinner(carData, winnerTime, false);
    }
    if (status === "started") {
      if (response.status === 200) {
        const data: RaceInterface = await response.json();
        winnerTime = Math.floor(data.distance / data.velocity);
        setTime(winnerTime);
        setEngineStarted(true);
        startEngine = true;
      }
    }
    if (status === "drive") {
      if (response.status === 200) {
        if (startEngine) createWinner(carData, winnerTime, true);
      }
    }
  };

  useEffect(() => {
    if (startRace) {
      const promiss = new Promise((resolve) => {
        resolve(StartEngine("started"));
      });
      promiss.then(() => {
        StartEngine("drive");
      });
    } else StartEngine("stopped");
    // eslint-disable-next-line
  }, [startRace]);

  return (
    <div className="car-component">
      <div className="car-component__image-block">
        <CarImage
          color={carData.color}
          animationTime={animationTime}
          engineBroke={engineBroke}
          startEngine={engineStarted}
          width={100}
        />
        <img
          src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhmWLe1i-nydIEDVwuWdNakukQ0h2R_W9ALlTDU4zHxBVkc-U-8fG-3RnlOowilBobV94OTOIGOc8dJCqEBOeSAvyR1G8Pri0-2JNpsxYaXBs3CwmTp9UTsPLBgm8m0R7fyWzPP658-etY/s0/crossed_two_checkered_flags.gif"
          alt="flag"
          width="90"
          className="image-block__flag"
        />
      </div>
      <p>{carData.name}</p>
      <div className="btns-block">
        <button
          onClick={() => StartEngine("started")}
          className="btn"
          disabled={engineStarted}
        >
          Start
        </button>
        <button
          onClick={() => StartEngine("drive")}
          className="btn"
          disabled={driveMode || !engineStarted}
        >
          Drive
        </button>
        <button
          onClick={() => StartEngine("stopped")}
          className="btn"
          disabled={!engineStarted}
        >
          Stop
        </button>
        <button onClick={() => changeCar(carData)} className="btn">
          Change
        </button>
        <button onClick={() => deleteCar(carData.id)} className="btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default SingleCar;
