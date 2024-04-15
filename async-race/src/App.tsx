import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import WinnerPage from "./components/WinnerPage";
import { useEffect, useState } from "react";
import { WinnersInterface } from "./utils/interfaces";

const App = () => {
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

  const setWinner = (obj: WinnersInterface) => {
    fetch("http://localhost:3000/winners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    }).then<WinnersInterface>((response) => response.json());
  };

  const updateWinner = (obj: { wins: number; time: number }, id: number) => {
    fetch(`http://localhost:3000/winners/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    });
  };

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
      })
      .catch((error) => {
        throw error;
      });
  };

  useEffect(() => {
    getWinners();
  }, []);

  return (
    <>
      <header className="app-container">
        <div className="app-header">
          <h2 className="app-title">Fast & Furious</h2>
          <ul className="app-buttons">
            <li className="app-button" onClick={() => navigate("/")}>
              Garage
            </li>
            <li className="app-button" onClick={() => navigate("/winners")}>
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
            <WinnerPage
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
};

export default App;
