import React from "react";
import { ModalView } from "../../../component";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
//--
const ViewDocuments = ({ data: close_trip }) => {
  return (
    <ModalView
      title="close trip documents"
      modalId="modal-close-tri-view-documents"
      cancelButtonText="Ok"
      size="xl"
    >
      <div className="container">
        <div className="form-group">
          <label for="#" className="font-weight-bold">
            E-Way Bill :
          </label>
          <div className="container list-group-item">
            {close_trip?.documents?.e_way_bill == null ? (
              "Image not uploaded"
            ) : (
              <TransformWrapper>
                <TransformComponent>
                  <img
                    src={close_trip?.documents?.e_way_bill}
                    alt="e way bill"
                    className="img-fluid"
                    style={{ display: "block", margin: "auto" }}
                  />
                </TransformComponent>
              </TransformWrapper>
            )}

            <div className="d-flex justify-content-end mt-2">
              <a href={close_trip?.documents?.e_way_bill}>
                <button
                  type="button"
                  class="btn btn-primary "
                  disabled={close_trip?.documents?.e_way_bill ? false : true}
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
            Weight Slip :
          </label>
          <div className="container list-group-item">
            {close_trip?.documents?.weight_slip == null ? (
              "Image not uploaded"
            ) : (
              <TransformWrapper>
                <TransformComponent>
                  <img
                    src={close_trip?.documents?.weight_slip}
                    alt="weight slip"
                    className="img-fluid"
                    style={{ display: "block", margin: "auto" }}
                  />
                </TransformComponent>
              </TransformWrapper>
            )}

            <div className="d-flex justify-content-end mt-2">
              <a href={close_trip?.documents?.weight_slip}>
                <button
                  type="button"
                  class="btn btn-primary "
                  disabled={close_trip?.documents?.weight_slip ? false : true}
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
            Load reciept :
          </label>
          <div className="container list-group-item">
            {close_trip?.documents?.load_receipt == null ? (
              "Image not uploaded"
            ) : (
              <TransformWrapper>
                <TransformComponent>
                  <img
                    src={close_trip?.documents?.load_receipt}
                    alt="load receipt"
                    className="img-fluid"
                    style={{ display: "block", margin: "auto" }}
                  />
                </TransformComponent>
              </TransformWrapper>
            )}

            <div className="d-flex justify-content-end mt-2">
              <a href={close_trip?.documents?.load_receipt}>
                <button
                  type="button"
                  class="btn btn-primary "
                  disabled={close_trip?.documents?.load_receipt ? false : true}
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
            <b>Invoice :</b>
          </label>
          <div className="container list-group-item">
            {close_trip?.documents?.invoice == null ? (
              "Image not uploaded"
            ) : (
              <TransformWrapper>
                <TransformComponent>
                  <img
                    src={close_trip?.documents?.invoice}
                    alt="invoice"
                    className="img-fluid"
                    style={{ display: "block", margin: "auto" }}
                  />
                </TransformComponent>
              </TransformWrapper>
            )}

            <div className="d-flex justify-content-end mt-2">
              <a href={close_trip?.documents?.invoice}>
                <button
                  type="button"
                  class="btn btn-primary "
                  disabled={close_trip?.documents?.invoice ? false : true}
                  onClick={() => {}}
                >
                  download
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </ModalView>
  );
};

export default ViewDocuments;
