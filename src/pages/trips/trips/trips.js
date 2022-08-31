import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserStatusIndicator } from "../../../component";
import { Pagination } from "../../../layout";
import ViewDocuments from "./view-documents";
import View from "./view";
import Map from "./map";
import {
  getTrips,
  getTripById,
  searchTrip,
} from "../../../store/slice/trips-slice";

const BookingTrip = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1); // set state for initial page number
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    dispatch(getTrips(+page));
  }, [page]);

  const { trips, trip, is_loading, numberOfPage } = useSelector(
    (state) => state.trips
  );

  const searchHandle = (e) => {
    dispatch(searchTrip({ key: "load-no", value: searchValue }));
  };

  return (
    <div className="content-wrapper">
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">All Trips</h4>

            <div className="search-bar">
              <div className="mt-1 col-sm-offset-0 col-md-offset-0">
                <div className="input-group d-flex  justify-content-start">
                  {/* <div className="">
                    <button className="btn btn-primary mx-2">load no</button>
                  </div> */}

                  <div
                    className="form-inline my-2 my-lg-0 "
                    style={{ width: "18%" }}
                  >
                    {/* <h6>Type load no and hit Enter</h6> */}
                    <input
                      className="form-control mr-sm-2 w-100"
                      type="search"
                      placeholder="Type load no and hit Enter"
                      aria-label="Search"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          searchHandle();
                        }
                      }}
                      onChange={(e) => {
                        setSearchValue(e.target.value);
                        if (e.target.value === "") dispatch(getTrips(+page));
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="table-responsive mt-5">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>SI NO</th>
                    <th>Load No</th>
                    <th>Transporter</th>
                    <th>Status</th>
                    <th>Loader</th>
                    <th>Destination</th>

                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {trips.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item?.load?.load_no}</td>
                        <td>{item?.transporter?.user_name}</td>
                        <td>
                          <UserStatusIndicator status={item?.status} />
                        </td>
                        <td>{item?.loader?.user_name}</td>

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
                                data-target="#modal-booking-view"
                                onClick={() => {
                                  dispatch(getTripById(item?._id));
                                }}
                              >
                                View Details
                              </a>
                              <a
                                className="dropdown-item"
                                href="#"
                                data-toggle="modal"
                                data-target="#modal-booking-view-documents"
                                onClick={() => {
                                  dispatch(getTripById(item?._id));
                                }}
                              >
                                View Documents
                              </a>
                              {item?.status === "Ongoing" ? (
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  data-toggle="modal"
                                  data-target="#modal-booking-view-map"
                                  onClick={() => {
                                    dispatch(getTripById(item?._id));
                                  }}
                                >
                                  Map
                                </a>
                              ) : (
                                ""
                              )}
                              {/* <a className="dropdown-item" href="#">
                                Delete
                              </a> */}
                              {/* <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="#">
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

      {/* use modal------------> */}

      {!trips || (
        <>
          <View data={trip} />
          <ViewDocuments data={trip} />
          <Map data={trip} />
        </>
      )}
    </div>
  );
};

export default BookingTrip;
