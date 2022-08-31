import React from "react";
import { ModalView, UserStatusIndicator } from "../../../component";
// --
const View = ({ data: close_trip }) => {
  return (
    <div>
      <ModalView
        title="View"
        modalId="modal-close-trip-view"
        cancelButtonText="Ok"
        size="xl"
      >
        <div>
          <UserStatusIndicator status={close_trip?.status} />
        </div>
        <div className="row">
          <div className="col-xl-6 col-md-6 col-sm-12">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b>Load No :</b> {close_trip?.load?.load_no}
              </li>

              {close_trip?.transporter && (
                <>
                  <h4 className="list-group-item font-weight-bold text-primary">
                    Transporter Details :
                  </h4>
                  <li className="list-group-item">
                    <b> Name :</b> {close_trip?.transporter?.user_name}
                  </li>
                  <li className="list-group-item">
                    <b>Mobile:</b> {close_trip?.transporter?.mobile_primary}
                  </li>
                  <li className="list-group-item">
                    <b>Email:</b> {close_trip?.transporter?.email}
                  </li>
                  <li className="list-group-item">
                    <b> PAN Number:</b>{" "}
                    {close_trip?.transporter?.documents?.pan_number}
                  </li>
                  <li className="list-group-item">
                    <b> GST Number:</b>{" "}
                    {close_trip?.transporter?.documents?.gst_number}
                  </li>
                  <li className="list-group-item">
                    <b> Account Number:</b>{" "}
                    {close_trip?.transporter?.documents?.account_number}
                  </li>
                  <li className="list-group-item">
                    <b> IFSC Code:</b>{" "}
                    {close_trip?.transporter?.documents?.ifsc_code}
                  </li>
                </>
              )}
              {close_trip?.loader && (
                <>
                  <h4 className="list-group-item font-weight-bold text-primary">
                    Loader Details :
                  </h4>
                  <li className="list-group-item">
                    <b> Name : </b> {close_trip?.loader?.user_name}
                  </li>
                  <li className="list-group-item">
                    <b>Mobile: </b> {close_trip?.loader?.mobile_primary}
                  </li>
                  <li className="list-group-item">
                    <b>Email: </b> {close_trip?.loader?.email}
                  </li>
                  <li className="list-group-item">
                    <b>GST Number: </b> {close_trip?.loader?.gst_number}
                  </li>
                  <li className="list-group-item">
                    <b>PAN Number: </b> {close_trip?.loader?.pan_number}
                  </li>
                </>
              )}

              {close_trip?.driver && (
                <>
                  <h4 className="list-group-item font-weight-bold text-primary">
                    Driver Details :
                  </h4>
                  <li className="list-group-item">
                    <b> Name : </b> {close_trip?.driver?.user_name}
                  </li>
                  <li className="list-group-item">
                    <b>Mobile: </b> {close_trip?.driver?.mobile_primary}
                  </li>
                  <li className="list-group-item">
                    <b>DL no: </b> {close_trip?.driver?.dl_number}
                  </li>
                </>
              )}

              {close_trip?.vehicle && (
                <>
                  <h4 className="list-group-item font-weight-bold text-primary">
                    Vehicle Details :
                  </h4>
                  <li className="list-group-item">
                    <b>Vehicle Number : </b> {close_trip?.vehicle?.rc_number}{" "}
                  </li>
                  <li className="list-group-item">
                    <b>Load capacity : </b> {close_trip?.vehicle?.load_capacity}{" "}
                  </li>
                </>
              )}
              {/* <li className="list-group-item">
                <b>Paid : </b> {close_trip?.values?.completed_details?.amount}{" "}
                .00{" "}
              </li> */}
              {/* <li className="list-group-item">
                <b>Payments Id : </b>{" "}
                {close_trip?.values?.completed_details?.payment_id}{" "}
              </li> */}
            </ul>
          </div>
          <div className="col-xl-6 col-md-6 col-sm-12">
            <ul className="list-group list-group-flush">
              <h4 className="list-group-item font-weight-bold text-primary">
                Load Details :
              </h4>
              <li className="list-group-item">
                <b> Pickup Address :</b> {close_trip?.load?.pickup?.address}{" "}
              </li>
              <li className="list-group-item">
                <b>Delivery Address : </b> {close_trip?.load?.delivery?.address}{" "}
              </li>
              <li className="list-group-item">
                <b>Weight : </b> {close_trip?.load?.weight}{" "}
              </li>
              <li className="list-group-item">
                <b> Value of the Goods : </b> {close_trip?.load?.value}{" "}
              </li>
              {/* <li className="list-group-item">
                <b> Total Amount : </b>{" "}
              </li> */}

              <li className="list-group-item">
                <b>Pickup date : </b> {close_trip?.load?.pickup_date}
              </li>
              <li className="list-group-item">
                <b>Delivery date : </b> {close_trip?.quotation?.delivery_date}
              </li>

              {close_trip?.confirmation_transaction && (
                <>
                  <h4 className="list-group-item font-weight-bold text-primary">
                    {" "}
                    Pre Transaction Details :
                  </h4>

                  <li className="list-group-item">
                    <b> Order id: </b>{" "}
                    {
                      close_trip?.confirmation_transaction?.payment_entity
                        ?.order_id
                    }
                  </li>
                  <li className="list-group-item">
                    <b> Payment id: </b>{" "}
                    {close_trip?.confirmation_transaction?.payment_entity?.id}
                  </li>
                  <li className="list-group-item">
                    <b> Amount: </b>{" "}
                    {
                      close_trip?.confirmation_transaction?.payment_entity
                        ?.amount
                    }
                  </li>
                  {close_trip?.confirmation_transaction?.payment_entity
                    ?.vpa && (
                    <li className="list-group-item">
                      <b> Vpa: </b>{" "}
                      {
                        close_trip?.confirmation_transaction?.payment_entity
                          ?.vpa
                      }
                    </li>
                  )}
                </>
              )}
              {close_trip?.closing_transaction && (
                <>
                  <h4 className="list-group-item font-weight-bold text-primary">
                    {" "}
                    Final Transaction Details :
                  </h4>

                  <li className="list-group-item">
                    <b> Order id: </b>{" "}
                    {close_trip?.closing_transaction?.payment_entity?.order_id}
                  </li>
                  <li className="list-group-item">
                    <b> Payment id: </b>{" "}
                    {close_trip?.closing_transaction?.payment_entity?.id}
                  </li>
                  <li className="list-group-item">
                    <b> Amount: </b>{" "}
                    {close_trip?.closing_transaction?.payment_entity?.amount}
                  </li>
                  {close_trip?.closing_transaction?.payment_entity?.vpa && (
                    <li className="list-group-item">
                      <b> Vpa: </b>{" "}
                      {close_trip?.closing_transaction?.payment_entity?.vpa}
                    </li>
                  )}
                </>
              )}
            </ul>
          </div>
        </div>
      </ModalView>
    </div>
  );
};

export default View;
