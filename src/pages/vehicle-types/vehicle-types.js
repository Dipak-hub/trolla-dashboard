import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { UserStatusIndicator } from "../../component";
import {
  deleteVehicleTypes,
  getVehicleTypes,
  setVehicleTypeName,
  updateVehicleType,
  getVehicleTypeById,
  searchVehicleTypes,
} from "../../store/slice/vehicle-types-slice";
import { Pagination } from "../../layout";
import View from "./view";
import Edit from "./edit";
import Delete from "./delete";
import Add from "./add";

const VehicleType = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVehicleTypes(+page));
  }, [page]);

  const { numberOfPage, vehicle_type, vehicle_types, error_message } =
    useSelector((state) => state.vehicle_types);

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
            <h4 className="card-title">Vehicle types</h4>
            <button
              type="button"
              class="btn btn-primary btn-icon-text"
              data-toggle="modal"
              data-target="#modal-vehicle-type-add"
            >
              <i class="ti-truck btn-icon-prepend"></i>
              Add Vehicle type
            </button>

            {/* search bar ------------------*/}
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
                  onChange={(e) => dispatch(searchVehicleTypes(e.target.value))}
                />
                <button
                  className="btn btn-outline-success my-2 my-sm-0"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </div> */}

            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>SI NO</th>
                    <th>Vehicle Type</th>
                    <th>Capacity</th>
                    <th>Body type</th>
                    <th>Tyre</th>
                    <th>Length</th>
                    <th>Status</th>
                    <th>Created Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicle_types.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.vehicle_type}</td>
                        <td>{item.capacity}</td>
                        <td>{item.body_type}</td>
                        <td>{item.tyre}</td>
                        <td>{item.length} FT</td>
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
                        <td>{item.createdAt}</td>
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
                                data-target="#modal-vehicle-type-details"
                                onClick={() => {
                                  dispatch(getVehicleTypeById(item._id));
                                }}
                              >
                                View Details
                              </a>
                              <a
                                className="dropdown-item"
                                href="#"
                                data-toggle="modal"
                                data-target="#modal-vehicle-type-edit"
                                onClick={() => {
                                  dispatch(getVehicleTypeById(item._id));
                                }}
                              >
                                Edit
                              </a>
                              <a
                                className="dropdown-item"
                                href="#"
                                data-toggle="modal"
                                data-target="#modal-vehicle-type-delete"
                                onClick={() => {
                                  dispatch(getVehicleTypeById(item._id));
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
          {/* // Pagination------------------------------- */}
          <Pagination
            setPage={setPage}
            page={page}
            pages={numberOfPage}
            changePage={setPage}
          />
        </div>
      </div>

      <Add />
      {!vehicle_type || (
        <>
          <View data={vehicle_type} />
          <Edit />
          <Delete
            onClick={() => {
              dispatch(deleteVehicleTypes(vehicle_type._id))
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

export default VehicleType;
