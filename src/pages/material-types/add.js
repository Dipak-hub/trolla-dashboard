import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ModalSubmit } from "../../component";
import { ToastContainer, toast } from "react-toastify";
import {
  createMaterials,
  setMaterialName,
} from "../../store/slice/material-types-slice";

const Add = () => {
  const dispatch = useDispatch();

  const { error_message } = useSelector((state) => state.material_types);
  return (
    <ModalSubmit
      title="Add Material"
      modalId="modal-material-add"
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(createMaterials())
          .unwrap()
          .then((r) => {
            toast.warn("Material Added successfully...", { type: "success" });
          })
          .catch((e) => {
            toast.warn(e?.message, { type: "error" });
          });
      }}
    >
      {error_message && (
        <div className="alert alert-info" role="alert">
          <span>{error_message}</span>
        </div>
      )}

      <div className="form-group">
        <label for="#">Unique Material Name</label>
        <input
          type="text"
          minLength="2"
          maxLength="20"
          className="form-control"
          id="#"
          onChange={(e) => dispatch(setMaterialName(e.target.value))}
          placeholder="Material Name"
          required
        />
      </div>
    </ModalSubmit>
  );
};

export default Add;
