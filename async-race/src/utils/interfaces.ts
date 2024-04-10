export interface CarInterface {
  name: string;
  id: number;
  color: string;
}

export interface SingleCarInterface {
  carsData: CarInterface[];
  deleteCar: (id: number) => void;
}

export interface HomePageInterface {
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  pageNumber: number;
}
