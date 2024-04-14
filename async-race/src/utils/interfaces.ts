export interface CarInterface {
  name: string;
  id: number;
  color: string;
}

export interface HomePageInterface {
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  pageNumber: number;
}

export interface StartEngineInterface {
  velocity: number;
  distance: number;
}
