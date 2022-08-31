import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getInfo } from "../store/slice/dashboards-slice";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInfo());
  }, []);

  const { name } = useSelector((state) => state.users.user);

  const { info } = useSelector((state) => state.dashboards);

  // console.log(info);

  return (
    <>
      <div className="content-wrapper">
        <div className="row">
          <div className="col-md-12 grid-margin">
            <div className="row">
              <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                <h3 className="font-weight-bold text-primary">
                  {" "}
                  Welcome, Mr. {name}
                </h3>

                {/* <h6 className="font-weight-normal mb-0">
                  All systems are running smoothly! You have{" "}
                  <span className="text-primary">3 unread alerts!</span>
                </h6> */}
              </div>
              {/* <div className="col-12 col-xl-4">
                <div className="justify-content-end d-flex">
                  <div className="dropdown flex-md-grow-1 flex-xl-grow-0">
                    <button
                      className="btn btn-sm btn-light bg-white dropdown-toggle"
                      type="button"
                      id="dropdownMenuDate2"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="true"
                    >
                      <i className="mdi mdi-calendar"></i> Today (10 Jan 2021)
                    </button>
                    <div
                      className="dropdown-menu dropdown-menu-right"
                      aria-labelledby="dropdownMenuDate2"
                    >
                      <a className="dropdown-item" href="#">
                        January - March
                      </a>
                      <a className="dropdown-item" href="#">
                        March - June
                      </a>
                      <a className="dropdown-item" href="#">
                        June - August
                      </a>
                      <a className="dropdown-item" href="#">
                        August - November
                      </a>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <p className="card-title">Today's Report Details</p>
        <div className="row">
          <div className="col-md-6 grid-margin transparent">
            {/* <p className="card-title">Today's Report Details</p> */}
            <div className="row">
              <div className="col-md-6 mb-4 stretch-card transparent">
                <div className="card card-tale">
                  <div className="card-body">
                    <p className="mb-4">Loads</p>
                    <p className="fs-30 mb-2">{info?.count?.loads?.all || 0}</p>
                    {/* <p>10.00% (30 days)</p> */}
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4 stretch-card transparent">
                <div className="card card-dark-blue">
                  <div className="card-body">
                    <p className="mb-4">Confirmed Trips</p>
                    <p className="fs-30 mb-2">
                      {info?.count?.trips?.confirmed_trip || 0}
                    </p>
                    {/* <p>22.00% (30 days)</p> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-4 mb-lg-0 stretch-card transparent">
                <div className="card card-light-blue">
                  <div className="card-body">
                    <p className="mb-4">In-transit Trips</p>
                    <p className="fs-30 mb-2">
                      {info?.count?.trips?.ongoing_trip || 0}
                    </p>
                    {/* <p>2.00% (30 days)</p> */}
                  </div>
                </div>
              </div>
              <div className="col-md-6 stretch-card transparent">
                <div className="card card-light-danger">
                  <div className="card-body">
                    <p className="mb-4">Closed Trips</p>
                    <p className="fs-30 mb-2">
                      {info?.count?.trips?.closed_trip || 0}
                    </p>
                    {/* <p>0.22% (30 days)</p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 grid-margin transparent">
            {/* <p className="card-title">Today's Report Details</p> */}
            <div className="row">
              <div className="col-md-6 mb-4 stretch-card transparent">
                <div className="card card-tale">
                  <div className="card-body">
                    <p className="mb-4">New Loaders</p>
                    <p className="fs-30 mb-2">
                      {info?.count?.loaders?.all || 0}
                    </p>
                    {/* <p>10.00% (30 days)</p> */}
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4 stretch-card transparent">
                <div className="card card-dark-blue">
                  <div className="card-body">
                    <p className="mb-4">New Partners</p>
                    <p className="fs-30 mb-2">
                      {info?.count?.transporters?.all || 0}
                    </p>
                    {/* <p>22.00% (30 days)</p> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-4 mb-lg-0 stretch-card transparent">
                <div className="card card-light-blue">
                  <div className="card-body">
                    <p className="mb-4"> Total Vehicles</p>
                    <p className="fs-30 mb-2">
                      {info?.count?.vehicles?.all || 0}
                    </p>
                    {/* <p>2.00% (30 days)</p> */}
                  </div>
                </div>
              </div>
              <div className="col-md-6 stretch-card transparent">
                <div className="card card-light-danger">
                  <div className="card-body">
                    <p className="mb-4">Total Drivers</p>
                    <p className="fs-30 mb-2">
                      {info?.count?.drivers?.all || 0}
                    </p>
                    {/* <p>0.22% (30 days)</p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <p className="card-title">Transaction details</p>
                <p className="font-weight-500">Trolla Loader App</p>
                <div className="d-flex flex-wrap mb-5">
                  <div className="mr-5 mt-3">
                    <p className="text-muted">Ongoing trips Pending amount </p>
                    <h3 className="text-primary fs-30 font-weight-medium">
                      {info?.count?.transactions
                        ?.ongoing_trips_pending_amount || 0}
                    </h3>
                  </div>
                  <div className="mr-5 mt-3">
                    <p className="text-muted">Total Amount Received</p>
                    <h3 className="text-primary fs-30 font-weight-medium">
                      {info?.count?.transactions?.trips_total_received_amount ||
                        0}
                    </h3>
                  </div>
                  <div className="mt-3">
                    <p className="text-muted">Total Captured Transaction</p>
                    <h3 className="text-primary fs-30 font-weight-medium">
                      {info?.count?.transactions?.total_captured_transaction ||
                        0}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <p className="card-title">Transporter App Details</p>
                <p className="font-weight-500">
                  Report of the Trolla Transporter App
                </p>
                <div className="d-flex flex-wrap mb-5">
                  <div className="mr-5 mt-3">
                    <p className="text-muted">Downloads</p>
                    <h3 className="text-primary fs-30 font-weight-medium">
                      2000+
                    </h3>
                  </div>
                  <div className="mr-5 mt-3">
                    <p className="text-muted">Total users</p>
                    <h3 className="text-primary fs-30 font-weight-medium">
                      1600
                    </h3>
                  </div>
                  <div className="mr-5 mt-3">
                    <p className="text-muted">App Crash</p>
                    <h3 className="text-primary fs-30 font-weight-medium">8</h3>
                  </div>
                  <div className="mr-5 mt-3">
                    <p className="text-muted">Total Reviews</p>
                    <h3 className="text-primary fs-30 font-weight-medium">
                      100
                    </h3>
                  </div>

                  <div className="mr-5 mt-3">
                    <p className="text-muted">Total Subscriptions</p>
                    <h3 className="text-primary fs-30 font-weight-medium">
                      1100
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
