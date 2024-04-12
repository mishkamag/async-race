import { CarInterface } from "./interfaces";

export type CarImageProps = {
  color: string | undefined;
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

export type PageProps = {
  pageNumber: number;
  totalPages: number;
  changePage: (bool: boolean) => void;
};
