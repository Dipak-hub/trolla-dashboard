import React from "react";
import {
  ModalView,
  UserStatusIndicator,
  TripStatusChange,
} from "../../../component";
import { tripsChangeStatus } from "../../../store/slice/trips-slice";

const View = ({ data: booking }) => {
  return (
    <div>
      <ModalView
        title="View"
        modalId="modal-booking-view"
        cancelButtonText="Ok"
        size="xl"
      >
        <h2>
          {" "}
          <div className="container">
            {/* <UserStatusIndicator status={booking?.status} /> */}
            <TripStatusChange
              bootstapId="status-changer-1"
              status={booking?.status}
              id={booking?._id}
              changeStatus={tripsChangeStatus}
            />
            <div className="row ">
              <div className="col-md-6 col-sm-12 col-xl-6">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <b>Load No :</b> {booking?.load?.load_no}
                  </li>
                  {booking?.transporter && (
                    <>
                      <h4 className="list-group-item font-weight-bold text-primary">
                        {" "}
                        Transporter Details :
                      </h4>
                      <li className="list-group-item">
                        <b>Transporter :</b> {booking?.transporter?.user_name}
                      </li>
                      <li className="list-group-item">
                        <b>Transporter Mobile :</b>{" "}
                        {booking?.transporter?.mobile_primary}
                      </li>
                      <li className="list-group-item">
                        <b>Transporter Address:</b>{" "}
                        {booking?.transporter?.address}
                      </li>
                    </>
                  )}
                  {booking?.loader && (
                    <>
                      <h4 className="list-group-item font-weight-bold text-primary">
                        {" "}
                        Loader Details :
                      </h4>
                      <li className="list-group-item">
                        <b>Loader :</b> {booking?.loader?.user_name}
                      </li>
                      <li className="list-group-item">
                        <b>Loader Mobile No :</b>{" "}
                        {booking?.loader?.mobile_primary}
                      </li>
                      <li className="list-group-item">
                        <b>Loader Address :</b> {booking?.loader?.address}
                      </li>
                    </>
                  )}
                  {booking?.driver && (
                    <>
                      <h4 className="list-group-item font-weight-bold text-primary">
                        {" "}
                        Driver Details :
                      </h4>
                      <li className="list-group-item">
                        <b>Name :</b> {booking?.driver?.user_name}
                      </li>
                      <li className="list-group-item">
                        <b>Mobile:</b> {booking?.driver?.mobile_primary}
                      </li>
                      <li className="list-group-item">
                        <b>Address:</b> {booking?.driver?.address}
                      </li>
                    </>
                  )}
                  {booking?.transporter && (
                    <>
                      <h4 className="list-group-item font-weight-bold text-primary">
                        Vehicle Details :
                      </h4>
                      <li className="list-group-item">
                        <b> Registration Number :</b>{" "}
                        {booking?.vehicle?.rc_number}{" "}
                      </li>
                      <li className="list-group-item">
                        <b> Owner Name :</b> {booking?.vehicle?.owner_name}{" "}
                      </li>
                      <li className="list-group-item">
                        <b> Load Capacity:</b> {booking?.vehicle?.load_capacity}{" "}
                      </li>
                      <li className="list-group-item">
                        <b> Body Type:</b> {booking?.vehicle?.body_type}{" "}
                      </li>
                    </>
                  )}
                  {booking?.values?.confirmation_details && (
                    <>
                      <h4 className="list-group-item font-weight-bold text-primary">
                        {" "}
                        Conformation Transaction Details :
                      </h4>
                      <li className="list-group-item">
                        <b> Amount : </b>{" "}
                        {booking?.values?.confirmation_details?.amount}
                      </li>
                      <li className="list-group-item">
                        <b> Order id: </b>{" "}
                        {booking?.values?.confirmation_details?.order_id}
                      </li>
                      {booking?.values.confirmation_details?.transaction_id && (
                        <li className="list-group-item">
                          <b> Transaction Id: </b>{" "}
                          {
                            booking?.values?.confirmation_details
                              ?.transaction_id
                          }
                        </li>
                      )}
                      {booking?.values?.confirmation_details?.payment_id && (
                        <li className="list-group-item">
                          <b> Payment Id: </b>{" "}
                          {booking?.values?.confirmation_details?.payment_id}
                        </li>
                      )}

                      <li className="list-group-item">
                        <b> Description: </b> Advance Amount
                      </li>
                    </>
                  )}
                </ul>
              </div>

              <div className="col-md-6 col-sm-12 col-xl-6">
                <ul className="list-group list-group-flush">
                  {booking?.values && (
                    <>
                      <h4 className="list-group-item font-weight-bold text-primary">
                        {" "}
                        OTP Details :
                      </h4>
                      <li className="list-group-item">
                        <b>Delivery OTP :</b> {booking?.values?.delivery_otp}{" "}
                      </li>
                      <li className="list-group-item">
                        <b>Pickup OTP :</b> {booking?.values?.pickup_otp}{" "}
                      </li>
                    </>
                  )}

                  {booking?.load && (
                    <>
                      <h4 className="list-group-item font-weight-bold text-primary">
                        {" "}
                        Load Details :
                      </h4>
                      <li className="list-group-item">
                        <b>Value : </b> {booking?.load?.value}{" "}
                      </li>
                      <li className="list-group-item">
                        <b>Weight : </b> {booking?.load?.weight}{" "}
                      </li>
                      <li className="list-group-item">
                        <b>Meterial Type : </b> {booking?.load?.meterial_type}{" "}
                      </li>

                      <li className="list-group-item">
                        {" "}
                        <b> Weight : </b> {booking?.load?.weight}{" "}
                      </li>
                      <li className="list-group-item">
                        <b> Pickup Address :</b>{" "}
                        {booking?.load?.pickup?.address}{" "}
                      </li>
                      <li className="list-group-item">
                        <b>Delivery Address : </b>{" "}
                        {booking?.load?.delivery?.address}{" "}
                      </li>
                      <li className="list-group-item">
                        <b>Pickup date : </b> {booking?.load?.pickup_date}{" "}
                      </li>
                      <li className="list-group-item">
                        <b>Delivery date : </b>{" "}
                        {booking?.quotation?.delivery_date}{" "}
                      </li>
                    </>
                  )}

                  {/* <h4 className="list-group-item font-weight-bold text-primary">
                    {" "}
                    Quotation Details :
                  </h4>
                  <li className="list-group-item">
                    {" "}
                    <b> Quoted Price :</b> {booking?.quotation?.amount}{" "}
                  </li> */}

                  {booking?.values?.confirmation_details && (
                    <>
                      <h4 className="list-group-item font-weight-bold text-primary">
                        {" "}
                        Closed Transaction Details :
                      </h4>
                      <li className="list-group-item">
                        <b> Amount : </b>{" "}
                        {booking?.values?.closed_details?.amount}
                      </li>
                      <li className="list-group-item">
                        <b> Order id: </b>{" "}
                        {booking?.values?.closed_details?.order_id}
                      </li>
                      {booking?.values.closed_details?.transaction_id && (
                        <li className="list-group-item">
                          <b> Transaction Id: </b>{" "}
                          {booking?.values?.closed_details?.transaction_id}
                        </li>
                      )}
                      {booking?.values?.closed_details?.payment_id && (
                        <li className="list-group-item">
                          <b> Payment Id: </b>{" "}
                          {booking?.values?.closed_details?.payment_id}
                        </li>
                      )}

                      <li className="list-group-item">
                        <b> Description: </b> Full Amount
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
            <div></div>
          </div>
        </h2>
      </ModalView>
    </div>
  );
};

export default View;
