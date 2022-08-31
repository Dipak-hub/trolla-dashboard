import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModalSubmit } from "../../component";
import {
  createTransporters,
  setUserName,
  setMobilePrimary,
  setMobileSecondary,
  setAddress,
  setGstNumber,
  setPanNumber,
  setEmail,
  setNameInBank,
  setAccountNumber,
  setIfscCode,
  setUpiId,
} from "../../store/slice/transporters-slice";
import { ToastContainer, toast } from "react-toastify";

const Add = () => {
  const dispatch = useDispatch();
  const { error_message, transporter } = useSelector(
    (state) => state.transporters
  );

  return (
    <div>
      <ModalSubmit
        title="Add User"
        modalId="modal-transport-add"
        size="xl"
        disableButton={
          transporter.mobile_primary && transporter.user_name ? false : true
        }
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(createTransporters())
            .unwrap()
            .then((e) => {
              toast.warn("Transporter Added successfully...", {
                type: "success",
              });
            })
            .catch((e) => {
              toast.warn(e.message, { type: "error" });
            });
        }}
      >
        {error_message && (
          <div className="alert alert-info" role="alert">
            <span>{error_message}</span>
          </div>
        )}

        <div className="row">
          <div className="col-md-6 col-sm-12 col-xl-6">
            <div className="form-group">
              <label for="#">Unique Mobile Number</label>
              <input
                type="text"
                maxLength="10"
                minLength="10"
                className="form-control"
                id="#"
                onChange={(e) => dispatch(setMobilePrimary(e.target.value))}
                name="mobile_primary"
                placeholder="Mobile Primary"
                required
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
                onChange={(e) => dispatch(setUserName(e.target.value))}
                placeholder="Name"
                required
              />
            </div>

            <div className="form-group">
              <label for="#">Email address</label>
              <input
                type="email"
                className="form-control"
                id="#"
                onChange={(e) => dispatch(setEmail(e.target.value))}
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <label for="#">Address</label>
              <input
                type="text"
                maxLength="60"
                minLength="3"
                className="form-control"
                id="#"
                onChange={(e) => dispatch(setAddress(e.target.value))}
                placeholder="Address"
                required
              />
            </div>
          </div>

          <div className="col-md-6 col-sm-12 col-xl-6">
            <div className="form-group">
              <label for="#">Company PAN Number</label>
              <input
                type="text"
                maxLength="10"
                minLength="10"
                className="form-control"
                id="#"
                onChange={(e) => dispatch(setPanNumber(e.target.value))}
                placeholder="PAN Number"
                required
              />
            </div>
            <div className="form-group">
              <label for="#">Company GST Number</label>
              <input
                type="text"
                maxLength="15"
                minLength="15"
                className="form-control"
                id="#"
                onChange={(e) => dispatch(setGstNumber(e.target.value))}
                placeholder="GST Number"
                required
              />
            </div>
            <div className="form-group">
              <label for="#">Name In Bank</label>
              <input
                type="text"
                minLength="3"
                maxLength="30"
                className="form-control"
                id="#"
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
                onChange={(e) => dispatch(setUpiId(e.target.value))}
                placeholder="UPI ID"
              />
            </div>
          </div>
        </div>
      </ModalSubmit>
      <ToastContainer />
    </div>
  );
};

export default Add;
