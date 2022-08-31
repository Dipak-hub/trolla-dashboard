import { useState, useEffect } from "react";
import { ModalSubmit } from "../../component";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  setMaterialName,
  updateMaterials,
} from "../../store/slice/material-types-slice";

const Edit = ({ data }) => {
  const dispatch = useDispatch();

  const { material, error_message } = useSelector(
    (state) => state.material_types
  );

  return (
    <ModalSubmit
      title="Edit Material"
      modalId="modal-material-edit"
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(updateMaterials())
          .unwrap()
          .then((r) => {
            toast.warn("Material Updated successfully...", { type: "success" });
          })
          .catch((end) => {
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
        <label for="#">Material Name</label>
        <input
          type="text"
          className="form-control"
          id="#"
          disabled="true"
          value={material?.material_name}
          placeholder="Material Name"
          onChange={(e) => dispatch(setMaterialName(e.target.value))}
        />
      </div>
    </ModalSubmit>
  );
};

export default Edit;
