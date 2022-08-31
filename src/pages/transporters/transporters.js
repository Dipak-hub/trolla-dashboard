import React, { useEffect, useState } from "react";
import { UserStatusIndicator } from "../../component";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  getTransporters,
  createTransporters,
  deleteTransporters,
  changeTransporterStatus,
  getTransporterById,
  searchTransporter,
  setSearchTerm,
} from "../../store/slice/transporters-slice";
// import { getAllTransporter } from "../../store/slice/pagination-slice";
import { Pagination } from "../../layout";
import Add from "./add";
import View from "./view";
import Edit from "./edit";
import Delete from "./delete";

const Transporters = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const {
    transporters,
    numberOfPage,
    transporter,
    search_term,
    error_message,
  } = useSelector((state) => state.transporters);

  useEffect(() => {
    dispatch(getTransporters(+page));
  }, [page]);

  const [searchValue, setSearchValue] = useState("");
  const searchHandle = (e) => {
    dispatch(searchTransporter(searchValue));
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
            <h4 className="card-title">Transporters</h4>
            <button
              type="button"
              class="btn btn-primary btn-icon-text"
              data-toggle="modal"
              data-target="#modal-transport-add"
            >
              <i class="ti-user btn-icon-prepend"></i>
              Add Transporter
            </button>

            {/* search bar --------------------------------> */}
            <div className="search-bar">
              <div className="mt-1 col-sm-offset-0">
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
                      number
                    </button>

                    <button
                      className={
                        search_term === "email"
                          ? "btn btn-primary mx-2 "
                          : "btn btn-outline-primary mx-2"
                      }
                      onClick={() => dispatch(setSearchTerm("email"))}
                    >
                      {" "}
                      email
                    </button>
                  </div>

                  <div className="form-inline my-2 my-lg-0 ">
                    {/* <span className="input-group-text" id="search">
                      <i className="icon-search "></i>
                    </span> */}
                    {search_term && (
                      <input
                        className="form-control mr-sm-2 "
                        type="search"
                        placeholder="Type and hit Enter"
                        aria-label="Search"
                        onChange={(e) => {
                          setSearchValue(e.target.value);
                          if (e.target.value === "")
                            dispatch(getTransporters(+page));
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
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>SI NO</th>
                    <th>Name</th>
                    <th>Mobile (ID)</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {transporters.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
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
                                data-target="#modal-transporter-view"
                                onClick={() => {
                                  dispatch(getTransporterById(item?._id));
                                }}
                              >
                                View Details
                              </a>

                              <a
                                className="dropdown-item"
                                href="#"
                                data-toggle="modal"
                                data-target="#modal-transporter-edit"
                                onClick={() => {
                                  dispatch(getTransporterById(item?._id));
                                }}
                              >
                                Edit
                              </a>
                              <a
                                className="dropdown-item"
                                href="#"
                                data-toggle="modal"
                                data-target="#modal-transporter-delete"
                                onClick={() => {
                                  dispatch(getTransporterById(item?._id));
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

      {/* CRUD operation  ---------------------*/}
      {!transporters || (
        <>
          <Add />
          <View data={transporter} />
          <Edit data={transporter} />
          <Delete
            data={transporter}
            onClick={() => {
              dispatch(deleteTransporters(transporter._id))
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

export default Transporters;
