export type CarImageProps = {
  color: string | undefined;
};

export type ColorFormProps = {
  actionText: string;
  placeholderText: string;
  addCar?: (obj: { name: string; color: string }) => void;
};

export type PageProps = {
  pageNumber: number;
  totalPages: number;
  changePage: (bool: boolean) => void;
};
