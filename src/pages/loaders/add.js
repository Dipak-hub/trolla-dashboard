import { useState } from "react";
import { ModalSubmit } from "../../component";
import { useDispatch, useSelector } from "react-redux";
import {
  createLoaders,
  setGstNumber,
  setPanNumber,
} from "../../store/slice/loaders-slice";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import {
  setUserName,
  setMobilePrimary,
  setMobileSecondary,
  setEmail,
  setAddress,
  setIDProof,
  setAddressProof,
} from "../../store/slice/loaders-slice";

const Add = () => {
  const dispatch = useDispatch();
  const { error_message, loader } = useSelector((state) => state.loaders);

  return (
    <ModalSubmit
      title="Add User"
      modalId="modal-loader-add"
      size="xl"
      disableButton={
        loader?.mobile_primary && loader?.user_name && loader?.email
          ? false
          : true
      }
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(createLoaders())
          .unwrap()
          .then((r) => {
            toast.warn("User Added successfully...", { type: "success" });
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
            <label for="#">Unique Mobile Number</label>
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
            <label for="#">Loader Name</label>
            <input
              type="text"
              maxLength="40"
              minLength="3"
              className="form-control"
              id="#"
              onChange={(e) => dispatch(setUserName(e.target.value))}
              placeholder="Loader Name"
              required
            />
          </div>
          <div className="form-group">
            <label for="#">Mobile Secondary</label>
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
              minLength="10"
              maxLength="10"
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
        </div>
      </div>
    </ModalSubmit>
  );
};

export default Add;
