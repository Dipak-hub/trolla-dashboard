import React from "react";
import { ModalView, StatusChangerButton } from "../../component";
import { changeVehicleStatus } from "../../store/slice/vehicles-slice";

const View = ({ data: vehicle }) => {
  return (
    <div>
      <ModalView
        title="Vehicle  Details"
        modalId="modal-vehicle-view"
        cancelButtonText="Ok"
        size="xl"
      >
        <div className="form-group">
          {/* <StatushChangerButton
            bootstapId="status-changer-1"
            status={vehicle.status}
            id={vehicle._id}
          /> */}
          <div className="form-group">
            <StatusChangerButton
              bootstapId="status-changer-1"
              status={vehicle.status}
              id={vehicle._id}
              changeStatus={changeVehicleStatus}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xl-6 col-md-6 col-sm-12">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b> Transporter Name :</b> {vehicle?.transporter?.user_name}
              </li>
              <li className="list-group-item">
                <b>Owner Name :</b> {vehicle?.owner_name}
              </li>

              <li className="list-group-item">
                <b>Vehicle Number :</b> {vehicle?.rc_number}
              </li>
              <li className="list-group-item">
                <b>Vehicle Type :</b> {vehicle?.body_type}
              </li>
              <li className="list-group-item">
                <b> length :</b> {vehicle?.length}
              </li>
            </ul>
          </div>
          <div className="col-xl-6 col-md-6 col-sm-12">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b>Load Capacity : </b> {vehicle?.load_capacity}
              </li>
              <li className="list-group-item">
                <b>Body Type : </b> {vehicle?.body_type}
              </li>
              <li className="list-group-item">
                <b> Wheels :</b> {vehicle?.wheels}
              </li>
              <li className="list-group-item">
                <b> Speed :</b> {vehicle?.gps?.speed}
              </li>
              <li className="list-group-item">
                <b>Date : </b> {vehicle?.createdAt}
              </li>
            </ul>
          </div>
        </div>
      </ModalView>
    </div>
  );
};

export default View;
