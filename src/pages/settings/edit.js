import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ModalSubmit } from "../../component";
import { setKey, setValue, updateValues } from "../../store/slice/settings";

const Edit = () => {
  const dispatch = useDispatch();
  const { value, error_message } = useSelector((state) => state.settings);
  return (
    <ModalSubmit
      title="Edit"
      modalId="modal-setting-edit"
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(updateValues())
          .unwrap()
          .then((r) => {
            toast.warn("Value Updated successfully...", { type: "success" });
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
        <label for="#">Key Name</label>
        <input
          type="text"
          className="form-control"
          id="#"
          value={value?.key}
          disabled="true"
          // onChange={(e) => dispatch(setKey(e.target.value))}
          placeholder="Key Name"
        />
      </div>
      <div className="form-group">
        <label for="#">Value</label>
        <input
          type="text"
          className="form-control"
          id="#"
          value={value?.value}
          onChange={(e) => dispatch(setValue(e.target.value))}
          placeholder="Value"
          required
        />
      </div>
    </ModalSubmit>
  );
};

export default Edit;
