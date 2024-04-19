import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import WinnersPage from "./components/WinnerPage";
import { WinnersInterface } from "./utils/interfaces";
import useHttp from "./utils/useHttp";

function App() {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [winners, setWinners] = useState<WinnersInterface[]>([]);
  const winPage = useState<number>(1);
  const sortBy = useState<{ name: string; sort: string }>({
    name: "id",
    sort: "ASC",
  });
  const sortOrder = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCars, setTotalCars] = useState<number>(0);

  const { sendRequest } = useHttp();

  const changeWinners = (id: number, time: number) => {
    const ifWinner = winners.find((elem) => elem.id === id);
    if (ifWinner) {
      ifWinner.wins += 1;
      if (time / 1000 < ifWinner.time) {
        ifWinner.time = time / 1000;
      }
      updateWinner({ time: ifWinner.time, wins: ifWinner.wins }, ifWinner.id);
    } else {
      setWinner({ id: id, wins: 1, time: time / 1000 });
    }
  };

  //set winner
  const setWinner = async (obj: WinnersInterface) => {
    try {
      await sendRequest("http://localhost:3000/winners", "POST", obj);
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  //update winners
  const updateWinner = async (
    obj: { wins: number; time: number },
    id: number
  ) => {
    try {
      await sendRequest(`http://localhost:3000/winners/${id}`, "PUT", obj);
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  //get winners
  const getWinners = (page?: number, sort?: string, order?: string) => {
    let queryParams = "";
    if (page) {
      queryParams = `?_page=${page}&_limit=10&_sort=${sort}&_order=${order}`;
    }
    fetch(`http://localhost:3000/winners${queryParams}`)
      .then<WinnersInterface[]>((response) => {
        if (response.headers.get("X-Total-Count") !== null) {
          setTotalCars(Number(response.headers.get("X-Total-Count")));
          if (
            Math.ceil(Number(response.headers.get("X-Total-Count")) / 10) !== 0
          ) {
            setTotalPages(
              Math.ceil(Number(response.headers.get("X-Total-Count")) / 10)
            );
          }
        }
        return response.json();
      })
      .then((data) => {
        setWinners(data);
      });
  };

  useEffect(() => {
    getWinners();
  }, []);
  return (
    <>
      <header className="header-container">
        <div className="header-content">
          <h2 className="header-title">Fast & Furious</h2>
          <ul className="header-buttons">
            <li className="header-button" onClick={() => navigate("/")}>
              Garage
            </li>
            <li className="header-button" onClick={() => navigate("/winners")}>
              Winners
            </li>
          </ul>
        </div>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              changeWinners={changeWinners}
              winners={winners}
            />
          }
        />
        <Route
          path="/winners"
          element={
            <WinnersPage
              getWinners={getWinners}
              winners={winners}
              winPage={winPage}
              sortBy={sortBy}
              sortOrder={sortOrder}
              totalPages={totalPages}
              totalCars={totalCars}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
