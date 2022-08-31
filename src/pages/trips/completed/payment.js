import React, { useState, useEffect } from "react";
import { ModalView } from "../../../component";
import { UserStatusIndicator } from "../../../component";
import { useDispatch, useSelector } from "react-redux";
import {
  clearVendor,
  razorPayPayout,
  setRazorPayVendor,
} from "../../../store/slice/in-transactions-slice";

const Payment = ({ data }) => {
  const [input, setInput] = useState({
    deducted_amount: "",
    commission_percentage: "",
    deducted_reason: "",
    notes: "",
  });
  const dispatch = useDispatch();

  const { razor_pay_out_response } = useSelector(
    (state) => state.in_transactions
  );

  const { completed_trip } = useSelector((state) => state.completed_trips);

  // const { user_name, email, mobile_primary } = completed_trip?.transporter;

  // const { name_in_bank, ifsc_code, account_number, upi_id } =
  //   completed_trip?.transporter?.documents;

  useEffect(() => {
    if (
      completed_trip?.transporter?.user_name &&
      completed_trip?.transporter?.email &&
      completed_trip?.transporter?.mobile_primary &&
      completed_trip?.transporter?.documents?.name_in_bank &&
      completed_trip?.transporter?.documents?.ifsc_code &&
      completed_trip?.transporter?.documents?.account_number
    ) {
      dispatch(
        setRazorPayVendor({
          name: completed_trip?.transporter?.user_name,
          email: completed_trip?.transporter?.email,
          contact: completed_trip?.transporter?.mobile_primary,
          // reference_id: "wedfidwjiodwedjioejidejidjdj",
          bank_holder_name:
            completed_trip?.transporter?.documents?.name_in_bank,
          ifsc: completed_trip?.transporter?.documents?.ifsc_code,
          account_number:
            completed_trip?.transporter?.documents?.account_number,
        })
      );
    } else {
      dispatch(clearVendor());
    }
  }, [completed_trip]);

  const payoutHandle = () => {
    if (razor_pay_out_response?.active) {
      dispatch(
        razorPayPayout({
          fund_account_id: razor_pay_out_response?.id,
          amount: completed_trip?.quotation?.amount,
        })
      );
    }
  };

  return (
    <ModalView
      title="Completed trip Payment"
      modalId="modal-complete-payment-documents"
      cancelButtonText="Ok"
      size="xl"
    >
      <div>
        <UserStatusIndicator
          status={razor_pay_out_response?.active ? "Active" : "Inactive"}
        />
      </div>
      <div className="row">
        <div className="col-md-6 col-sm-12 col-xl-6">
          <ul className="list-group list-group-flush">
            {/* <li className="list-group-item">
              <b>Load No :</b> {load_no}
            </li> */}
            <li className="list-group-item">
              <b>Transporter :</b> {completed_trip?.transporter?.user_name}
            </li>
            <li className="list-group-item">
              <b>Account Number :</b>{" "}
              {completed_trip?.transporter?.documents?.account_number}
            </li>
            <li className="list-group-item">
              <b>IFCS Code :</b>{" "}
              {completed_trip?.transporter?.documents?.ifsc_code}
            </li>
            <li className="list-group-item">
              <b>Name in Bank Account :</b>{" "}
              {completed_trip?.transporter?.documents?.name_in_bank}
            </li>
            <li className="list-group-item">
              <b>UPI Id :</b> {completed_trip?.transporter?.documents?.upi_id}
            </li>
          </ul>
        </div>
        {/* <div className="col-md-6 col-sm-12 col-xl-6">
          <form className="forms-sample">
            <div className="form-group">
              <label for="#">Deducted Amounts</label>
              <input
                type="text"
                maxLength="25"
                className="form-control"
                id="#"
                // onChange={(e) => dispatch(setUserName(e.target.value))}
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    deducted_amount: e.target.value,
                  }))
                }
                placeholder="Deducted Amounts"
                required
              />
            </div>
            <div className="form-group">
              <label for="#">Commission Percentage</label>
              <input
                type="text"
                maxLength="25"
                className="form-control"
                id="#"
                // onChange={(e) => dispatch(setUserName(e.target.value))}
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    commission_percentage: e.target.value,
                  }))
                }
                placeholder="Commission Percentage"
              />
            </div>
            <div className="form-group">
              <label for="#">Deducted Reason</label>
              <input
                type="text"
                maxLength="40"
                className="form-control"
                id="#"
                // onChange={(e) => dispatch(setUserName(e.target.value))}
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    deducted_reason: e.target.value,
                  }))
                }
                placeholder="Deducted Reason"
              />
            </div>

            <div className="form-group">
              <label for="#">Notes </label> <br />
              <textarea
                rows="4"
                cols="50"
                className="form-control"
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    notes: e.target.value,
                  }))
                }
              />{" "}
            </div>
          </form>
          <button className="btn btn-primary w-25">Submit</button>
          <ul>
            <li className="list-group-item">
              <b>Quotation Amount :</b> {data?.quotation?.amount}{" "}
            </li>
            <li className="list-group-item">
              <b>Payment id :</b> {data?.values?.completed_details?.payment_id}
            </li>
            <li className="list-group-item">
              <b>Paid :</b> {data?.values?.completed_details?.amount}
            </li>
          </ul>
        </div> */}

        <div className="col-md-6 col-sm-12 col-xl-6">
          <ul>
            <li className="list-group-item">
              <b>Total Trip Amount :</b> {completed_trip?.quotation?.amount}{" "}
            </li>
          </ul>

          <form className="forms-sample"></form>
          <button
            className="btn btn-primary w-25"
            disabled={!razor_pay_out_response?.active}
            onClick={() => {
              payoutHandle();
            }}
          >
            Pay
          </button>
        </div>
      </div>
    </ModalView>
  );
};

export default Payment;
