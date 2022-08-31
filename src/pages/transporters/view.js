import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModalView, StatusChangerButton } from "../../component";
import { changeTransporterStatus } from "../../store/slice/transporters-slice";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const View = () => {
  const { transporter } = useSelector((state) => state.transporters);
  return (
    <div>
      <ModalView
        title="View Transporters"
        modalId="modal-transporter-view"
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
              status={transporter.status}
              id={transporter._id}
              changeStatus={changeTransporterStatus}
            />
          </div>
          <img
            src={
              transporter.profile_pic == null
                ? "images/profile.png"
                : `${transporter?.profile_pic}`
            }
            className="img-fluid img-thumbnail"
            style={{ width: 100, height: 100, marginLeft: 10 }}
            alt="images"
          />
        </div>
        <div className="row">
          <div className="col-md-6 col-sm-12 col-xl-6">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                User Name : {transporter?.user_name}
              </li>
              <li className="list-group-item">
                Mobile Primary : {transporter?.mobile_primary}
              </li>
              <li className="list-group-item">
                Mobile Secondary : {transporter?.mobile_secondary}
              </li>
              <li className="list-group-item">Email : {transporter?.email}</li>
              <li className="list-group-item">
                Address : {transporter?.address}
              </li>
            </ul>

            <div className="form-group">
              <label for="#" className="font-weight-bold">
                Address Proof :
              </label>
              <div className="container list-group-item">
                {transporter?.documents?.address_proof == null ? (
                  "Document is not uploaded"
                ) : (
                  <TransformWrapper>
                    <TransformComponent>
                      <img
                        src={transporter?.documents?.address_proof}
                        alt="address-proof"
                        className="img-fluid"
                        style={{ display: "block", margin: "auto" }}
                      />
                    </TransformComponent>
                  </TransformWrapper>
                )}

                <div className="d-flex justify-content-end mt-2">
                  <a href={transporter?.documents?.address_proof}>
                    <button
                      type="button"
                      class="btn btn-primary "
                      disabled={
                        transporter?.documents?.address_proof ? false : true
                      }
                      onClick={() => {}}
                    >
                      download
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-sm-12 col-xl-6">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                GST Number : {transporter?.documents?.gst_number}
              </li>
              <li className="list-group-item">
                PAN Number : {transporter?.documents?.pan_number}
              </li>
              <li className="list-group-item">
                Account Number : {transporter?.documents?.account_number}
              </li>
              <li className="list-group-item">
                IFSC Code : {transporter?.documents?.ifsc_code}
              </li>
              <li className="list-group-item">
                Name in Bank : {transporter?.documents?.name_in_bank}
              </li>
              {transporter?.upi_id && (
                <li className="list-group-item">
                  UPI ID : {transporter?.documents?.upi_id}
                </li>
              )}
            </ul>
            <div className="form-group">
              <label for="#" className="font-weight-bold">
                ID Proof :
              </label>
              <div className="container list-group-item">
                {transporter?.documents?.id_proof == null ? (
                  "Document is not uploaded"
                ) : (
                  <TransformWrapper>
                    <TransformComponent>
                      <img
                        src={transporter?.documents?.id_proof}
                        alt="id-proof"
                        className="img-fluid"
                        style={{ display: "block", margin: "auto" }}
                      />
                    </TransformComponent>
                  </TransformWrapper>
                )}

                <div className="d-flex justify-content-end mt-2">
                  <a href={transporter?.documents?.id_proof}>
                    <button
                      type="button"
                      className="btn btn-primary "
                      disabled={transporter?.documents?.id_proof ? false : true}
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
