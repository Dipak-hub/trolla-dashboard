import React, { useEffect, useState } from "react";
import { ModalSubmit } from "../../component";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

import {
  updateVehicles,
  setTransporterName,
  setVehicleNumber,
  setBodyType,
  setTyre,
  setCapacity,
  setLength,
  setOwnerName,
  upload_vehicle_rc,
  upload_vehicle_picture,
} from "../../store/slice/vehicles-slice";
import { getAllTransporters } from "../../store/slice/transporters-slice";

const Edit = ({ data: vehicle }) => {
  // store all the vehicle to allVehicle state---------------------

  useEffect(() => {
    dispatch(getAllTransporters());
  }, []);

  // onchange vehicle -------------------------

  const dispatch = useDispatch();
  const { all_transporter } = useSelector((state) => state.transporters);

  const { rc_loading, image_loading } = useSelector((state) => state.vehicles);

  const wheels = [
    {
      id: 1,
      value: "4",
      item: "04",
    },
    {
      id: 2,
      value: "6",
      item: "06",
    },
    {
      id: 3,
      value: "6",
      item: "06",
    },
    {
      id: 4,
      value: "8",
      item: "08",
    },
    {
      id: 5,
      value: "12",
      item: "12",
    },
    {
      id: 6,
      value: "18",
      item: "18",
    },
    {
      id: 7,
      value: "20",
      item: "20",
    },
    {
      id: 8,
      value: "22",
      item: "22",
    },
    {
      id: 9,
      value: "24",
      item: "24",
    },
  ];

  const inputNumber = (e) => {
    const char = String.fromCharCode(e.which);
    if (!/[0-9]/.test(char)) {
      e.preventDefault();
    }
  };

  return (
    <div>
      <ModalSubmit
        title="Edit Vehicle"
        modalId="modal-vehicle-edit"
        size="xl"
        closeButton="modal"
        onClick={() => {
          dispatch(updateVehicles(vehicle))
            .unwrap()
            .then((originalPromiseResult) => {
              toast.warn("Vehicle Updated successfully...", {
                type: "success",
              });
            })
            .catch((rejectedValueOrSerializedError) => {
              toast.warn("Something wrong !", { type: "error" });
            });
        }}
      >
        <form className="forms-sample">
          <div className="row">
            <div className="col-xl-6 col-md-6 col-sm-12">
              <div className="form-group">
                <label for="#" className="font-weight-bold">
                  Transporter Name
                </label>

                <Select
                  id="react-select-tag"
                  isClearable
                  options={all_transporter}
                  // hideSelectedOptions={false}
                  getOptionLabel={(item) => item.user_name}
                  getOptionValue={(item) => item._id}
                  onChange={(e) => dispatch(setTransporterName(e))}
                  value={vehicle?.transporter?.user_name}
                />
              </div>

              <div className="form-group">
                <label for="#" className="font-weight-bold">
                  Vehicle Number
                </label>
                <input
                  type="text"
                  maxLength="2"
                  className="form-control"
                  id="#"
                  value={vehicle.rc_number}
                  placeholder="Vehicle Number"
                  onChange={(e) => dispatch(setVehicleNumber(e.target.value))}
                />
              </div>

              <div className="form-group">
                <label for="#" className="font-weight-bold">
                  Owner Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="#"
                  maxLength="25"
                  minLength="4"
                  value={vehicle.owner_name}
                  placeholder="Owner Name"
                  onChange={(e) => dispatch(setOwnerName(e.target.value))}
                />
              </div>
              <div className="form-group">
                <label for="#" className="font-weight-bold">
                  Body Type
                </label>

                <select
                  className="form-control "
                  onChange={(e) => dispatch(setBodyType(e.target.value))}
                  value={vehicle.body_type}
                >
                  <option className="h5" value="Open">
                    Open
                  </option>
                  <option className="h5 " value="Close">
                    Close
                  </option>
                </select>
                {/* <input
                  type="text"
                  className="form-control"
                  id="#"
                  value={vehicle.body_type}
                  placeholder="Vehicle Type"
                  onChange={(e) => dispatch(setBodyType(e.target.value))}
                  // onChange={(e) =>
                  //   setAllVehicle({
                  //     ...allVehicle,
                  //     vehicle_type: e.target.value,
                  //   })
                  // }
                /> */}
              </div>

              <div className="form-group">
                <label for="#" className="font-weight-bold">
                  Capacity (metric tons)
                </label>
                <input
                  type="text"
                  maxLength="2"
                  className="form-control"
                  id="#"
                  value={vehicle.load_capacity}
                  placeholder="Capacity"
                  onChange={(e) => dispatch(setCapacity(e.target.value))}
                  onKeyPress={(e) => inputNumber(e)}
                  // onChange={(e) =>
                  //   setAllVehicle({
                  //     ...allVehicle,
                  //     capacity: e.target.value,
                  //   })
                  // }
                />
              </div>
            </div>

            <div className="col-xl-6 col-md-6 col-sm-12">
              <div className="form-group">
                <label for="#" className="font-weight-bold">
                  Length (foot)
                </label>
                <input
                  type="text"
                  maxLength="2"
                  className="form-control"
                  id="#"
                  value={vehicle.length}
                  placeholder="Length"
                  onChange={(e) => dispatch(setLength(e.target.value))}
                  onKeyPress={(e) => inputNumber(e)}
                />
              </div>

              <div className="form-group">
                <label for="#" className="font-weight-bold">
                  Wheels
                </label>
                <select
                  className="form-control"
                  onChange={(e) => dispatch(setTyre(e.target.value))}
                  value={vehicle.wheels}
                >
                  {wheels.map((list, index) => {
                    return (
                      <option
                        className="mb-4 h5"
                        value={list.value}
                        key={index}
                      >
                        {list.item}
                      </option>
                    );
                  })}
                </select>
                {/* <input
                  type="number"
                  min="4"
                  className="form-control"
                  id="#"
                  value={vehicle.wheels}
                  onKeyPress={(e) => wheelsType(e)}
                  placeholder="Wheels"
                  onChange={(e) => dispatch(setTyre(e.target.value))}
                /> */}
              </div>

              <div className="form-group">
                <label for="#" className="font-weight-bold">
                  Vehicle RC
                </label>
                <input
                  type="file"
                  maxLength="10"
                  onChange={(e) =>
                    dispatch(upload_vehicle_rc(e.target.files[0]))
                  }
                  className="form-control"
                  id="#"
                />
                <div className="d-flex justify-content-end ">
                  {vehicle?.rc_document ? (
                    <img src={vehicle?.rc_document} width="80" height="50" />
                  ) : (
                    ""
                  )}
                </div>

                {rc_loading ? (
                  <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="form-group">
                <label for="#" className="font-weight-bold">
                  Vehicle Image
                </label>
                <input
                  type="file"
                  onChange={(e) =>
                    dispatch(upload_vehicle_picture(e.target.files[0]))
                  }
                  className="form-control"
                  id="#"
                />
                <div className="d-flex justify-content-end ">
                  {vehicle?.vehicle_image ? (
                    <img src={vehicle?.vehicle_image} width="80" height="50" />
                  ) : (
                    ""
                  )}
                </div>
                {image_loading ? (
                  <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </form>
      </ModalSubmit>
      <ToastContainer />
    </div>
  );
};

export default Edit;
