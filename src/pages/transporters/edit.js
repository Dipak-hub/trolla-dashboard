import React from "react";
import { ModalSubmit } from "../../component";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import {
  setMobilePrimary,
  setMobileSecondary,
  setUserName,
  setEmail,
  setAddress,
  setGstNumber,
  setPanNumber,
  uploadAddressProof,
  updateTransporters,
  uploadIdProof,
  setNameInBank,
  setAccountNumber,
  setIfscCode,
  setUpiId,
} from "../../store/slice/transporters-slice";

const Edit = () => {
  const dispatch = useDispatch();

  const { transporter } = useSelector((state) => state.transporters);
  const { id_proof_loading, address_proof_loading } = useSelector(
    (state) => state.transporters
  );

  return (
    <div>
      <ModalSubmit
        title="Edit Transporter"
        modalId="modal-transporter-edit"
        size="xl"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(updateTransporters())
            .unwrap()
            .then((r) => {
              toast.warn("transporter Updated successfully...", {
                type: "success",
              });
            })
            .catch((e) => {
              toast.warn(e.message, { type: "error" });
            });
        }}
      >
        <div className="row">
          <div className="col-md-6 col-sm-12 col-xl-6">
            <div className="form-group">
              <label for="#">Unique Mobile Number</label>
              <input
                type="number"
                className="form-control"
                id="#"
                value={transporter?.mobile_primary}
                disabled="true"
              />
            </div>

            <div className="form-group">
              <label for="#">Name</label>
              <input
                type="text"
                maxLength="40"
                minLength="3"
                className="form-control"
                id="#"
                value={transporter?.user_name || ""}
                onChange={(e) => dispatch(setUserName(e.target.value))}
                placeholder="Name"
              />
            </div>
            <div className="form-group">
              <label for="#">Mobile Secondary</label>
              <input
                type="number"
                maxLength="10"
                minLength="10"
                className="form-control"
                id="#"
                value={transporter?.mobile_secondary || ""}
                onChange={(e) => dispatch(setMobileSecondary(e.target.value))}
                placeholder="Mobile Secondary"
              />
            </div>
            <div className="form-group">
              <label for="#">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="#"
                value={transporter?.email || ""}
                onChange={(e) => dispatch(setEmail(e.target.value))}
                placeholder="Email"
              />
            </div>

            <div className="form-group">
              <label for="#">Address</label>
              <input
                type="text"
                maxLength="60"
                className="form-control"
                id="#"
                value={transporter?.address || ""}
                onChange={(e) => dispatch(setAddress(e.target.value))}
                placeholder="Address"
                required
              />
            </div>
            <div className="form-group">
              <label for="#">PAN Number</label>
              <input
                type="text"
                maxLength="10"
                minLength="10"
                className="form-control"
                id="#"
                value={transporter?.documents?.pan_number || ""}
                onChange={(e) => dispatch(setPanNumber(e.target.value))}
                placeholder="PAN number"
              />
            </div>
            <div className="form-group">
              <label for="#">GST Number</label>
              <input
                type="text"
                maxLength="15"
                minLength="15"
                className="form-control"
                id="#"
                value={transporter?.documents?.gst_number || ""}
                onChange={(e) => dispatch(setGstNumber(e.target.value))}
                placeholder="GST number"
              />
            </div>
            <div className="form-group">
              <label for="#">Name In Bank</label>
              <input
                type="text"
                minLength="3"
                maxLength="40"
                className="form-control"
                id="#"
                value={transporter?.documents?.name_in_bank || ""}
                onChange={(e) => dispatch(setNameInBank(e.target.value))}
                placeholder="Name in bank"
              />
            </div>
            <div className="form-group">
              <label for="#">Bank Account Number</label>
              <input
                type="text"
                minLength="9"
                maxLength="18"
                className="form-control"
                id="#"
                value={transporter?.documents?.account_number || ""}
                onChange={(e) => dispatch(setAccountNumber(e.target.value))}
                placeholder="Account number"
              />
            </div>
            <div className="form-group">
              <label for="#">IFSC Code</label>
              <input
                type="text"
                minLength="11"
                maxLength="11"
                className="form-control"
                id="#"
                value={transporter?.documents?.ifsc_code || ""}
                onChange={(e) => dispatch(setIfscCode(e.target.value))}
                placeholder="IFSC code"
              />
            </div>
            <div className="form-group">
              <label for="#">UPI ID</label>
              <input
                type="text"
                minLength="5"
                maxLength="20"
                className="form-control"
                id="#"
                value={transporter?.documents?.upi_id || ""}
                onChange={(e) => dispatch(setUpiId(e.target.value))}
                placeholder="UPI ID"
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-12 col-xl-6">
            <div className="form-group">
              <label for="#">Upload ID Proof</label>
              {transporter?.documents?.id_proof && (
                <img
                  src={transporter?.documents?.id_proof}
                  alt="id-proof"
                  className="img-fluid"
                  style={{ display: "block", margin: "auto" }}
                />
              )}
              <input
                type="file"
                title="choose new file"
                onChange={(e) => dispatch(uploadIdProof(e.target.files[0]))}
                className="form-control"
                id="#"
              />

              {id_proof_loading && (
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              )}
            </div>

            <div className="form-group">
              <label for="#">Upload Address Proof</label>
              {transporter?.documents?.address_proof && (
                <img
                  src={transporter?.documents?.address_proof}
                  alt="id-proof"
                  className="img-fluid"
                  style={{ display: "block", margin: "auto" }}
                />
              )}
              <input
                type="file"
                title="choose new file"
                onChange={(e) =>
                  dispatch(uploadAddressProof(e.target.files[0]))
                }
                className="form-control"
                id="#"
              />
              {address_proof_loading && (
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </ModalSubmit>
      <ToastContainer />
    </div>
  );
};

export default Edit;
