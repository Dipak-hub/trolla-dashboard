import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ModalSubmit } from "../../component";
import { createValues, setKey, setValue } from "../../store/slice/settings";
const Add = () => {
  const dispatch = useDispatch();
  const { error_message } = useSelector((state) => state.settings);
  return (
    <ModalSubmit
      title="Add Value"
      modalId="modal-setting-add"
      // modalClose="modal"
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(createValues())
          .unwrap()
          .then((r) => {
            toast.warn("Value Added successfully...", {
              type: "success",
            });
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
          maxLength="20"
          className="form-control"
          id="#"
          onChange={(e) => dispatch(setKey(e.target.value))}
          placeholder="Key Name"
          required
        />
      </div>
      <div className="form-group">
        <label for="#">Value</label>
        <input
          type="text"
          maxLength="100"
          className="form-control"
          id="#"
          onChange={(e) => dispatch(setValue(e.target.value))}
          placeholder="Value"
          required
        />
      </div>
    </ModalSubmit>
  );
};

export default Add;
