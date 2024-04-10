import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import WinnerPage from "./components/WinnerPage";
import { useState } from "react";

const App = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const navigate = useNavigate();
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
            <HomePage pageNumber={pageNumber} setPageNumber={setPageNumber} />
          }
        />
        <Route path="/winners" element={<WinnerPage />} />
      </Routes>
    </>
  );
};

export default App;
