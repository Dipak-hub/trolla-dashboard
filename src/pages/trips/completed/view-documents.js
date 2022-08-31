import React from "react";
import { ModalView } from "../../../component";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const ViewDocuments = ({ data: complete }) => {
  return (
    <ModalView
      title="completed trip documents"
      modalId="modal-completed-view-documents"
      cancelButtonText="Ok"
      size="xl"
    >
      <div className="form-group">
        <label for="#" className="font-weight-bold">
          E-Way Bill :
        </label>
        <div className="container list-group-item">
          {complete?.documents?.e_way_bill == null ? (
            "E-Way not uploaded"
          ) : (
            <TransformWrapper>
              <TransformComponent>
                <img
                  src={complete?.documents?.e_way_bill}
                  alt="e_way_bill"
                  className="img-fluid"
                  style={{ display: "block", margin: "auto" }}
                />
              </TransformComponent>
            </TransformWrapper>
          )}

          <div className="d-flex justify-content-end mt-2">
            <a href={complete?.documents?.e_way_bill}>
              <button
                type="button"
                class="btn btn-primary "
                disabled={complete?.documents?.e_way_bill ? false : true}
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
          {complete?.documents?.weight_slip == null ? (
            "Weight Slip not uploaded"
          ) : (
            <TransformWrapper>
              <TransformComponent>
                <img
                  src={complete?.documents?.weight_slip}
                  alt="weight_slip"
                  className="img-fluid"
                  style={{ display: "block", margin: "auto" }}
                />
              </TransformComponent>
            </TransformWrapper>
          )}

          <div className="d-flex justify-content-end mt-2">
            <a href={complete?.documents?.weight_slip}>
              <button
                type="button"
                class="btn btn-primary "
                disabled={complete?.documents?.weight_slip ? false : true}
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
          Load Receipt :
        </label>
        <div className="container list-group-item">
          {complete?.documents?.load_receipt == null ? (
            "Load receipt not uploaded"
          ) : (
            <TransformWrapper>
              <TransformComponent>
                <img
                  src={complete?.documents?.load_receipt}
                  alt="load_receipt"
                  className="img-fluid"
                  style={{ display: "block", margin: "auto" }}
                />
              </TransformComponent>
            </TransformWrapper>
          )}

          <div className="d-flex justify-content-end mt-2">
            <a href={complete?.documents?.load_receipt}>
              <button
                type="button"
                class="btn btn-primary "
                disabled={complete?.documents?.load_receipt ? false : true}
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
          {complete?.documents?.invoice == null ? (
            "Invoice not uploaded"
          ) : (
            <TransformWrapper>
              <TransformComponent>
                <img
                  src={complete?.documents?.invoice}
                  alt="invoice"
                  className="img-fluid"
                  style={{ display: "block", margin: "auto" }}
                />
              </TransformComponent>
            </TransformWrapper>
          )}

          <div className="d-flex justify-content-end mt-2">
            <a href={complete?.documents?.invoice}>
              <button
                type="button"
                class="btn btn-primary "
                disabled={complete?.documents?.invoice ? false : true}
                onClick={() => {}}
              >
                download
              </button>
            </a>
          </div>
        </div>
      </div>
    </ModalView>
  );
};

export default ViewDocuments;
