import React from "react";
import { ModalView } from "../../component";
import { UserStatusIndicator } from "../../component";

const View = ({ data: transaction }) => {
  return (
    <ModalView
      title="Transaction Details"
      modalId="modal-transaction-view"
      cancelButtonText="Ok"
      size="xl"
    >
      <div>
        <UserStatusIndicator
          status={transaction?.transaction?.payload?.payment?.entity.status}
        />
      </div>
      <div className="row">
        <div className="col-md-6 col-sm-12 col-xl-6">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <b>Payment id : </b>{" "}
              {transaction?.transaction?.payload?.payment?.entity.id}
            </li>
            <li className="list-group-item">
              <b>Account id : </b> {transaction?.transaction?.account_id}
            </li>
            <li className="list-group-item">
              <b>Order id :</b>{" "}
              {transaction?.transaction?.payload?.payment?.entity?.order_id}
            </li>

            <li className="list-group-item">
              <b>Amount :</b>{" "}
              {transaction?.transaction?.payload?.payment?.entity?.amount}
            </li>
            <li className="list-group-item">
              <b>Payment Method:</b>{" "}
              {transaction?.transaction?.payload?.payment?.entity?.method}
            </li>
            {transaction?.transaction?.payload?.payment?.entity?.vpa && (
              <li className="list-group-item">
                <b>VPA :</b>{" "}
                {transaction?.transaction?.payload?.payment?.entity?.vpa}
              </li>
            )}
          </ul>
        </div>
        <div className="col-md-6 col-sm-12 col-xl-6">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <b>Refunded Amount :</b>{" "}
              {
                transaction?.transaction?.payload?.payment?.entity
                  ?.amount_refunded
              }
            </li>
            <li className="list-group-item">
              <b>Contact Number :</b>{" "}
              {transaction?.transaction?.payload?.payment?.entity?.contact}
            </li>
            <li className="list-group-item">
              <b>Email :</b>{" "}
              {transaction?.transaction?.payload?.payment?.entity?.email}
            </li>
            <li className="list-group-item">
              <b>Description :</b>{" "}
              {transaction?.transaction?.payload?.payment?.entity?.description}
            </li>

            <li className="list-group-item">
              <b>Payment Date :</b> {transaction?.transaction?.created_at}
            </li>
          </ul>
        </div>
      </div>
    </ModalView>
  );
};

export default View;
