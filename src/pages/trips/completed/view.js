import React from "react";
import { ModalView, UserStatusIndicator } from "../../../component";

const View = ({ data: complete }) => {
  return (
    <div>
      <ModalView
        title="view"
        modalId="modal-complete-trip-view"
        cancelButtonText="Ok"
        size="xl"
      >
        <div className="container">
          <UserStatusIndicator status={complete?.status} />
          <div className="row ">
            <div className="col-md-6 col-sm-12 col-xl-6">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Load No :</b> {complete?.load?.load_no}
                </li>
                <h4 className="list-group-item font-weight-bold text-primary">
                  {" "}
                  Transporter Details :
                </h4>
                <li className="list-group-item">
                  <b>Transporter :</b> {complete?.transporter?.user_name}
                </li>
                <li className="list-group-item">
                  <b>Transporter Mobile:</b>{" "}
                  {complete?.transporter?.mobile_primary}
                </li>
                <h4 className="list-group-item font-weight-bold text-primary">
                  Loader Details :
                </h4>
                <li className="list-group-item">
                  <b>Loader :</b> {complete?.loader?.user_name}
                </li>
                <li className="list-group-item">
                  <b>Loader Mobile:</b> {complete?.loader?.mobile_primary}
                </li>
                <h4 className="list-group-item font-weight-bold text-primary">
                  Driver Details :
                </h4>
                <li className="list-group-item">
                  <b>Driver :</b> {complete?.driver?.user_name}
                </li>
                <li className="list-group-item">
                  <b>Driver Mobile:</b> {complete?.driver?.mobile_primary}
                </li>
                <h4 className="list-group-item font-weight-bold text-primary">
                  Vehicle Details :
                </h4>
                <li className="list-group-item">
                  <b>Vehicle Number :</b> {complete?.vehicle?.rc_number}{" "}
                </li>
                <li className="list-group-item">
                  <b>Body Type :</b> {complete?.vehicle?.body_type}{" "}
                </li>
                <li className="list-group-item">
                  <b>Wheels :</b> {complete?.vehicle?.wheels}{" "}
                </li>
              </ul>
            </div>

            <div className="col-md-6 col-sm-12 col-xl-6">
              <ul className="list-group list-group-flush">
                <h4 className="list-group-item font-weight-bold text-primary">
                  Load Details :
                </h4>
                <li className="list-group-item">
                  <b>Pickup Address :</b> {complete?.load?.pickup?.address}{" "}
                </li>
                <li className="list-group-item">
                  <b>Delivery Address :</b> {complete?.load?.delivery?.address}{" "}
                </li>
                <li className="list-group-item">
                  <b>Pickup Date :</b> {complete?.load?.pickup_date}{" "}
                </li>
                <li className="list-group-item">
                  <b>Delivery Date :</b> {complete?.quotation?.delivery_date}{" "}
                </li>
                <li className="list-group-item">
                  <b>Material Type :</b> {complete?.load?.meterial_type}{" "}
                </li>
                <li className="list-group-item">
                  {" "}
                  <b>Weight :</b> {complete?.load?.weight}{" "}
                </li>
                <li className="list-group-item">
                  {" "}
                  <b> Value of the Goods :</b> {complete?.load?.value}{" "}
                </li>

                {complete?.values?.closed_details && (
                  <>
                    <h4 className="list-group-item font-weight-bold text-primary">
                      {" "}
                      Transaction Details :
                    </h4>
                    <li className="list-group-item">
                      <b> Order id : </b>{" "}
                      {complete?.values?.closed_details?.order_id}
                    </li>
                    <li className="list-group-item">
                      <b> Transaction Id : </b>{" "}
                      {complete?.values?.closed_details?.transaction_id}
                    </li>
                    <li className="list-group-item">
                      <b> payment Id : </b>{" "}
                      {complete?.values?.closed_details?.payment_id}
                    </li>
                    <li className="list-group-item">
                      <b> Amount: </b>{" "}
                      {complete?.values?.closed_details?.amount}
                    </li>

                    <li className="list-group-item">
                      <b> Description: </b> Trip Closed Payment
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
          <div></div>
        </div>
      </ModalView>
    </div>
  );
};

export default View;
