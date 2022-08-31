import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendNotifications,
  getNotificationById,
  deleteNotifications,
  getNotifications,
  setUserGroup,
  setTitle,
  setMessage,
} from "../../store/slice/notifications-slice";
import { ToastContainer, toast } from "react-toastify";
import Delete from "./delete";
import { Pagination } from "../../layout";

const Notifications = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotifications());
  }, []);

  const [page, setPage] = useState(1);

  const { notifications, notification, numberOfPage, input_form_data } =
    useSelector((state) => state.notifications);

  const send = () => {
    dispatch(sendNotifications())
      .unwrap()
      .then((r) => {
        toast.warn("Notification Sent", { type: "success" });
      })
      .catch((e) => {
        toast.warn("Something Wrong !", { type: "error" });
      });
  };

  return (
    <div className="content-wrapper">
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Send Notifications</h4>
            <div className="d-flex justify-content-center">
              {/* <button className={select === "all" ? "btn btn-primary" : "btn btn-outline-primary"} onClick={() => dispatch(setSelect("all"))}>All</button>
                            <button className={select === "loader" ? "btn btn-success mx-2" : "btn btn-outline-success mx-2"} onClick={() => dispatch(setSelect("loader"))}>Loader</button>
                            <button className={select === "transporter" ? "btn btn-danger mx-2" : "btn btn-outline-danger mx-2"} onClick={() => dispatch(setSelect("transporter"))}>Transporter</button>
                            <button className={select === "driver" ? "btn btn-info mx-2" : "btn btn-outline-info mx-2"} onClick={() => dispatch(setSelect("driver"))}>Driver</button> */}
              <label>
                <div className=" btn btn-outline-primary w-100 p-2 ">
                  <input
                    type="radio"
                    name="select"
                    value="all"
                    onChange={(e) => dispatch(setUserGroup(e.target.value))}
                  />{" "}
                  All
                </div>
              </label>
              <label>
                <div className="mx-2 btn btn-outline-primary w-100 p-2">
                  <input
                    type="radio"
                    value="loader"
                    name="select"
                    onChange={(e) => dispatch(setUserGroup(e.target.value))}
                  />{" "}
                  Loader
                </div>
              </label>
              <label>
                <div className="mx-3 btn btn-outline-primary w-100 p-2">
                  <input
                    type="radio"
                    name="select"
                    value="transporter"
                    onChange={(e) => dispatch(setUserGroup(e.target.value))}
                  />{" "}
                  Transporter
                </div>
              </label>
              <label>
                <div className="mx-4 btn btn-outline-primary w-100 p-2">
                  <input
                    type="radio"
                    name="select"
                    value="driver"
                    onChange={(e) => dispatch(setUserGroup(e.target.value))}
                  />{" "}
                  driver
                </div>
              </label>
            </div>

            <form className="forms-sample">
              <div className="form-group">
                <label for="#">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="#"
                  autoComplete="off"
                  value={input_form_data?.title}
                  onChange={(e) => dispatch(setTitle(e.target.value))}
                />
              </div>

              <div class="form-group">
                <label for="exampleTextarea1">Message</label>
                <textarea
                  class="form-control"
                  id="exampleTextarea1"
                  rows="12"
                  placeholder="Type message..."
                  value={input_form_data?.message}
                  onChange={(e) => dispatch(setMessage(e.target.value))}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary mr-2 btn-icon-text w-25"
                onClick={() => send()}
              >
                Send
              </button>
            </form>
          </div>

          <div className="card-body ">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>SI NO</th>
                    <th>Title</th>
                    <th>Message</th>
                    <th>User Group</th>
                  </tr>
                </thead>
                <tbody>
                  {notifications?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item?.title}</td>
                        <td>{item?.message} </td>
                        <td>{item?.user_group} </td>
                        <td>
                          <div class="dropdown">
                            <button
                              class="btn btn-success "
                              type="button"
                              data-toggle="modal"
                              data-target="#modal-notification-delete"
                              onClick={() => {
                                dispatch(getNotificationById(item._id));
                              }}
                            >
                              <i className="ti-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Pagination setPage={setPage} page={page} pages={numberOfPage} />
            </div>
          </div>
        </div>
      </div>
      <Delete
        data={notification}
        onClick={() => {
          dispatch(deleteNotifications(notification?._id))
            .unwrap()
            .then((r) => {
              toast.warn("Deleted Successfully...", { type: "success" });
            })
            .catch((e) => {
              toast.warn("Something Wrong !", { type: "error" });
            });
        }}
      />
      <ToastContainer />
    </div>
  );
};

export default Notifications;
