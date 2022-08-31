import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { ModalSubmit } from "../../component";
import {
  createDriver,
  setAccountNumber,
  setAddress,
  setDriverName,
  setEmail,
  setIfscCode,
  setMobilePrimary,
  setMobileSecondary,
  setNameInBank,
  setTransporter,
  setUpiId,
} from "../../store/slice/drivers-slice";
import { getAllTransporters } from "../../store/slice/transporters-slice";

import Select from "react-select";

const Add = () => {
  useEffect(() => {
    // fetch all transporters for dropdown list selector
    dispatch(getAllTransporters());
  }, []);

  const { all_transporter } = useSelector((state) => state.transporters);

  const { error_message, exist_message, driver } = useSelector(
    (state) => state.drivers
  );

  const dispatch = useDispatch();

  return (
    <div>
      <ModalSubmit
        title="Add user"
        modalId="modal-driver-add"
        size="xl"
        disableButton={
          driver.transporter_id && driver.user_name && driver.mobile_primary
            ? false
            : true
        }
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(createDriver())
            .unwrap()
            .then((r) => {
              toast.warn("Driver Added successfully...", { type: "success" });
            })
            .catch((e) => {
              toast.warn(e?.message, { type: "error" });
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
              <label htmlFor="#">Transporters</label>

              <Select
                id="react-select-tag"
                isClearable
                options={all_transporter}
                // hideSelectedOptions={false}
                getOptionLabel={(item) => item.user_name}
                getOptionValue={(item) => ({ _id: item._id })}
                onChange={(e) => dispatch(setTransporter(e))}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="#">Unique Mobile Number</label>
              <input
                type="text"
                maxLength="10"
                minLength="10"
                className="form-control"
                id="#"
                onChange={(e) => dispatch(setMobilePrimary(e.target.value))}
                placeholder="Mobile Primary"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="#">Driver Name</label>
              <input
                type="text"
                maxLength="40"
                minLength="3"
                className="form-control"
                id="#"
                onChange={(e) => dispatch(setDriverName(e.target.value))}
                placeholder="Driver Name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="#">Mobile Secondary</label>
              <input
                type="text"
                maxLength="10"
                minLength="10"
                className="form-control"
                id="#"
                onChange={(e) => dispatch(setMobileSecondary(e.target.value))}
                placeholder="Mobile Secondary"
              />
            </div>
            <div className="form-group">
              <label htmlFor="#">Email address</label>
              <input
                type="email"
                className="form-control"
                id="#"
                onChange={(e) => dispatch(setEmail(e.target.value))}
                placeholder="Email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="#">Address</label>
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
              <label for="#">Name In Bank</label>
              <input
                type="text"
                maxLength="40"
                minLength="3"
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
    </div>
  );
};

export default Add;
