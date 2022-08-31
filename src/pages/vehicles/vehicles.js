import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Pagination } from "../../layout";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteVehicles,
  getVehicles,
  getVehicleById,
  searchVehicle,
  setSearchTerm,
} from "../../store/slice/vehicles-slice";
import { UserStatusIndicator } from "../../component";
import ViewDocuments from "./view-documents";
import Edit from "./edit";
import Add from "./add";
import View from "./view";
import Delete from "./delete";

const Vehicles = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVehicles(+page));
  }, [page]);

  const { vehicles, vehicle, numberOfPage, search_term } = useSelector(
    (state) => state.vehicles
  );

  const [searchValue, setSearchValue] = useState("");
  const searchHandle = (e) => {
    dispatch(searchVehicle(searchValue));
  };

  return (
    <div className="content-wrapper">
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Vehicles</h4>

            <button
              type="button"
              class="btn btn-primary btn-icon-text"
              data-toggle="modal"
              data-target="#modal-vehicle-add"
            >
              <i class="ti-truck btn-icon-prepend"></i>
              Add Vehicle
            </button>

            {/* search bar --------------------------------> */}
            <div className="input-group d-flex justify-content-end ">
              <div>
                <button
                  className={
                    search_term === "rc_number"
                      ? "btn btn-primary mx-2"
                      : "btn btn-outline-primary mx-2"
                  }
                  onClick={() => dispatch(setSearchTerm("rc_number"))}
                >
                  rc number
                </button>
                {/* <button
                  className={
                    searchTerms === "user_name"
                      ? "btn btn-primary mx-2"
                      : "btn btn-outline-primary mx-2"
                  }
                  onClick={() => dispatch(setSearchTerm("user_name"))}
                >
                  name
                </button> */}
              </div>

              <span className="input-group-text" id="search">
                <i className="icon-search "></i>
              </span>
              <div className="form-inline my-2 my-lg-0">
                {search_term && (
                  <input
                    className="form-control mr-sm-2 "
                    type="search"
                    placeholder="Type and hit enter"
                    aria-label="Search"
                    // onChange={(e) => searchHandle(e.target.value)}
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                      if (e.target.value === "") dispatch(getVehicles(+page));
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        searchHandle();
                      }
                    }}
                  />
                )}
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Sl NO</th>
                    <th>Transporter</th>
                    <th>Registration Number</th>
                    <th>Body type</th>
                    <th>Wheels</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* filter((item) => (item?.transporter?.user_name.toLowerCase().includes(search.toLocaleLowerCase()) ||
                    item?.rc_number.toLowerCase().includes(search.toLocaleLowerCase())
                  )) */}

                  {vehicles.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item?.transporter?.user_name}</td>
                        <td>{item?.rc_number}</td>
                        <td>{item?.body_type}</td>
                        <td>{item?.wheels}</td>
                        <td>
                          <UserStatusIndicator status={item?.status} />
                        </td>
                        <td>{item?.createdAt}</td>
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
                              <i className="ti-truck"></i>
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
                                data-target="#modal-vehicle-view"
                                onClick={() => {
                                  dispatch(getVehicleById(item?._id));
                                }}
                              >
                                View Details
                              </a>

                              <a
                                className="dropdown-item"
                                href="#"
                                data-toggle="modal"
                                data-target="#modal-vehicle-documents-view"
                                onClick={() => {
                                  dispatch(getVehicleById(item?._id));
                                }}
                              >
                                View Documents
                              </a>
                              <a
                                className="dropdown-item"
                                href="#"
                                data-toggle="modal"
                                data-target="#modal-vehicle-edit"
                                onClick={() => {
                                  dispatch(getVehicleById(item?._id));
                                }}
                              >
                                Edit
                              </a>
                              <a
                                className="dropdown-item"
                                href="#"
                                data-toggle="modal"
                                data-target="#modal-vehicle-delete"
                                onClick={() => {
                                  dispatch(getVehicleById(item?._id));
                                }}
                              >
                                Delete
                              </a>
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

      {/* CRUD vehicle modal--------------------------- */}

      <Add />
      {!vehicle || (
        <>
          <View data={vehicle} />
          <ViewDocuments data={vehicle} />
          <Add />
          <Edit data={vehicle} />
          {/* <Edit data={loader} /> */}
          <Delete
            onClick={() => {
              dispatch(deleteVehicles(vehicle?._id))
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

export default Vehicles;
