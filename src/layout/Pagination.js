import React from "react";

const Pagination = ({ page, pages, onClick, setPage, changePage }) => {
  let middlePagination;
  if (pages <= 5) {
    middlePagination = [...Array(pages).keys()].map((i, x) => (
      <li className={page - 1 === i ? "active page-item" : "page-item"} key={i}>
        <a className="page-link" href="#" onClick={() => changePage(x + 1)}>
          {x + 1}
        </a>
      </li>
    ));
  } else {
    const startValue = Math.floor((page - 1) / 5) * 5;
    middlePagination = (
      <>
        {[...Array(5).keys()].map((i, x) => (
          <>
            {startValue + x < pages - 1 ? (
              <li
                className={
                  page - 1 === startValue + x ? "active page-item" : "page-item"
                }
                key={startValue + x + 1}
              >
                <a
                  className="page-link"
                  href="#"
                  onClick={() => changePage(startValue + x + 1)}
                >
                  {startValue + x + 1}
                </a>
              </li>
            ) : null}
          </>
        ))}
        <li className="page-item">
          <a className="page-link" href="#">
            ...
          </a>
        </li>
        <li className="page-item" onClick={() => changePage(pages)}>
          <a className="page-link" href="#">
            {pages}
          </a>
        </li>
      </>
    );
  }

  return (
    <div className="d-flex justify-content-end ">
      <ul className="pagination">
        <li
          className="page-item"
          onClick={() => (page > 1 ? setPage(page - 1) : null)}
        >
          <a className="page-link" href="#">
            Previous
          </a>
        </li>
        {middlePagination}

        <li
          class="page-item"
          onClick={() => (page < pages ? setPage(page + 1) : null)}
        >
          <a className="page-link" href="#">
            Next
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
