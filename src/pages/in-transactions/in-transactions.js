import React, { useEffect, useState } from "react";
import { UserStatusIndicator } from "../../component";
import { Pagination } from "../../layout";
import { useDispatch, useSelector } from "react-redux";
import View from "./view";
import {
  getInTransactions,
  getTransactionById,
} from "../../store/slice/in-transactions-slice";

const InTransactions = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  // console.log(page);
  useEffect(() => {
    dispatch(getInTransactions(+page));
  }, [page]);

  const { transactions, transaction, numberOfPage } = useSelector(
    (state) => state.in_transactions
  );

  return (
    <div className="content-wrapper">
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">In Transactions Details</h4>

            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>SI NO</th>
                    <th>Payment id</th>
                    <th>Entity</th>
                    <th>Amount</th>
                    <th>Order id</th>
                    <th>Payment method</th>
                    <th>Status</th>
                    <th>VPA</th>
                    <th>Refunded</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {item?.transaction?.payload?.payment?.entity?.id}
                        </td>
                        <td>
                          {" "}
                          {item?.transaction?.payload?.payment?.entity?.entity}
                        </td>
                        <td>
                          {" "}
                          {item?.transaction?.payload?.payment?.entity?.amount}
                        </td>
                        <td>
                          {" "}
                          {
                            item?.transaction?.payload?.payment?.entity
                              ?.order_id
                          }
                        </td>
                        <td>
                          {" "}
                          {item?.transaction?.payload?.payment?.entity?.method}
                        </td>
                        <td>
                          {" "}
                          <UserStatusIndicator
                            status={
                              item?.transaction?.payload?.payment?.entity
                                ?.status
                            }
                          />
                        </td>
                        <td>
                          {item?.transaction?.payload?.payment?.entity?.vpa}
                        </td>
                        <td>
                          {" "}
                          {
                            item?.transaction?.payload?.payment?.entity
                              ?.amount_refunded
                          }
                        </td>
                        <td>
                          {" "}
                          {
                            item?.transaction?.payload?.payment?.entity
                              ?.description
                          }
                        </td>
                        <td> {item?.transaction?.createdAt}</td>
                        <td>
                          <div className="dropdown">
                            <button
                              type="button"
                              className="btn btn-success dropdown-toggle"
                              id="dropdownMenuIconButton9"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i className="ti-truck"></i>
                            </button>
                            <div
                              className="dropdown-menu"
                              aria-labelledby="dropdownMenuIconButton9"
                            >
                              {/* <h6 className="dropdown-header">Action</h6> */}
                              <a
                                className="dropdown-item"
                                href="#"
                                data-toggle="modal"
                                data-target="#modal-transaction-view"
                                onClick={() => {
                                  dispatch(getTransactionById(item?._id));
                                }}
                              >
                                View Details
                              </a>

                              {/* <a className="dropdown-item" href="#">
                                Delete
                              </a> */}
                              {/* <div className="dropdown-divider"></div> */}
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          {/* use pagination----------------------> */}
          <Pagination
            setPage={setPage}
            page={page}
            pages={numberOfPage}
            changePage={setPage}
          />
        </div>
      </div>

      {/* view modal use------------------ */}
      <View data={transaction} />
    </div>
  );
};

export default InTransactions;
