import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Pagination } from "../../layout";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteValues,
  getValues,
  getSettingById,
} from "../../store/slice/settings";
import View from "./view";
import Add from "./add";
import Edit from "./edit";
import Delete from "./delete";

const Setting = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getValues(+page));
  }, [page]);

  const { values, value, numberOfPage, error_message } = useSelector(
    (state) => state.settings
  );

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
            <h4 className="card-title">Settings</h4>
            <button
              type="button"
              class="btn btn-primary btn-icon-text"
              data-toggle="modal"
              data-target="#modal-setting-add"
            >
              <i class="ti-package btn-icon-prepend"></i>
              Add Value
            </button>

            {/* search bar------------------------ -----------*/}

            {/* <div className="input-group d-flex justify-content-end">
              <span className="input-group-text" id="search">
                <i className="icon-search "></i>
              </span>
              <form className="form-inline my-2 my-lg-0">
                <input
                  className="form-control mr-sm-2 "
                  type="search"
                  placeholder="Search.."
                  aria-label="Search"
                  //   onChange={(e) => dispatch(searchMeterial(e.target.value))}
                />
              </form>
            </div> */}

            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>SI NO</th>
                    <th>Key Name</th>
                    <th>Value</th>
                    <th>Status</th>
                    <th>Created Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {values.map((item, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.key}</td>
                        <td>{item.value}</td>
                        <td>
                          {item.visible ? (
                            <label className="badge badge-success">
                              Visible
                            </label>
                          ) : (
                            <label className="badge badge-danger">
                              Not Visible
                            </label>
                          )}
                        </td>
                        <td>{item.created_date}</td>
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
                              <a
                                className="dropdown-item"
                                href="#"
                                data-toggle="modal"
                                data-target="#modal-setting-details"
                                onClick={() => {
                                  dispatch(getSettingById(item._id));
                                }}
                              >
                                View Details
                              </a>
                              <a
                                className="dropdown-item"
                                href="#"
                                data-toggle="modal"
                                data-target="#modal-setting-edit"
                                onClick={() => {
                                  dispatch(getSettingById(item._id));
                                }}
                              >
                                Edit
                              </a>
                              <a
                                className="dropdown-item"
                                href="#"
                                data-toggle="modal"
                                data-target="#modal-setting-delete"
                                onClick={() => {
                                  dispatch(getSettingById(item._id));
                                }}
                              >
                                Delete
                              </a>
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
          <Pagination
            setPage={setPage}
            page={page}
            pages={numberOfPage}
            changePage={setPage}
          />
        </div>
      </div>
      {/* modal add------------------- */}
      <Add />
      <Edit data={value} />
      <View data={value} />

      <Delete
        onClick={() => {
          dispatch(deleteValues(value._id))
            .unwrap()
            .then((r) => {
              toast.warn("Deleted Successfully...", { type: "success" });
            })
            .catch((e) => {
              toast.warn("Something Wrong !", { type: "error" });
            });
        }}
      />

      {/* {!material || (
        <>
          <View data={material} />
          <Edit data={material} />
          <Delete
            onClick={() => {
              dispatch(deleteMaterial(material._id))
                .unwrap()
                .then((r) => {
                  toast.warn("Deleted Successfuly...", { type: "success" });
                })
                .catch((e) => {
                  toast.warn("Something Wrong !", { type: "error" });
                });
            }}
          />
        </>
      )} */}

      <ToastContainer />
    </div>
  );
};

export default Setting;
