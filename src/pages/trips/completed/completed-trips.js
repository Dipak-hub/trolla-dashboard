import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCompletedTrips,
  getCompletedTripById,
  searchCompletedTrip,
} from "../../../store/slice/completed-trips-slice";
import ViewDocuments from "./view-documents";
import { Pagination } from "../../../layout"; // import pagination custom component
import { UserStatusIndicator } from "../../../component";
import View from "./view";
import Payment from "./payment";

const CompletedTrips = () => {
  const [page, setPage] = useState(1); // set state for initial page number
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    dispatch(getCompletedTrips(+page));
  }, [page]);

  const { is_loading, error, completed_trips, completed_trip, numberOfPage } =
    useSelector((state) => state.completed_trips);

  const searchHandle = (e) => {
    dispatch(searchCompletedTrip({ key: "load-no", value: searchValue }));
  };

  return (
    <div className="content-wrapper">
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Complete trips</h4>
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
                        if (e.target.value === "")
                          dispatch(getCompletedTrips(+page));
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
                    <th>Load No</th>
                    <th>Balance Amount</th>
                    <th>Transporter</th>
                    <th>Loader</th>
                    <th>Status</th>
                    <th>Destination</th>
                    <th>Created Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {completed_trips.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item?.load?.load_no}</td>
                        <td>{item?.values?.closed_details?.amount}</td>
                        <td>
                          {item?.transporter?.user_name}

                          <br></br>
                          <div className="mt-1"></div>
                          {item?.transporter?.mobile_primary}
                        </td>
                        <td>
                          {item?.loader?.user_name}
                          <br></br>
                          <div className="mt-1"></div>
                          {item?.loader?.mobile_primary}
                        </td>

                        <td>
                          <UserStatusIndicator status={item?.status} />
                        </td>
                        <td style={{ maxWidth: "20vw", overflow: "hidden" }}>
                          {item?.load?.pickup?.address} - <br></br>
                          {item?.load?.delivery?.address}
                        </td>
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
                                data-target="#modal-complete-trip-view"
                                onClick={() => {
                                  dispatch(getCompletedTripById(item?._id));
                                }}
                              >
                                View Details
                              </a>

                              <a
                                className="dropdown-item"
                                href="#"
                                data-toggle="modal"
                                data-target="#modal-completed-view-documents"
                                onClick={() => {
                                  dispatch(getCompletedTripById(item?._id));
                                }}
                              >
                                View Documents
                              </a>

                              <a
                                className="dropdown-item"
                                href="#"
                                data-toggle="modal"
                                data-target="#modal-complete-payment-documents"
                                onClick={() => {
                                  dispatch(getCompletedTripById(item?._id));
                                }}
                              >
                                Payment
                              </a>
                              {/* <a className="dropdown-item" href="#">
                                Delete
                              </a> */}
                              {/* <div className="dropdown-divider"></div> */}
                              {/* <a className="dropdown-item" href="#">
                                Location History
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

          {/* // Pagination------------------------------- */}
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
      {!completed_trips || (
        <>
          <View data={completed_trip} />
          <ViewDocuments data={completed_trip} />
          <Payment data={completed_trip} />
        </>
      )}
    </div>
  );
};

export default CompletedTrips;
