export interface CarInterface {
  name: string;
  id: number;
  color: string;
}

export interface StartEngineInterface {
  velocity: number;
  distance: number;
}

//winners page

export interface WinnerPageInterface {
  // eslint-disable-next-line @typescript-eslint/ban-types
  getWinners: Function;
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
    >,
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

export interface RaceInterface {
  velocity: number;
  distance: number;
}
