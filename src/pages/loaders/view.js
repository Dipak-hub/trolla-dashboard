import { Link } from "react-router-dom";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useDispatch, useSelector } from "react-redux";
import { ModalView, StatusChangerButton } from "../../component";
import { changeLoadersStatus } from "../../store/slice/loaders-slice";
const View = () => {
  const { loader } = useSelector((state) => state.loaders);
  return (
    <ModalView
      title="Loader Details"
      modalId="modal-loader-details"
      size="xl"
      cancelButtonText="Ok"
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
            status={loader?.status}
            id={loader?._id}
            changeStatus={changeLoadersStatus}
          />
        </div>
        <img
          src={
            loader?.profile_pic == null
              ? "images/profile.png"
              : `${loader?.profile_pic}`
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
              <b>User Name :</b> {loader?.user_name}
            </li>
            <li className="list-group-item">
              <b>Mobile Primary :</b> {loader?.mobile_primary}
            </li>
            <li className="list-group-item">
              <b> Mobile Secondary :</b> {loader?.mobile_secondary}
            </li>
            <li className="list-group-item">
              <b>Email : </b>
              {loader?.email}
            </li>
            <li className="list-group-item">
              <b>Address :</b> {loader?.address}
            </li>

            {loader?.documents?.pan_number ? (
              <li className="list-group-item">
                <b>PAN Number :</b> {loader?.documents?.pan_number}
              </li>
            ) : (
              ""
            )}

            {loader?.documents?.gst_number ? (
              <li className="list-group-item">
                <b>GST Number :</b> {loader?.documents?.gst_number}
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>

        <div className="col-md-6 col-sm-12 col-xl-6">
          <div className="form-group">
            <label for="#" className="font-weight-bold">
              ID Proof :
            </label>
            <div className="container list-group-item">
              {loader?.documents?.id_proof == null ? (
                "Documents not uploaded"
              ) : (
                <TransformWrapper>
                  <TransformComponent>
                    <img
                      src={loader?.documents?.id_proof}
                      alt="id-proof"
                      className="img-fluid"
                      style={{
                        display: "block",
                        margin: "auto",
                        width: "100%",
                      }}
                    />
                  </TransformComponent>
                </TransformWrapper>
              )}

              <div className="d-flex justify-content-end mt-2">
                <a href={loader?.documents?.id_proof}>
                  <button
                    type="button"
                    className="btn btn-primary "
                    disabled={loader?.documents?.id_proof ? false : true}
                    onClick={() => {}}
                  >
                    download
                  </button>
                </a>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label for="#" className="font-weight-bold">
              Address Proof :
            </label>
            <div className="container list-group-item">
              {loader?.documents?.address_proof == null ? (
                "Documents not uploaded"
              ) : (
                <TransformWrapper>
                  <TransformComponent>
                    <img
                      src={loader?.documents?.address_proof}
                      alt="id-proof"
                      className="img-fluid"
                      style={{ display: "block", margin: "auto" }}
                    />
                  </TransformComponent>
                </TransformWrapper>
              )}

              <div className="d-flex justify-content-end mt-2">
                <a href={loader?.documents?.address_proof}>
                  <button
                    type="button"
                    className="btn btn-primary "
                    disabled={loader?.documents?.address_proof ? false : true}
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
  );
};

export default View;
