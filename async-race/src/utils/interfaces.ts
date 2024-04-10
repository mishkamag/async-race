export interface CarInterface {
  name: string;
  id: number;
  color: string;
}

export interface SingleCarInterface {
  carsData: CarInterface[];
}

export interface HomePageInterface {
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  pageNumber: number;
}
