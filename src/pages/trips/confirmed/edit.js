import React from "react";
import { ModalSubmit, ModalView } from "../../../component";
import {
  uploadEWayBill,
  uploadInvoice,
  uploadLoadReceipt,
  uploadWeightSlip,
} from "../../../store/slice/confirmed-trips-slice";
import { useDispatch, useSelector } from "react-redux";

const Edit = ({ data: confirm }) => {
  const dispatch = useDispatch();
  const {
    e_way_bill_loading,
    weight_slip_loading,
    load_receipt_loading,
    invoice_loading,
  } = useSelector((state) => state.confirmed_trips);
  return (
    <ModalView
      title="Upload documents"
      modalId="modal-confirmed-trip-edit"
      cancelButtonText="Ok"
    >
      <form>
        <div className="form-group">
          <label for="#">Load No</label>
          <input
            type="text"
            className="form-control"
            id="#"
            value={confirm?.load?.load_no}
            placeholder="Load No"
          />
        </div>

        <div className="form-group">
          <label for="#" className="font-weight-bold">
            E-Way Bill
          </label>
          <input
            type="file"
            onChange={(e) => dispatch(uploadEWayBill(e.target.files[0]))}
            className="form-control"
            id="#"
          />

          <div className="d-flex justify-content-end ">
            {confirm?.documents?.weight_slip ? (
              <img
                src={confirm?.documents?.e_way_bill}
                width="80"
                height="50"
              />
            ) : (
              ""
            )}
          </div>

          {e_way_bill_loading ? (
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="form-group">
          <label for="#" className="font-weight-bold">
            Weight Slip
          </label>
          <input
            type="file"
            onChange={(e) => dispatch(uploadWeightSlip(e.target.files[0]))}
            className="form-control"
            id="#"
          />
          <div className="d-flex justify-content-end ">
            {confirm?.documents?.weight_slip ? (
              <img
                src={confirm?.documents?.weight_slip}
                width="80"
                height="50"
              />
            ) : (
              ""
            )}
          </div>
          {weight_slip_loading ? (
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="form-group">
          <label for="#" className="font-weight-bold">
            Load Receipt
          </label>
          <input
            type="file"
            onChange={(e) => dispatch(uploadLoadReceipt(e.target.files[0]))}
            className="form-control"
            id="#"
          />
          <div className="d-flex justify-content-end ">
            {confirm?.documents?.load_receipt ? (
              <img
                src={confirm?.documents?.load_receipt}
                width="80"
                height="50"
              />
            ) : (
              ""
            )}
          </div>
          {load_receipt_loading ? (
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="form-group">
          <label for="#" className="font-weight-bold">
            Invoice
          </label>
          <input
            type="file"
            onChange={(e) => dispatch(uploadInvoice(e.target.files[0]))}
            className="form-control"
            id="#"
          />
          <div className="d-flex justify-content-end ">
            {confirm?.documents?.invoice ? (
              <img src={confirm?.documents?.invoice} width="80" height="50" />
            ) : (
              ""
            )}
          </div>
          {invoice_loading ? (
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
            ""
          )}
        </div>
      </form>
    </ModalView>
  );
};

export default Edit;
