import React, { useState } from "react";
import "../App.css";

type ColorFormProps = {
  actionText: string;
  placeholderText: string;
  addCar?: (obj: { name: string; color: string }) => void;
};

const ColorForm: React.FC<ColorFormProps> = ({
  actionText,
  placeholderText,
  addCar,
}) => {
  const [carName, setCarName] = useState("");
  const [carColor, setCarColor] = useState("#000000");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!carName.trim()) {
      setError("Please enter a car name");
      return;
    }

    if (addCar) {
      addCar({ name: carName, color: carColor });
      setCarName("");
      setCarColor("#000000");
      setError("");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        className=""
        placeholder={placeholderText}
        value={carName}
        onChange={(e) => setCarName(e.target.value)}
      />
      <input
        type="color"
        className="form-color"
        value={carColor}
        onChange={(e) => setCarColor(e.target.value)}
      />
      <button type="submit" className="app-button">
        {actionText}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default ColorForm;
