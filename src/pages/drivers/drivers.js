import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserStatusIndicator } from "../../component";
import { ToastContainer, toast } from "react-toastify";
import {
  getDrivers,
  getDriver,
  deleteDriver,
  setSearchTerm,
  searchDriver,
  getDriverById,
} from "../../store/slice/drivers-slice";
import { Pagination } from "../../layout";
import Add from "./add";
import View from "./view";
import Delete from "./delete";
import Edit from "./edit";

const Drivers = () => {
  const [page, setPage] = useState(1); // set page number for pagination
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDrivers(+page));
  }, [page]);

  const { drivers, driver, numberOfPage, search_term, error_message } =
    useSelector((state) => state.drivers);

  const [searchValue, setSearchValue] = useState("");
  const searchHandle = (e) => {
    dispatch(searchDriver(searchValue));
  };

  return (
    <div className="content-wrapper">
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            {error_message && (
              <div className="alert alert-info" role="alert">
                <span>{error_message}</span>
              </div>
            )}
            <h4 className="card-title">Drivers</h4>
            <button
              type="button"
              class="btn btn-primary btn-icon-text"
              data-toggle="modal"
              data-target="#modal-driver-add"
            >
              <i class="ti-user btn-icon-prepend"></i>
              Add Driver
            </button>

            {/* search bar --------------------------------> */}
            <div className="input-group d-flex justify-content-end ">
              <div>
                <button
                  className={
                    search_term === "user_name"
                      ? "btn btn-primary"
                      : "btn btn-outline-primary"
                  }
                  onClick={() => dispatch(setSearchTerm("user_name"))}
                >
                  name
                </button>
                <button
                  className={
                    search_term === "mobile_primary"
                      ? "btn btn-primary mx-2"
                      : "btn btn-outline-primary mx-2"
                  }
                  onClick={() => dispatch(setSearchTerm("mobile_primary"))}
                >
                  mobile number
                </button>
                {/* <button className={searchTerms === 'email' ? "btn btn-primary mx-2" : "btn btn-outline-primary mx-2"} onClick={() => dispatch(setSearchTerm('email'))}> email</button> */}
              </div>

              {/* <span className="input-group-text" id="search">
                <i className="icon-search "></i>
              </span> */}
              <div className="form-inline my-2 my-lg-0">
                {search_term && (
                  <input
                    className="form-control mr-sm-2 "
                    type="search"
                    placeholder="Type and hit Enter"
                    aria-label="Search"
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                      if (e.target.value === "") dispatch(getDrivers(+page));
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
                    <th>SI NO</th>
                    <th>Transporter</th>
                    <th>Driver Name</th>
                    <th>Mobile (ID)</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {drivers &&
                    drivers.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item?.transporter?.user_name}</td>
                          <td>{item?.user_name}</td>
                          <td>{item?.mobile_primary}</td>
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
                                <i className="ti-user"></i>
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
                                  data-target="#modal-driver-view"
                                  onClick={() => {
                                    dispatch(getDriverById(item?._id));
                                  }}
                                >
                                  View Details
                                </a>

                                <a
                                  className="dropdown-item"
                                  href="#"
                                  data-toggle="modal"
                                  data-target="#modal-driver-edit"
                                  onClick={() => {
                                    dispatch(getDriverById(item?._id));
                                  }}
                                >
                                  Edit
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  data-toggle="modal"
                                  data-target="#modal-driver-delete"
                                  onClick={() => {
                                    dispatch(getDriverById(item?._id));
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
      {/*  CRUD Modal-------------------------------------- */}
      <Add />
      {!drivers || (
        <>
          <View data={driver} />
          <Add />
          <Edit />
          <Delete
            onClick={() => {
              dispatch(deleteDriver(driver._id))
                .unwrap()
                .then((r) => {
                  toast.warn("Deleted...", { type: "success" });
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

export default Drivers;
