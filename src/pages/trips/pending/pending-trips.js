import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "../../../layout";
import { UserStatusIndicator } from "../../../component";
import { ToastContainer, toast } from "react-toastify";
import {
  getQuotes,
  getPendingTripsById,
  deleteQuotes,
  searchQuote,
} from "../../../store/slice/pending-trips-slice";
import View from "./view";
import Delete from "./delete";
//
const PendingTrips = () => {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuotes(+page));
  }, [page]);

  const quotes = useSelector((state) => state.pending_trips.pending_trips);
  const quote = useSelector((state) => state.pending_trips.pending_trip);
  const { numberOfPage } = useSelector((state) => state.pending_trips);

  const searchHandle = (e) => {
    dispatch(searchQuote({ key: "load-no", value: searchValue }));
  };

  return (
    <div className="content-wrapper">
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Pending Trips</h4>
            {/* <button type="button" class="btn btn-primary btn-icon-text">
              <i class="ti-package btn-icon-prepend"></i>
              Create Loads
            </button> */}

            {/* search bar --------------------------------> */}
            <div className="search-bar">
              <div className="mt-1 col-sm-offset-0 col-md-offset-0">
                <div className="input-group d-flex justify-content-end ">
                  <div className="">
                    <button className="btn btn-primary mx-2">load no</button>
                  </div>

                  <div className="form-inline my-2 my-lg-0">
                    <input
                      className="form-control mr-sm-2 "
                      type="search"
                      placeholder="Type and hit enter"
                      aria-label="Search"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          searchHandle();
                        }
                      }}
                      onChange={(e) => {
                        setSearchValue(e.target.value);
                        if (e.target.value === "") dispatch(getQuotes(+page));
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>SI NO</th>
                    <th>Load no</th>
                    <th>Loader</th>
                    <th>Status</th>
                    <th>Destination</th>
                    <th>Weight</th>
                    <th>Value</th>
                    {/* <th>Start Date</th>
                    <th>End Date</th> */}
                    <th>Created Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>

                        <td>{item?.load?.load_no}</td>
                        <td>{item?.loader?.user_name}</td>
                        <td>
                          <UserStatusIndicator status={item?.status} />
                        </td>
                        <td style={{ maxWidth: "20vw", overflow: "hidden" }}>
                          {item?.load?.pickup?.address}
                          <br /> <br />
                          To {item?.load?.delivery?.address}
                        </td>
                        <td>{item?.load?.weight}</td>
                        <td>{item?.load?.value}</td>
                        {/* <td>{item?.created_date}</td> */}
                        {/* <td>21-12-2021</td> */}
                        <td>{item?.created_date}</td>
                        <td>
                          <div className="dropdown">
                            <button
                              type="button"
                              className="btn btn-success dropdown-toggle"
                              id="dropdownMenuIconButton9"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i className="ti-package"></i>
                            </button>
                            <div
                              className="dropdown-menu"
                              aria-labelledby="dropdownMenuIconButton9"
                            >
                              {/* <h6 className="dropdown-header">Action</h6> */}
                              <a
                                className="dropdown-item"
                                href="#"
                                data-toggle="modal"
                                data-target="#modal-quotation-view"
                                onClick={(e) => {
                                  dispatch(getPendingTripsById(item?._id));
                                }}
                              >
                                View Details
                              </a>
                              <a className="dropdown-item" href="#">
                                Edit
                              </a>
                              {/* <a
                                className="dropdown-item"
                                href="#"
                                data-toggle="modal"
                                data-target="#modal-quote-delete"
                                onClick={(e) => {
                                  dispatch(getQuote(item?._id));
                                }}
                              >
                                Delete
                              </a> */}
                              {/* <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="#">
                                Verify Details
                              </a> */}
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          {/* pagination ------------ */}
          {numberOfPage && (
            <Pagination
              setPage={setPage}
              page={page}
              pages={numberOfPage}
              changePage={setPage}
            />
          )}
        </div>
      </div>

      {/* CRUD operation  ---------------------*/}
      {!quotes || (
        <>
          <View data={quote} />
          <Delete
            data={quote}
            onClick={() => {
              dispatch(deleteQuotes(quote?._id))
                .unwrap()
                .then((r) => {
                  toast.warn("Deleted Successfully...", { type: "success" });
                })
                .catch((e) => {
                  toast.warn("Something Wrong !", { type: "error" });
                });
            }}
          />
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default PendingTrips;
