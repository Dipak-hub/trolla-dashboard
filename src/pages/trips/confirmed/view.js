import React from "react";
import { ModalView, UserStatusIndicator } from "../../../component";

const View = ({ data: confirm }) => {
  return (
    <div>
      <ModalView
        title="view"
        modalId="modal-confirmed-view"
        cancelButtonText="Ok"
        size="xl"
      >
        <div className="container">
          <UserStatusIndicator status={confirm?.status} />

          <div className="row ">
            <div className="col-md-6 col-sm-12 col-xl-6">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Load No :</b> {confirm?.load?.load_no}
                </li>
                {confirm?.transporter && (
                  <>
                    <h4 className="list-group-item font-weight-bold text-primary">
                      {" "}
                      Transporter Details :
                    </h4>
                    <li className="list-group-item">
                      <b>Transporter :</b> {confirm?.transporter?.user_name}
                    </li>
                    <li className="list-group-item">
                      <b>Transporter Mobile:</b>{" "}
                      {confirm?.transporter?.mobile_primary}
                    </li>
                    <li className="list-group-item">
                      <b>Transporter Address:</b>{" "}
                      {confirm?.transporter?.address}
                    </li>
                    <li className="list-group-item">
                      <b>Transporter GST No:</b>{" "}
                      {confirm?.transporter?.documents?.gst_number}
                    </li>
                    <li className="list-group-item">
                      <b>Transporter Pan no:</b>{" "}
                      {confirm?.transporter?.documents?.pan_number}
                    </li>
                  </>
                )}

                {confirm?.loader && (
                  <>
                    <h4 className="list-group-item font-weight-bold text-primary">
                      {" "}
                      Loader Details :
                    </h4>
                    <li className="list-group-item">
                      <b>Loader Name:</b> {confirm?.loader?.user_name}
                    </li>
                    <li className="list-group-item">
                      <b>Loader Mobile:</b> {confirm?.loader?.mobile_primary}
                    </li>
                    <li className="list-group-item">
                      <b>Loader Address:</b> {confirm?.loader?.address}
                    </li>
                  </>
                )}

                {confirm?.driver && (
                  <>
                    <h4 className="list-group-item font-weight-bold text-primary">
                      Driver Details :
                    </h4>
                    <li className="list-group-item">
                      <b>Driver:</b> {confirm?.driver?.user_name}
                    </li>
                    <li className="list-group-item">
                      <b>Driver Mobile:</b> {confirm?.driver?.mobile_primary}
                    </li>
                  </>
                )}

                {confirm?.vehicle && (
                  <>
                    <h4 className="list-group-item font-weight-bold text-primary">
                      Vehicle Details :
                    </h4>
                    <li className="list-group-item">
                      <b>Vehicle Number:</b> {confirm?.vehicle?.rc_number}
                    </li>
                    <li className="list-group-item">
                      <b>Body Type:</b> {confirm?.vehicle?.body_type}
                    </li>
                    <li className="list-group-item">
                      <b>Wheels:</b> {confirm?.vehicle?.wheels}
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div className="col-md-6 col-sm-12 col-xl-6">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Pickup OTP : </b> {confirm?.values?.pickup_otp}{" "}
                </li>
                <li className="list-group-item">
                  <b>Delivery OTP : </b> {confirm?.values?.delivery_otp}{" "}
                </li>
                <h4 className="list-group-item font-weight-bold text-primary">
                  {" "}
                  Load Details :
                </h4>
                <li className="list-group-item">
                  <b> Pickup Address :</b> {confirm?.load?.pickup?.address}{" "}
                </li>{" "}
                <li className="list-group-item">
                  <b>Delivery Address : </b> {confirm?.load?.delivery?.address}{" "}
                </li>
                <li className="list-group-item">
                  <b>Material Type :</b> {confirm?.load?.meterial_type}
                </li>
                <li className="list-group-item">
                  {" "}
                  <b> Quoted Price :</b> {confirm?.quotation?.amount}{" "}
                </li>
                <li className="list-group-item">
                  <b>Value : </b> {confirm?.load?.value}{" "}
                </li>
                <li className="list-group-item">
                  {" "}
                  <b> Weight : </b> {confirm?.load?.weight}{" "}
                </li>
                <li className="list-group-item">
                  <b>Pickup Date : </b> {confirm?.load?.pickup_date}{" "}
                </li>
                <li className="list-group-item">
                  <b>Delivery Date : </b> {confirm?.quotation?.delivery_date}{" "}
                </li>
                <h4 className="list-group-item font-weight-bold text-primary">
                  {" "}
                  Quotation Details :
                </h4>
                <li className="list-group-item">
                  {" "}
                  <b> Quoted Price :</b> {confirm?.quotation?.amount}{" "}
                </li>
                {confirm?.values?.confirmation_details && (
                  <>
                    <h4 className="list-group-item font-weight-bold text-primary">
                      {" "}
                      Transaction Details :
                    </h4>
                    <li className="list-group-item">
                      <b> Order id : </b>{" "}
                      {confirm?.values?.confirmation_details?.order_id}
                    </li>
                    <li className="list-group-item">
                      <b> Transaction Id : </b>{" "}
                      {confirm?.values?.confirmation_details?.transaction_id}
                    </li>
                    <li className="list-group-item">
                      <b> payment Id : </b>{" "}
                      {confirm?.values?.confirmation_details?.payment_id}
                    </li>
                    <li className="list-group-item">
                      <b> Amount: </b>{" "}
                      {confirm?.values?.confirmation_details?.amount}
                    </li>

                    <li className="list-group-item">
                      <b> Description: </b> Trip Advance Payment
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
