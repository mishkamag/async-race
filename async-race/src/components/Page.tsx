type PageProps = {
  pageNumber: number;
  totalPages: number;
  ChangePage: (bool: boolean) => void;
};

const Page = ({ pageNumber, totalPages, ChangePage }: PageProps) => {
  return (
    <div className="page-block">
      <button className="btn" onClick={() => ChangePage(false)}>
        prev
      </button>
      <p className="garage-text">
        Page {pageNumber} / {totalPages}
      </p>
      <button className="btn" onClick={() => ChangePage(true)}>
        next
      </button>
    </div>
  );
};

export default Page;
