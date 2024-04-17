import { useEffect } from "react";

import CarImage from "./CarImage";
import Page from "./Page";
import { CarInterface, WinnerPageInterface } from "../utils/interfaces";

let allCars: CarInterface[] = [];
export default function WinnersPage({
  getWinners,
  winners,
  winPage,
  sortBy,
  sortOrder,
  totalCars,
  totalPages,
}: WinnerPageInterface) {
  const changePage = (bool: boolean) => {
    if (bool && totalPages > winPage[0]) {
      winPage[1]((winPage[0] += 1));
    }
    if (!bool && winPage[0] !== 1) {
      winPage[1]((winPage[0] -= 1));
    }
  };

  const mixedArr = winners.map((elem) => {
    const car = allCars.find((item) => item.id === elem.id);
    return {
      id: elem.id,
      wins: elem.wins,
      time: elem.time,
      name: car?.name,
      color: car?.color,
    };
  });

  const sortingFn = (by: string) => {
    if (sortOrder[0]) {
      sortBy[1]({ name: by, sort: "ASC" });
      sortOrder[1](false);
    } else {
      sortBy[1]({ name: by, sort: "DESC" });
      sortOrder[1](true);
    }
  };

  const getGarage = () => {
    fetch("http://localhost:3000/garage")
      .then<CarInterface[]>((response) => response.json())
      .then((data) => {
        allCars = [...data];
      });
  };

  useEffect(() => {
    getGarage();
    getWinners(winPage[0], sortBy[0].name, sortBy[0].sort);
    // eslint-disable-next-line
  }, [sortBy[0], winPage[0]]);

  return (
    <div className="winner-page">
      <p>Total winners : {totalCars}</p>
      <div className="winners-item">
        <p
          className="winners-item__text clicked"
          onClick={() => sortingFn("id")}
        >
          ID{" "}
          {sortOrder[0] && sortBy[0].name === "id" ? (
            <span>&#8659;</span>
          ) : (
            <span>&#8657;</span>
          )}
        </p>
        <p className="winners-item__text">Name</p>
        <p className="winners-item__text">Car</p>
        <p
          className="winners-item__text clicked"
          onClick={() => sortingFn("wins")}
        >
          Wins{" "}
          {sortOrder[0] && sortBy[0].name === "wins" ? (
            <span>&#8659;</span>
          ) : (
            <span>&#8657;</span>
          )}
        </p>
        <p
          className="winners-item__text clicked"
          onClick={() => sortingFn("time")}
        >
          BestTime{" "}
          {sortOrder[0] && sortBy[0].name === "time" ? (
            <span>&#8659;</span>
          ) : (
            <span>&#8657;</span>
          )}
        </p>
      </div>
      {mixedArr.map((item) => (
        <div key={item.id} className="winners-item">
          <p className="winners-item__text">{item.id}</p>
          <p className="winners-item__text">{item.name}</p>
          <CarImage
            color={item.color}
            animationTime={0}
            engineBroke={false}
            startEngine={false}
            width={60}
          />
          <p className="winners-item__text">{item.wins}</p>
          <p className="winners-item__text">{item.time}</p>
        </div>
      ))}
      <Page
        pageNumber={winPage[0]}
        totalPages={totalPages}
        changePage={changePage}
      />
    </div>
  );
}
