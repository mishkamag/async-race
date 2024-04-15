export interface CarInterface {
  name: string;
  id: number;
  color: string;
}

export interface HomePageInterface {
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  pageNumber: number;
  changeWinners: (id: number, time: number) => void;
  winners: WinnersInterface[];
}

export interface StartEngineInterface {
  velocity: number;
  distance: number;
}

type SortingDirection = "ASC" | "DESC";

export interface WinnerInterface {
  getWinners: (
    page: number,
    sortBy: string,
    sortOrder: SortingDirection
  ) => void;
  winners: WinnersInterface[];
  winPage: [number, React.Dispatch<React.SetStateAction<number>>];
  sortBy: [
    {
      name: string;
      sort: string;
    },
    React.Dispatch<
      React.SetStateAction<{
        name: string;
        sort: string;
      }>
    >
  ];
  sortOrder: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  totalCars: number;
  totalPages: number;
}

export interface WinnersInterface {
  id: number;
  wins: number;
  time: number;
}

export interface WinnerDataInterface {
  name: string;
  time: number;
}

export interface WinnerObjectInterface {
  obj: CarInterface;
  time: number;
  status: boolean;
}
