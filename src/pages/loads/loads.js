import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  deleteLoads,
  getLoads,
  getLoadById,
  searchLoad,
  setSearchLoadTerm,
} from "../../store/slice/loads-slice";
import { Pagination } from "../../layout";
import View from "./view";
import Edit from "./edit";
import Delete from "./delete";
import Map from "./map";

const Loads = () => {
  const [page, setPage] = useState(1);
  // const [term, setTerm] = useState([]);
  // const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoads(+page));
  }, [page]);

  const { loads, load, numberOfPage, search_term } = useSelector(
    (state) => state.loads
  );

  const [searchValue, setSearchValue] = useState("");
  const searchHandle = (e) => {
    dispatch(searchLoad(searchValue));
  };

  return (
    <div className="content-wrapper">
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Loads</h4>

            {/* search bar------------------------ -----------*/}

            <div className="input-group d-flex justify-content-end">
              <div>
                <button
                  className={
                    search_term === "load_no"
                      ? "btn btn-primary"
                      : "btn btn-outline-primary"
                  }
                  onClick={() => dispatch(setSearchLoadTerm("load_no"))}
                >
                  load no
                </button>
                <button
                  className={
                    search_term === "user_name"
                      ? "btn btn-primary mx-2"
                      : "btn btn-outline-primary mx-2"
                  }
                  onClick={() => dispatch(setSearchLoadTerm("user_name"))}
                >
                  loader name
                </button>
              </div>

              {/* <span className="input-group-text" id="search">
                <i className="icon-search "></i>
              </span> */}

              <div className="form-inline my-2 my-lg-0">
                <input
                  className="form-control mr-sm-2 "
                  type="search"
                  placeholder="type and hit enter"
                  aria-label="Search"
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                    if (e.target.value === "") dispatch(getLoads(+page));
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      searchHandle();
                    }
                  }}
                />
              </div>
            </div>

            {/* <button
              type="button"
              class="btn btn-primary btn-icon-text"
              data-toggle="modal"
              data-target="#modal-loads-add"
            >
              <i class="ti-truck btn-icon-prepend"></i>
              Add Loads
            </button> */}

            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>SI NO</th>
                    <th>Load no</th>
                    <th>Loader</th>
                    <th>Vehicle</th>
                    <th>Material</th>
                    <th>Weight</th>
                    <th>Status</th>
                    <th>Pickup Date</th>
                    <th>EDD</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loads.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item?.load_no}</td>
                        <td>{item?.loader?.user_name}</td>
                        <td>{item?.vehicle_type}</td>
                        <td>{item?.material_type}</td>
                        <td>{item?.weight}</td>
                        <td>
                          {item?.visible ? (
                            <label className="badge badge-success">
                              Visible
                            </label>
                          ) : (
                            <label className="badge badge-danger">
                              Not Visible
                            </label>
                          )}
                        </td>
                        <td>{item?.created_date}</td>
                        <td>{item?.expected_delivery_date}</td>
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
                                data-target="#modal-load-details"
                                onClick={() => {
                                  dispatch(getLoadById(item?._id));
                                }}
                              >
                                View Details
                              </a>

                              <a
                                className="dropdown-item"
                                href="#"
                                data-toggle="modal"
                                data-target="#modal-load-map"
                                onClick={() => {
                                  dispatch(getLoadById(item?._id));
                                }}
                              >
                                Map
                              </a>
                              <a
                                className="dropdown-item"
                                href="#"
                                data-toggle="modal"
                                data-target="#modal-load-edit"
                                onClick={() => {
                                  dispatch(getLoadById(item?._id));
                                }}
                              >
                                Edit
                              </a>
                              <a
                                className="dropdown-item"
                                href="#"
                                data-toggle="modal"
                                data-target="#modal-load-delete"
                                onClick={() => {
                                  dispatch(getLoadById(item?._id));
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

      {!loads || (
        <>
          {/* <Add />  */}
          <View data={load} />
          <Map data={load} />

          <Edit data={load} />
          <Delete
            onClick={() => {
              dispatch(deleteLoads(load?._id))
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

export default Loads;
