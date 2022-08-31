import { useState } from "react";
import Select from "react-select";
import { ModalSubmit } from "../../component";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  createVehicleTypes,
  setVehicleType,
  setBodyType,
  setCapacity,
  setLength,
  setTyre,
} from "../../store/slice/vehicle-types-slice";
import { bodyTypes, wheelTypes } from "../../constants";

const Add = () => {
  const dispatch = useDispatch();
  const { success, vehicle_type, error_message } = useSelector(
    (state) => state.vehicle_types
  );

  return (
    <ModalSubmit
      title="Add Vehicle Type"
      modalId="modal-vehicle-type-add"
      closeButton={success ? "modal" : ""}
      disableButton={
        vehicle_type.vehicle_type &&
        vehicle_type.capacity &&
        vehicle_type.tyre &&
        vehicle_type.body_type
          ? false
          : true
      }
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(createVehicleTypes())
          .unwrap()
          .then((r) => {
            toast.warn("Vehicle Type Added successfully...", {
              type: "success",
            });
          })
          .catch((error) => {
            toast.warn(error?.message, { type: "error" });
          });
      }}
    >
      {error_message && (
        <div className="alert alert-info" role="alert">
          <span>{error_message}</span>
        </div>
      )}
      <div className="form-group">
        <label for="#"> Vehicle Type</label>
        <input
          type="text"
          maxLength="30"
          className="form-control"
          id="#"
          onChange={(e) => dispatch(setVehicleType(e.target.value))}
          placeholder="Vehicle Type"
          required
        />
      </div>

      <div className="form-group">
        <label for="#"> Capacity (metric tons)</label>
        <input
          type="text"
          minLength="1"
          maxLength="3"
          className="form-control"
          id="#"
          onChange={(e) => dispatch(setCapacity(e.target.value))}
          placeholder="Vehicle Capacity"
          required
        />
      </div>

      <div className="form-group">
        <label for="#"> Body Type</label>

        {/* <select
          className="form-control "
          onChange={(e) => dispatch(setBodyType(e.target.value))}
          required
        >
          <option value="Open">Open</option>
          <option value="Close">Close</option>
        </select> */}
        <Select
          id="react-select-tag"
          isClearable
          options={bodyTypes}
          hideSelectedOptions={false}
          defaultValue={{
            label: bodyTypes[0].label,
            value: bodyTypes[0].value,
          }}
          getOptionLabel={(item) => item.value}
          getOptionValue={(item) => ({ value: item.value })}
          onChange={(e) => dispatch(setBodyType(e.value))}
          required
        />
      </div>

      <div className="form-group">
        <label for="#"> Wheels</label>

        <select
          className="form-control"
          onChange={(e) => dispatch(setTyre(e.target.value))}
          required
        >
          {wheelTypes.map((list, index) => {
            return (
              <option className="py-3" value={list.value} key={index}>
                {list.item}
              </option>
            );
          })}
        </select>
      </div>

      <div className="form-group">
        <label for="#"> Vehicle Length (foot)</label>
        <input
          type="text"
          maxLength="3"
          className="form-control"
          id="#"
          onChange={(e) => dispatch(setLength(e.target.value))}
          placeholder="Vehicle Length"
          required
        />
      </div>
    </ModalSubmit>
  );
};

export default Add;
