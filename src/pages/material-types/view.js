import { Link } from "react-router-dom";
import { ModalView, VisibleStatusUpdater } from "../../component";
import { changeMaterialStatus } from "../../store/slice/material-types-slice";

const View = ({ data: material }) => {
  return (
    <ModalView
      title="Loader Details"
      modalId="modal-material-details"
      cancelButtonText="Ok"
    >
      <div className="form-group">
        <VisibleStatusUpdater
          bootstapId="status-changer-2"
          status={material?.visible}
          id={material?._id}
          changeStatus={changeMaterialStatus}
        />
      </div>
      {/* <ul className="list-group list-group-flush">
        <li className="list-group-item">
          Material Name : {material.user_name}
        </li>
        <li className="list-group-item">
          Mobile Primary : {loader.mobile_primary}
        </li>
        <li className="list-group-item">
          Mobile Secondary : {loader.mobile_secondary}
        </li>
        <li className="list-group-item">Email : {loader.email}</li>
        <li className="list-group-item">Address : {loader.address}</li>
        <li className="list-group-item">
          ID Proof :{" "}
          <a
            target="_blank"
            href={`${process.env.REACT_APP_PUBLIC_STORAGE}kyc_document/${loader.documents.id_proof}`}
          >
            <button
              type="button"
              class="btn btn-primary btn-sm ml-1"
              onClick={() => {}}
            >
              View
            </button>
          </a>
        </li>
        <li className="list-group-item">
          Address Proof Secondary :
          <a
            target="_blank"
            href={`${process.env.REACT_APP_PUBLIC_STORAGE}kyc_document/${loader.documents.address_proof}`}
          >
            <button type="button" class="btn btn-primary btn-sm ml-1">
              View
            </button>
          </a>
        </li>
      </ul>{" "} */}
    </ModalView>
  );
};

export default View;
