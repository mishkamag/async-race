import React from "react";
import { PageProps } from "../utils/types";

const Page = ({ pageNumber, totalPages, changePage }: PageProps) => {
  return (
    <section className="page-block">
      <button className="page-block__btn" onClick={() => changePage(false)}>
        {pageNumber > 1 ? (
          <span className="page-block__btn-arrow">&larr;</span>
        ) : (
          ""
        )}
      </button>
      <p className="page-block__garage-text">
        Pages {pageNumber} / {totalPages}
      </p>
      <button className="page-block__btn" onClick={() => changePage(true)}>
        {pageNumber >= totalPages ? (
          ""
        ) : (
          <span className="page-block__btn-arrow">&rarr;</span>
        )}
      </button>
    </section>
  );
};

export default Page;
