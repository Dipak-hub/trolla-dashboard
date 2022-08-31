import React from "react";
import { ModalConfirm } from "../../component";

const Delete = ({ driver, onClick }) => {
  return (
    <div>
      <ModalConfirm
        title="Delete driver"
        modalId="modal-driver-delete"
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
