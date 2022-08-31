import React from "react";
import { ModalView } from "../../../component";
import { UserStatusIndicator } from "../../../component";
//
const View = ({ data: quote }) => {
  return (
    <div>
      <ModalView
        title="View"
        modalId="modal-quotation-view"
        cancelButtonText="Ok"
        size="xl"
      >
        <div className="container">
          <div>
            <UserStatusIndicator status={quote?.status} />
          </div>
          <div className="row ">
            <div className="col-md-6 col-sm-12 col-xl-6">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b> Load No :</b> {quote?.load?.load_no}
                </li>

                <h4 className="list-group-item font-weight-bold text-primary">
                  {" "}
                  Transporter Details :
                </h4>
                <li className="list-group-item">
                  <b>Transporter : </b> {quote?.transporter?.user_name}
                </li>
                <li className="list-group-item">
                  <b>Transporter Mobile: </b>{" "}
                  {quote?.transporter?.mobile_primary}
                </li>
                <li className="list-group-item">
                  <b>Transporter Address: </b> {quote?.transporter?.address}
                </li>
                <h4 className="list-group-item font-weight-bold text-primary">
                  {" "}
                  Loader Details :
                </h4>
                <li className="list-group-item">
                  <b>Loader : </b> {quote?.loader?.user_name}
                </li>
                <li className="list-group-item">
                  <b>Loader Mobile: </b> {quote?.loader?.mobile_primary}
                </li>
                <li className="list-group-item">
                  <b>Loader Address: </b> {quote?.loader?.address}
                </li>
              </ul>
            </div>

            <div className="col-md-6 col-sm-12 col-xl-6">
              <ul className="list-group list-group-flush">
                <h4 className="list-group-item font-weight-bold text-primary">
                  {" "}
                  Load Details :
                </h4>
                <li className="list-group-item">
                  <b> Pickup Address :</b> {quote.load?.pickup?.address}{" "}
                </li>
                <li className="list-group-item">
                  <b> Delivery Address :</b> {quote?.load?.delivery.address}{" "}
                </li>

                <li className="list-group-item">
                  <b> Weight :</b> {quote?.load?.weight}{" "}
                </li>
                <li className="list-group-item">
                  <b> Value :</b> {quote?.load?.value}{" "}
                </li>
                <li className="list-group-item">
                  <b> material type: </b> {quote?.load?.meterial_type}{" "}
                </li>
                <li className="list-group-item">
                  <b> Pickup date: </b> {quote?.load?.pickup_date}{" "}
                </li>
                <li className="list-group-item">
                  <b> Expected Delivery Date: </b>{" "}
                  {quote?.load?.expected_delivery_date}{" "}
                </li>
                <h4 className="list-group-item font-weight-bold text-primary">
                  {" "}
                  Quotation Details :
                </h4>
                <li className="list-group-item">
                  <b> Quoted Price :</b> {quote?.quotation?.amount}{" "}
                </li>
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
