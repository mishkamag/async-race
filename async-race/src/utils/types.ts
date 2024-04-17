import { CarInterface, WinnersInterface } from "./interfaces";

//For CarImage componenet
export type CarImageProps = {
  color: string | undefined;
  animationTime: number;
  engineBroke: boolean;
  width: number;
  startEngine: boolean;
};

//For ColorForm componenet
export type ColorFormProps = {
  propFunc: (
    obj: {
      name: string;
      color: string;
    },
    id?: number
  ) => void;
  changeObj?: CarInterface;
  setCarObj?: React.Dispatch<React.SetStateAction<CarInterface>>;
  save?: boolean;
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

//For Component
export type PageProps = {
  pageNumber: number;
  totalPages: number;
  changePage: (bool: boolean) => void;
};

//For HomePage componenet
export type HomePageInterface = {
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  pageNumber: number;
  changeWinners: (id: number, time: number) => void;
  winners: WinnersInterface[];
};
