import React from "react";
import { ModalConfirm } from "../../component";

const Delete = ({ vehicle, onClick }) => {
  return (
    <div>
      <ModalConfirm
        title="Delete User"
        modalId="modal-vehicle-delete"
        confirmButtonText="Ok"
        cancelButtonText="Cancel"
        onClick={onClick}
      >
        <h5>Are you sure ?</h5>
      </ModalConfirm>
    </div>
  );
};

export default Delete;
