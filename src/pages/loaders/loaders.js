import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import { UserStatusIndicator } from "../../component";
import {
  getLoaders,
  deleteLoaders,
  getLoaderById,
  searchLoader,
  setSearchTerm,
} from "../../store/slice/loaders-slice";
import { Pagination } from "../../layout";
import View from "./view";
import Edit from "./edit";
import Delete from "./delete";
import Add from "./add";

const Loaders = () => {
  const [page, setPage] = useState(1);
  // const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLoaders(+page));
  }, [page]);

  const { loaders, loader, search_term, error_message, numberOfPage } =
    useSelector((state) => state.loaders);

  const [searchValue, setSearchValue] = useState("");
  const searchHandle = (e) => {
    dispatch(searchLoader(searchValue));
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
            <h4 className="card-title">Loaders</h4>
            <button
              type="button"
              class="btn btn-primary btn-icon-text"
              data-toggle="modal"
              data-target="#modal-loader-add"
            >
              <i class="ti-user btn-icon-prepend"></i>
              Add Loader
            </button>

            {/* search bar --------------------------------> */}
            <div className="search-bar">
              <div className="mt-1 col-sm-offset-0 col-md-offset-0">
                <div className="input-group d-flex justify-content-end ">
                  <div className="">
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
                          ? "btn btn-primary mx-2"
                          : "btn btn-outline-primary mx-2"
                      }
                      onClick={() => dispatch(setSearchTerm("email"))}
                    >
                      {" "}
                      email
                    </button>
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
                        // onChange={(e) => searchHandle(e.target.value)}
                        onChange={(e) => {
                          setSearchValue(e.target.value);
                          if (e.target.value === "")
                            dispatch(getLoaders(+page));
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
                  {loaders.map((item, index) => {
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
                                data-target="#modal-loader-details"
                                onClick={() => {
                                  dispatch(getLoaderById(item?._id));
                                }}
                              >
                                View Details
                              </a>

                              <a
                                className="dropdown-item"
                                href="#"
                                data-toggle="modal"
                                data-target="#modal-loader-edit"
                                onClick={() => {
                                  dispatch(getLoaderById(item?._id));
                                }}
                              >
                                Edit
                              </a>
                              <a
                                className="dropdown-item"
                                href="#"
                                data-toggle="modal"
                                data-target="#modal-loader-delete"
                                onClick={() => {
                                  dispatch(getLoaderById(item?._id));
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

      <Add />
      {/* CURD modal ----------------------------------------------------------- */}
      {!loaders || (
        <>
          <View data={loader} />

          <Edit data={loader} />
          <Delete
            onClick={() => {
              dispatch(deleteLoaders(loader._id))
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

export default Loaders;
