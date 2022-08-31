import { useState } from "react";
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

const Add = () => {
  const dispatch = useDispatch();
  const vehicle_type = useSelector((state) => state.vehicle_types.vehicle_type);
  return (
    <ModalSubmit
      title="Add Material"
      modalId="modal-vehicle-type-add"
      onClick={() => {
        dispatch(createVehicleTypes(vehicle_type))
          .unwrap()
          .then((originalPromiseResult) => {
            toast.warn("Material Added successfully...", { type: "success" });
          })
          .catch((rejectedValueOrSerializedError) => {
            toast.warn("Material Exist !", { type: "error" });
          });
      }}
    >
      <form className="forms-sample">
        <div className="form-group">
          <label for="#"> Vehicle Type</label>
          <input
            type="text"
            className="form-control"
            id="#"
            onChange={(e) => dispatch(setVehicleType(e.target.value))}
            placeholder="Vehicle Name"
          />
        </div>

        <div className="form-group">
          <label for="#"> Vehicle Capacity</label>
          <input
            type="number"
            className="form-control"
            id="#"
            onChange={(e) => dispatch(setCapacity(e.target.value))}
            placeholder="Vehicle Capacity"
          />
        </div>

        <div className="form-group">
          <label for="#"> Body Type</label>
          <input
            type="text"
            className="form-control"
            id="#"
            onChange={(e) => dispatch(setBodyType(e.target.value))}
            placeholder="Body type"
          />
        </div>

        <div className="form-group">
          <label for="#"> Tyre</label>
          <input
            type="number"
            className="form-control"
            id="#"
            onChange={(e) => dispatch(setTyre(e.target.value))}
            placeholder="Tyre"
          />
        </div>

        <div className="form-group">
          <label for="#"> Vehicle Length</label>
          <input
            type="number"
            className="form-control"
            id="#"
            onChange={(e) => dispatch(setLength(e.target.value))}
            placeholder="Vehicle Length"
          />
        </div>
      </form>
    </ModalSubmit>
  );
};

export default Add;
