import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getConfirmedTrips,
  getConfirmedTripById,
  searchConfirmedTrip,
} from "../../../store/slice/confirmed-trips-slice";

import { Pagination } from "../../../layout";
import { UserStatusIndicator } from "../../../component";
import View from "./view";
import Edit from "./edit";
import ViewDocuments from "./view-documents";

const ConfirmedTrips = () => {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConfirmedTrips(+page));
  }, [page]);

  const { confirmed_trips, confirmed_trip, numberOfPage } = useSelector(
    (state) => state.confirmed_trips
  );

  const searchHandle = (e) => {
    dispatch(searchConfirmedTrip({ key: "load-no", value: searchValue }));
  };

  return (
    <div className="content-wrapper">
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Confirmed Trips</h4>
            {/* <button type="button" class="btn btn-primary btn-icon-text">
              <i class="ti-package btn-icon-prepend"></i>
              Create Loads
            </button> */}

            {/* search bar --------------------------------> */}
            <div className="search-bar">
              <div className="mt-1 col-sm-offset-0 col-md-offset-0">
                <div className="input-group d-flex justify-content-end ">
                  <div className="">
                    <button
                      className="btn btn-primary mx-2"
                      // onClick={() => dispatch(setSearchTerm("user_name"))}
                    >
                      load no
                    </button>
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
                          dispatch(getConfirmedTrips(+page));
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
                    <th>Transporter</th>
                    <th>Loader</th>
                    <th>Status</th>
                    {/* <th>Quoted Price</th> */}
                    <th>Paid</th>
                    <th>Balance</th>
                    <th>Delivery Date</th>
                    <th>Created Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {confirmed_trips.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        {/* <td>{index + 2}</td> */}
                        <td>{item?.load?.load_no}</td>
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

                        <td>
                          {item?.values?.confirmation_details?.amount || 0}
                          <br></br>
                          <div className="mt-1"></div>
                          payment_id :{" "}
                          {item?.values?.confirmation_details?.payment_id}
                        </td>
                        <td>{item?.values?.closed_details?.amount}</td>

                        <td>{item?.quotation?.delivery_date}</td>
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
                                data-target="#modal-confirmed-view"
                                onClick={(e) => {
                                  dispatch(getConfirmedTripById(item?._id));
                                }}
                              >
                                View Details
                              </a>
                              {/* view documents */}
                              <a
                                className="dropdown-item"
                                href="#"
                                data-toggle="modal"
                                data-target="#modal-confirmed-view-documents"
                                onClick={(e) => {
                                  dispatch(getConfirmedTripById(item?._id));
                                }}
                              >
                                View documents
                              </a>
                              <a
                                className="dropdown-item"
                                href="#"
                                data-toggle="modal"
                                data-target="#modal-confirmed-trip-edit"
                                onClick={(e) => {
                                  dispatch(getConfirmedTripById(item._id));
                                }}
                              >
                                Edit
                              </a>
                              {/* <a className="dropdown-item" href="#">
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
          {/* pagination----------------- */}
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
      {!confirmed_trips || (
        <>
          <View data={confirmed_trip} />
          <ViewDocuments data={confirmed_trip} />
          <Edit data={confirmed_trip} />
        </>
      )}
    </div>
  );
};

export default ConfirmedTrips;
