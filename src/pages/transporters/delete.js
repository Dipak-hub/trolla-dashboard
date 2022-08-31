import React from "react";
import { ModalConfirm } from "../../component";

const Delete = ({ transporter, onClick }) => {
  return (
    <div>
      <ModalConfirm
        title="Delete User"
        modalId="modal-transporter-delete"
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
