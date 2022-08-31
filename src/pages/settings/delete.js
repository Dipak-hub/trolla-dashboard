import React from "react";
import { ModalConfirm } from "../../component";

const Delete = ({ onClick }) => {
  return (
    <ModalConfirm
      title="Delete User"
      modalId="modal-setting-delete"
      confirmButtonText="Ok"
      cancelButtonText="Cancel"
      onClick={onClick}
    >
      <h5>Are you sure ?</h5>
    </ModalConfirm>
  );
};

export default Delete;
