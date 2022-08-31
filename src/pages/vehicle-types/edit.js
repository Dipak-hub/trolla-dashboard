import { useState, useEffect } from "react";
import Select from "react-select";
import { ModalSubmit } from "../../component";
import {
  setVehicleType,
  updateVehicleTypes,
  setLength,
  setTyre,
  setBodyType,
  setCapacity,
} from "../../store/slice/vehicle-types-slice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { bodyTypes, wheelTypes } from "../../constants";

const Edit = () => {
  const dispatch = useDispatch();

  const { vehicle_type } = useSelector((state) => state.vehicle_types);

  return (
    <ModalSubmit
      title="Edit Vehicle Type"
      modalId="modal-vehicle-type-edit"
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(updateVehicleTypes())
          .unwrap()
          .then((r) => {
            toast.warn("Vehicle type Updated successfully...", {
              type: "success",
            });
          })
          .catch((e) => {
            toast.warn(e?.message, { type: "error" });
          });
      }}
    >
      <div className="form-group">
        <label for="#"> Vehicle Type</label>
        <input
          type="text"
          className="form-control"
          id="#"
          disabled="true"
          value={vehicle_type.vehicle_type}
          // onChange={(e) => dispatch(setVehicleType(e.target.value))}
          placeholder="Vehicle Name"
        />
      </div>

      <div className="form-group">
        <label for="#"> Vehicle Capacity</label>
        <input
          type="number"
          className="form-control"
          minLength="1"
          maxLength="3"
          id="#"
          value={vehicle_type?.capacity || ""}
          onChange={(e) => dispatch(setCapacity(e.target.value))}
          placeholder="Vehicle Capacity"
        />
      </div>

      <div className="form-group">
        <label for="#"> Body Type</label>
        {/* 
        <select
          className="form-control "
          // defaultChecked={vehicle_type?.body_type || ""}
          defaultChecked="hell"
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
          // defaultValue={{
          //   label: vehicle_type?.body_type || "",
          //   value: vehicle_type?.body_type || "",
          // }}
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
          defaultValue={vehicle_type?.tyre || ""}
          defaultChecked={vehicle_type?.tyre || ""}
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
          value={vehicle_type?.length || ""}
          onChange={(e) => dispatch(setLength(e.target.value))}
          placeholder="Vehicle Length"
          required
        />
      </div>
    </ModalSubmit>
  );
};

export default Edit;
