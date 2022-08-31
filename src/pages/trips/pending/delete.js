import { ModalConfirm } from "../../../component";
// --
const Delete = ({ quote, onClick }) => {
  return (
    <ModalConfirm
      title="Delete User"
      modalId="modal-quote-delete"
      confirmButtonText="Ok"
      cancelButtonText="Cancel"
      onClick={onClick}
    >
      <h5>Are you sure ?</h5>
    </ModalConfirm>
  );
};

export default Delete;
