import { useState, useEffect } from "react";
import { ModalSubmit } from "../../component";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import { updateLoads } from "../../store/slice/loads-slice";

const Edit = ({ data: load }) => {
  const dispatch = useDispatch();

  const update_load = useSelector((state) => state.loads.load);

  return (
    <ModalSubmit
      title="Edit Load"
      modalId="modal-load-edit"
      onClick={() => {
        dispatch(updateLoads(update_load))
          .unwrap()
          .then((originalPromiseResult) => {
            toast.warn("Load Updated successfully...", { type: "success" });
          })
          .catch((rejectedValueOrSerializedError) => {
            toast.warn("Something wrong !", { type: "error" });
          });
      }}
    >
      <form className="forms-sample">
        <div className="form-group">
          <label for="#"> Pickup Person Number</label>
          <input
            type="text"
            className="form-control"
            id="#"
            value={load?.pickup?.contact_number}
            // onChange={(e) => dispatch(setVehicleType(e.target.value))}
            // placeholder="Vihecle Name"
          />
        </div>

        <div className="form-group">
          <label for="#"> Delivery Person Number</label>
          <input
            type="number"
            className="form-control"
            id="#"
            value={load?.delivery?.contact_number}
            // onChange={(e) => dispatch(setCapacity(e.target.value))}
            // placeholder="Vihecle Capacity"
          />
        </div>

        <div className="form-group">
          <label for="#"> Weight</label>
          <input
            type="text"
            className="form-control"
            id="#"
            value={load.weight}
            // onChange={(e) => dispatch(setBodyType(e.target.value))}
            // placeholder="Body type"
          />
        </div>

        <div className="form-group">
          <label for="#"> Pickup Date</label>
          <input
            type="text"
            className="form-control"
            id="#"
            value={load?.pickup_date}
            // onChange={(e) => dispatch(setTyre(e.target.value))}
            // placeholder="Tyre"
          />
        </div>

        <div className="form-group">
          <label for="#"> EED</label>
          <input
            type="text"
            className="form-control"
            id="#"
            value={load?.expected_delivery_date}
            // onChange={(e) => dispatch(setLength(e.target.value))}
            // placeholder="Vehicle Length"
          />
        </div>

        {/* <div class="form-check form-check-flat form-check-primary">
          <label class="form-check-label">
            <input
              type="checkbox"
              defaultChecked={load.consigment_insured}
              class="form-check-input"
            />
            EED
            <i class="input-helper"></i>
          </label>
        </div> */}
      </form>
    </ModalSubmit>
  );
};

export default Edit;
