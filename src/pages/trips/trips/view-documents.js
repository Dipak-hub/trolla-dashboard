import React from "react";
import { ModalView } from "../../../component";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const ViewDocuments = ({ data: booking }) => {
  return (
    <div>
      <ModalView
        title="documents"
        modalId="modal-booking-view-documents"
        cancelButtonText="Ok"
        size="xl"
      >
        <div className="container"></div>

        <div className="form-group">
          <label for="#" className="font-weight-bold">
            E-Way Bill :
          </label>
          <div className="container list-group-item">
            {booking?.documents?.e_way_bill == null ? (
              "Image not uploaded"
            ) : (
              <TransformWrapper>
                <TransformComponent>
                  <img
                    src={booking?.documents?.e_way_bill}
                    alt="e way bill"
                    className="img-fluid"
                    style={{ display: "block", margin: "auto" }}
                  />
                </TransformComponent>
              </TransformWrapper>
            )}

            <div className="d-flex justify-content-end mt-2">
              <a href={booking?.documents?.e_way_bill}>
                <button
                  type="button"
                  class="btn btn-primary "
                  disabled={booking?.documents?.e_way_bill ? false : true}
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
            {booking?.documents?.weight_slip == null ? (
              "Image not uploaded"
            ) : (
              <TransformWrapper>
                <TransformComponent>
                  <img
                    src={booking?.documents?.weight_slip}
                    alt="weight slip"
                    className="img-fluid"
                    style={{ display: "block", margin: "auto" }}
                  />
                </TransformComponent>
              </TransformWrapper>
            )}

            <div className="d-flex justify-content-end mt-2">
              <a href={booking?.documents?.weight_slip}>
                <button
                  type="button"
                  class="btn btn-primary "
                  disabled={booking?.documents?.weight_slip ? false : true}
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
            Load receipt :
          </label>
          <div className="container list-group-item">
            {booking?.documents?.load_receipt == null ? (
              "Image not uploaded"
            ) : (
              <TransformWrapper>
                <TransformComponent>
                  <img
                    src={booking?.documents?.load_receipt}
                    alt="load receipt"
                    className="img-fluid"
                    style={{ display: "block", margin: "auto" }}
                  />
                </TransformComponent>
              </TransformWrapper>
            )}

            <div className="d-flex justify-content-end mt-2">
              <a href={booking?.documents?.load_receipt}>
                <button
                  type="button"
                  class="btn btn-primary "
                  disabled={booking?.documents?.load_receipt ? false : true}
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
            {booking?.documents?.invoice == null ? (
              "Image not uploaded"
            ) : (
              <TransformWrapper>
                <TransformComponent>
                  <img
                    src={booking?.documents?.invoice}
                    alt="invoice"
                    className="img-fluid"
                    style={{ display: "block", margin: "auto" }}
                  />
                </TransformComponent>
              </TransformWrapper>
            )}

            <div className="d-flex justify-content-end mt-2">
              <a href={booking?.documents?.invoice}>
                <button
                  type="button"
                  class="btn btn-primary "
                  disabled={booking?.documents?.invoice ? false : true}
                  onClick={() => {}}
                >
                  download
                </button>
              </a>
            </div>
          </div>
        </div>
      </ModalView>
    </div>
  );
};

export default ViewDocuments;
