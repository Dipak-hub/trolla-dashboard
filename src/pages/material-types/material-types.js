import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { UserStatusIndicator } from "../../component";
import { Pagination } from "../../layout";
import {
  deleteMaterials,
  getMaterials,
  getMaterialById,
  searchMaterial,
} from "../../store/slice/material-types-slice";
import View from "./view";
import Edit from "./edit";
import Delete from "./delete";
import Add from "./add";

const MaterialTypes = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMaterials(+page));
  }, [page]);

  const { materials, material, numberOfPage, error_message } = useSelector(
    (state) => state.material_types
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
            <h4 className="card-title">Material types</h4>
            <button
              type="button"
              class="btn btn-primary btn-icon-text"
              data-toggle="modal"
              data-target="#modal-material-add"
            >
              <i class="ti-package btn-icon-prepend"></i>
              Add Material
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
                  onChange={(e) => dispatch(searchMaterial(e.target.value))}
                />
              </form>
            </div> */}

            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>SI NO</th>
                    <th>Material Name</th>
                    <th>Status</th>
                    <th>Created Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {materials.map((item, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item?.material_name}</td>
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
                                data-target="#modal-meterial-details"
                                onClick={() => {
                                  dispatch(getMaterialById(item?._id));
                                }}
                              >
                                View Details
                              </a>
                              <a
                                className="dropdown-item"
                                href="#"
                                data-toggle="modal"
                                data-target="#modal-material-edit"
                                onClick={() => {
                                  dispatch(getMaterialById(item?._id));
                                }}
                              >
                                Edit
                              </a>
                              <a
                                className="dropdown-item"
                                href="#"
                                data-toggle="modal"
                                data-target="#modal-material-delete"
                                onClick={() => {
                                  dispatch(getMaterialById(item?._id));
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

      <Add />

      {!material || (
        <>
          <View />
          <Edit />
          <Delete
            onClick={() => {
              dispatch(deleteMaterials(material?._id))
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

export default MaterialTypes;
