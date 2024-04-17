import { useEffect, useRef, useState } from "react";
import { ColorFormProps } from "../utils/types";

const ColorForm = ({
  propFunc,
  changeObj,
  setCarObj,
  save,
}: ColorFormProps) => {
  const [carName, setCarName] = useState<string>("");
  const [carColor, setCarColor] = useState<string>("#000000");
  const [carId, setCarID] = useState<number>(-1);
  const [error, setError] = useState<boolean>(false);
  const color = useRef("#000000");
  const name = useRef("");
  const id = useRef(-1);

  const saveCarToLocalStorage = () => {
    const obj = {
      carColor: color.current,
      carName: name.current,
      carId: id.current,
    };
    if (changeObj !== undefined) {
      localStorage.setItem("changedCar", JSON.stringify(obj));
    } else {
      localStorage.setItem("createdCar", JSON.stringify(obj));
    }
  };

  const deleteFromLocalStorage = () => {
    if (changeObj !== undefined) {
      localStorage.removeItem("changedCar");
    } else {
      localStorage.removeItem("createdCar");
    }
  };

  const handleCarSubmission = () => {
    if (carName !== "") {
      propFunc?.({ name: carName, color: carColor }, carId);
      setError(false);
    } else {
      setError(true);
    }
    setCarName("");
    setCarColor("#FFFFFF");
    setCarID(-1);
    setCarObj?.({ name: "", id: -1, color: "#FFFFFF" });
  };

  useEffect(() => {
    if (changeObj !== undefined) {
      setCarName(changeObj.name);
      setCarColor(changeObj.color);
      setCarID(changeObj.id);
      id.current = changeObj.id;
      name.current = changeObj.name;
      color.current = changeObj.color;
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
  }, [changeObj]);

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
        placeholder={changeObj ? "Change Car" : "Car Name"}
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
          changeObj !== undefined
            ? carName !== "" && changeObj.id !== -1
              ? false
              : true
            : false
        }
        onClick={() => {
          handleCarSubmission();
          deleteFromLocalStorage();
        }}
      >
        {changeObj ? "Change" : "Create"}
      </button>
    </form>
  );
};

export default ColorForm;
