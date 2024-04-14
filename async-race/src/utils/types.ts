import { CarInterface } from "./interfaces";

export type CarImageProps = {
  color: string | undefined;
  animationTime: number;
  engineBroke: boolean;
  width: number;
  startEngine: boolean;
};

export type ColorFormProps = {
  actionText: string;
  addCar?: (obj: { name: string; color: string }) => void;
  propFuncCar?: (
    obj: {
      name: string;
      color: string;
    },
    id?: number
  ) => void | undefined;
  setCarObj?: React.Dispatch<React.SetStateAction<CarInterface>>;
  save?: boolean;
  carObj?: CarInterface;
};

export type SingleCarProps = {
  carData: CarInterface;
  changeCar: (obj: CarInterface) => void;
  getCars: (page: number) => void;
  startRace: boolean;
  pageNumber: number;
  createWinner?: (obj: CarInterface, time: number, status: boolean) => void;
  deleteCar: (id: number) => void;
};

export type PageProps = {
  pageNumber: number;
  totalPages: number;
  changePage: (bool: boolean) => void;
};
