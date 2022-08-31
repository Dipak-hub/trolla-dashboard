import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getClosedTrips,
  getClosedTripById,
  searchClosedTrip,
} from "../../../store/slice/closed-trips-slice";
import { Pagination } from "../../../layout";
import { UserStatusIndicator } from "../../../component";
import ViewDocuments from "./view-documents";
import View from "./view";

const ClosedTrips = () => {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClosedTrips(+page));
  }, [page]);
  const { closed_trips, closed_trip, numberOfPage } = useSelector(
    (state) => state.closed_trips
  );

  const searchHandle = (e) => {
    dispatch(searchClosedTrip({ key: "load-no", value: searchValue }));
  };

  return (
    <div className="content-wrapper">
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Closed Trips</h4>
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
                          dispatch(getClosedTrips(+page));
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
                    <th>Transporter</th>
                    <th>Loader</th>
                    <th>Status</th>
                    <th>Destination</th>
                    <th>Total Amount</th>
                    <th>Vehicle Number</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {closed_trips.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item?.load?.load_no}</td>
                        <td>{item?.transporter?.user_name}</td>
                        <td>{item?.loader?.user_name}</td>
                        <td>
                          <UserStatusIndicator status={item?.status} />
                        </td>
                        <td style={{ maxWidth: "20vw", overflow: "hidden" }}>
                          {item?.load?.pickup?.address}- <br></br>
                          {item?.load?.delivery?.address}
                        </td>
                        <td>
                          {item?.values?.confirmation_details?.amount +
                            item?.values?.closed_details?.amount}
                        </td>
                        <td>{item?.vehicle?.rc_number}</td>
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
                                data-target="#modal-close-trip-view"
                                onClick={() => {
                                  dispatch(getClosedTripById(item?._id));
                                }}
                              >
                                View Details
                              </a>
                              <a
                                className="dropdown-item"
                                href="#"
                                data-toggle="modal"
                                data-target="#modal-close-tri-view-documents"
                                onClick={() => {
                                  dispatch(getClosedTripById(item?._id));
                                }}
                              >
                                View Documents
                              </a>
                              <a className="dropdown-item" href="#">
                                View Transaction Details
                              </a>

                              {/* <a className="dropdown-item" href="#">
                                Delete
                              </a>
                              <div className="dropdown-divider"></div>
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
      {/* CRUD ------------------------- */}
      {!closed_trips || (
        <>
          <View data={closed_trip} />
          <ViewDocuments data={closed_trip} />
        </>
      )}
    </div>
  );
};

export default ClosedTrips;
