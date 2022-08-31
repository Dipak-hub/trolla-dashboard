/** @format */
import React from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { ModalSubmit } from "../../component";
import {
  setTransporter,
  setDriverName,
  setMobilePrimary,
  setMobileSecondary,
  setEmail,
  setAddress,
  updateDrivers,
  uploadDrivingLicense,
  setNameInBank,
  setAccountNumber,
  setIfscCode,
  setUpiId,
} from "../../store/slice/drivers-slice";
// import { allTransporter } from "../../store/slice/transporter-slice";

const Edit = () => {
  const dispatch = useDispatch();
  const { all_transporter } = useSelector((state) => state.transporters);

  const { loading, dl_loading, driver } = useSelector((state) => state.drivers);

  return (
    <div>
      <ModalSubmit
        title="Driver Edit"
        modalId="modal-driver-edit"
        size="xl"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(updateDrivers())
            .unwrap()
            .then((r) => {
              toast.warn("Driver Updated successfully...", { type: "success" });
            })
            .catch((e) => {
              toast.warn(e?.message, { type: "error" });
            });
        }}
      >
        <div className="row">
          <div className="col-md-6 col-sm-12 col-xl-6">
            <div className="form-group">
              <label htmlFor="#">Unique Mobile Number</label>
              <input
                type="text"
                maxLength="10"
                disabled="true"
                className="form-control"
                id="#"
                value={driver?.mobile_primary}
                placeholder="Mobile Primary"
              />
            </div>
            <div className="form-group">
              <label htmlFor="#">Transporter Name</label>
              <input
                type="text"
                disabled="true"
                className="form-control"
                id="#"
                value={driver?.transporter?.user_name || ""}
                placeholder="Transporter name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="#">Driver Name</label>
              <input
                type="text"
                minLength="3"
                maxLength="40"
                className="form-control"
                id="#"
                value={driver?.user_name || ""}
                onChange={(e) => dispatch(setDriverName(e.target.value))}
                placeholder="Driver Name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="#">Mobile Secondary</label>
              <input
                type="text"
                minLength="10"
                maxLength="10"
                className="form-control"
                id="#"
                value={driver?.mobile_secondary || ""}
                onChange={(e) => dispatch(setMobileSecondary(e.target.value))}
                placeholder="Mobile Secondary"
              />
            </div>
            <div className="form-group">
              <label htmlFor="#">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="#"
                value={driver?.email || ""}
                onChange={(e) => dispatch(setEmail(e.target.value))}
                placeholder="Email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="#">Address</label>
              <input
                type="text"
                minLength="3"
                maxLength="60"
                className="form-control"
                id="#"
                value={driver?.address || ""}
                onChange={(e) => dispatch(setAddress(e.target.value))}
                placeholder="Address"
                required
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-12 col-xl-6">
            <div className="form-group">
              <label for="#">Name In Bank</label>
              <input
                type="text"
                minLength="3"
                maxLength="40"
                className="form-control"
                id="#"
                value={driver?.documents?.name_in_bank || ""}
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
                value={driver?.documents?.account_number || ""}
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
                value={driver?.documents?.ifsc_code || ""}
                onChange={(e) => dispatch(setIfscCode(e.target.value))}
                placeholder="IFSC code"
              />
            </div>
            <div className="form-group">
              <label for="#">UPI ID</label>
              <input
                type="text"
                minLength="5"
                maxLength="25"
                className="form-control"
                id="#"
                value={driver?.documents?.upi_id || ""}
                onChange={(e) => dispatch(setUpiId(e.target.value))}
                placeholder="UPI ID"
              />
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-12 col-xl-6">
          <div className="form-group">
            <label for="#">Upload Driving License</label>
            {driver?.documents?.dl_document && (
              <img
                src={driver?.documents?.dl_document}
                alt="id-proof"
                className="img-fluid"
                style={{ display: "block", margin: "auto" }}
              />
            )}
            <input
              type="file"
              title="choose new file"
              onChange={(e) =>
                dispatch(uploadDrivingLicense(e.target.files[0]))
              }
              className="form-control"
              id="#"
            />

            {dl_loading && (
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            )}
          </div>
        </div>
      </ModalSubmit>
    </div>
  );
};

export default Edit;
