import React, { useEffect, useRef, useState } from "react";
import "../App.css";
import { ColorFormProps } from "../utils/types";

const ColorForm: React.FC<ColorFormProps> = ({
  actionText,
  propFuncCar,
  carObj,
  save,
  setCarObj,
}) => {
  const [carName, setCarName] = useState<string>("");
  const [carColor, setCarColor] = useState<string>("#FFFFFF");
  const [carId, setCarID] = useState<number>(-1);
  const [error, setError] = useState<boolean>(false);
  const color = useRef("#FFFFFF");
  const name = useRef("");
  const id = useRef(-1);
  console.log(carName);

  const saveCarToLocalStorage = () => {
    const obj = {
      carColor: color.current,
      carName: name.current,
      carId: id.current,
    };
    if (carObj !== undefined) {
      localStorage.setItem("changedCar", JSON.stringify(obj));
    } else {
      localStorage.setItem("createdCar", JSON.stringify(obj));
    }
  };

  const deleteFromLocalStorage = () => {
    if (carObj !== undefined) {
      localStorage.removeItem("changedCar");
    } else {
      localStorage.removeItem("createdCar");
    }
  };

  const handleCarSubmission = () => {
    if (carName !== "") {
      propFuncCar?.({ name: carName, color: carColor }, carId);
      setError(false);
    } else {
      setError(true);
    }
    // Reset form fields and state
    setCarName("");
    setCarColor("#FFFFFF");
    setCarID(-1);
    if (setCarObj !== undefined) {
      setCarObj({ name: "", id: -1, color: "#FFFFFF" });
    }
  };

  useEffect(() => {
    if (carObj !== undefined) {
      setCarName(carObj.name);
      setCarColor(carObj.color);
      setCarID(carObj.id);
      id.current = carObj.id;
      name.current = carObj.name;
      color.current = carObj.color;
      if (localStorage.getItem("changedCar")) {
        const data = JSON.parse(localStorage.getItem("changedCar") as string);
        setCarColor(data.carColor);
        setCarName(data.carName);
      }
    } else {
      if (localStorage.getItem("createdCar")) {
        const data = JSON.parse(localStorage.getItem("createdCar") as string);
        setCarColor(data.carColor);
        setCarName(data.carName);
      }
    }
    // eslint-disable-next-line
  }, [carObj]);

  useEffect(() => {
    if (save) {
      saveCarToLocalStorage();
    }
    // eslint-disable-next-line
  }, [save]);

  return (
    <form className="create-block">
      <input
        type="text"
        className="create-block__input"
        placeholder={actionText}
        value={carName}
        onChange={(e) => {
          setCarName(e.target.value);
          setError(false);
          name.current = e.target.value;
          saveCarToLocalStorage();
        }}
        style={{ boxShadow: error ? "0 0 5px 5px red" : undefined }}
      />
      {error && <p className="create-block__error">!</p>}
      <input
        type="color"
        className="create-block__input"
        value={carColor}
        onChange={(e) => {
          setCarColor(e.target.value);
          color.current = e.target.value;
          saveCarToLocalStorage();
        }}
      />
      <button
        type="button"
        className="btn"
        disabled={
          carObj !== undefined
            ? carName !== "" && carObj.id !== -1
              ? false
              : true
            : false
        }
        onClick={() => {
          handleCarSubmission();
          deleteFromLocalStorage();
        }}
      >
        {carObj ? "Change" : "Create"}
      </button>
    </form>
  );
};

export default ColorForm;
