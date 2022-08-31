import { ModalConfirm } from "../../component";

const Delete = ({ loader, onClick }) => {
  return (
    <ModalConfirm
      title="Delete User"
      modalId="modal-vehicle-type-delete"
      confirmButtonText="Ok"
      cancelButtonText="Cancel"
      onClick={onClick}
    >
      <h5>Are you sure ?</h5>
    </ModalConfirm>
  );
};

export default Delete;
