import { ModalSubmit } from "../../component";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserName,
  setMobilePrimary,
  setEmail,
  setAddress,
  updateLoaders,
  uploadAddressProof,
  uploadIdProof,
  setMobileSecondary,
  setPanNumber,
  setGstNumber,
} from "../../store/slice/loaders-slice";

const Edit = () => {
  const dispatch = useDispatch();
  const { id_proof_loading, address_proof_loading, loader } = useSelector(
    (state) => state.loaders
  );

  return (
    <ModalSubmit
      title="Edit User"
      modalId="modal-loader-edit"
      size="xl"
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(updateLoaders())
          .unwrap()
          .then((r) => {
            toast.warn("Loader Updated successfully...", { type: "success" });
          })
          .catch((e) => {
            toast.warn(e?.message, { type: "error" });
          });
      }}
    >
      <div className="row">
        <div className="col-md-6 col-sm-12 col-xl-6">
          <div className="form-group">
            <label htmlFor="#">Mobile Primary</label>
            <input
              type="number"
              className="form-control"
              id="#"
              value={loader?.mobile_primary}
              disabled="true"
            />
          </div>
          <div className="form-group">
            <label htmlFor="#">Username</label>
            <input
              type="text"
              maxLength="30"
              minLength="3"
              className="form-control"
              id="#"
              value={loader?.user_name || ""}
              onChange={(e) => dispatch(setUserName(e.target.value))}
              placeholder="Username"
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
              value={loader?.mobile_secondary || ""}
              onChange={(e) => dispatch(setMobileSecondary(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="#">Email address</label>
            <input
              type="email"
              className="form-control"
              id="#"
              value={loader?.email || ""}
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
              value={loader?.address || ""}
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
              value={loader?.documents?.pan_number || ""}
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
              value={loader?.documents?.gst_number || ""}
              onChange={(e) => dispatch(setGstNumber(e.target.value))}
              placeholder="GST number"
            />
          </div>
        </div>

        <div className="col-md-6 col-sm-12 col-xl-6">
          <div className="form-group">
            <label for="#">Upload ID Proof</label>
            {loader?.documents?.id_proof && (
              <img
                src={loader?.documents?.id_proof}
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
            {loader?.documents?.address_proof && (
              <img
                src={loader?.documents?.address_proof}
                alt="id-proof"
                className="img-fluid"
                style={{ display: "block", margin: "auto" }}
              />
            )}
            <input
              type="file"
              title="choose new file"
              onChange={(e) => dispatch(uploadAddressProof(e.target.files[0]))}
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
  );
};

export default Edit;
