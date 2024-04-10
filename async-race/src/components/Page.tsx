import { PageProps } from "../utils/types";

const Page = ({ pageNumber, totalPages, changePage }: PageProps) => {
  return (
    <div className="page-block">
      <button className="btn" onClick={() => changePage(false)}>
        {pageNumber > 1 ? <p>prev</p> : ""}
      </button>
      <p className="garage-text">
        Page {pageNumber} / {totalPages}
      </p>
      <button className="btn" onClick={() => changePage(true)}>
        {pageNumber >= totalPages ? "" : <p>next</p>}
      </button>
    </div>
  );
};

export default Page;
