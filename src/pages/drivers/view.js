/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ModalView, StatusChangerButton } from "../../component";
import { changeDriverStatus } from "../../store/slice/drivers-slice";

const View = () => {
  const { driver } = useSelector((state) => state.drivers);
  return (
    <div>
      <ModalView
        title="Driver view"
        modalId="modal-driver-view"
        size="xl"
        cancelButtonText="Hide"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <div className="form-group">
            <StatusChangerButton
              bootstapId="status-changer-1"
              status={driver?.status}
              id={driver?._id}
              changeStatus={changeDriverStatus}
            />
          </div>
          <img
            src={
              driver?.profile_pic == null
                ? "images/profile.png"
                : `${driver?.profile_pic}`
            }
            className="img-fluid img-thumbnail"
            style={{ width: 100, height: 100, marginLeft: 10 }}
            alt="images"
          />
        </div>

        <div className="row">
          <div className="col-md-6 col-sm-12 col-xl-6">
            <div className="form-group">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Transporter :{driver?.transporter?.user_name}
                </li>
                <li className="list-group-item">
                  Driver Name : {driver?.user_name}
                </li>
                <li className="list-group-item">
                  Mobile Primary :{driver?.mobile_primary}
                </li>
                <li className="list-group-item">
                  Mobile Secondary : {driver?.mobile_secondary}
                </li>
                <li className="list-group-item">
                  DL Number : {driver?.documents?.dl_number}
                </li>
                <li className="list-group-item">Email : {driver?.email}</li>
                <li className="list-group-item">Address : {driver?.address}</li>
                <li className="list-group-item">
                  Name in Bank : {driver?.documents.name_in_bank}
                </li>
                <li className="list-group-item">
                  Account Number : {driver?.documents?.account_number}
                </li>
                <li className="list-group-item">
                  IFSC Code : {driver?.documents?.ifsc_code}
                </li>
                <li className="list-group-item">
                  UPI ID : {driver?.documents?.upi_id}
                </li>
                <li className="list-group-item">
                  Created Date : {driver?.createdAt}{" "}
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 col-xl-6">
            <div className="form-group">
              <label for="#" className="font-weight-bold">
                {" "}
                Driving license :
              </label>
              <div className="container list-group-item">
                {driver?.documents?.dl_document == null ? (
                  "Document not uploaded"
                ) : (
                  <TransformWrapper>
                    <TransformComponent style={{ width: "100%" }}>
                      <img
                        src={driver?.documents?.dl_document}
                        alt="dl-documents"
                        className="img-fluid"
                        style={{ display: "block", margin: "auto" }}
                        // width="700px"
                        // height="100px"
                      />
                    </TransformComponent>
                  </TransformWrapper>
                )}

                <div className="d-flex justify-content-end mt-2">
                  <a href={driver?.documents?.dl_document}>
                    <button
                      type="button"
                      className="btn btn-primary "
                      disabled={driver?.documents?.dl_document ? false : true}
                      onClick={() => {}}
                    >
                      download
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalView>
    </div>
  );
};

export default View;
