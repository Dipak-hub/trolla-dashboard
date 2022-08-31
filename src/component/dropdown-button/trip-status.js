import { useSelector, useDispatch } from "react-redux";

const TripStatus = ({ bootstapId, id, status, changeStatus }) => {
  const dispatch = useDispatch();
  let className = "";

  switch (status) {
    case "Created":
      className = "btn btn-success dropdown-toggle";
      break;
    case "Pending":
      className = "btn btn-warning dropdown-toggle";
      break;
    case "Confirmed":
      className = "btn btn-success dropdown-toggle";
      break;
    case "Assigned":
      className = "btn btn-success dropdown-toggle";
      break;
    case "On way":
      className = "btn btn-success dropdown-toggle";
      break;
    case "Loading":
      className = "btn btn-success dropdown-toggle";
      break;
    case "Started":
      className = "btn btn-success dropdown-toggle";
      break;
    case "Completed":
      className = "btn btn-success dropdown-toggle";
      break;
    case "Closed":
      className = "btn btn-danger dropdown-toggle";
      break;
    default:
      className = "btn btn-success dropdown-toggle";
  }
  return (
    <>
      <button
        className={className}
        type="button"
        id={bootstapId}
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {status}
      </button>

      <div className="dropdown-menu" aria-labelledby={bootstapId}>
        <a
          className="dropdown-item"
          href="#"
          onClick={() => {
            dispatch(changeStatus({ id, status: "Created" }));
          }}
        >
          Created
        </a>
        <a
          className="dropdown-item"
          href="#"
          onClick={() => {
            dispatch(changeStatus({ id, status: "Pending" }));
          }}
        >
          Pending
        </a>
        <a
          className="dropdown-item"
          href="#"
          onClick={() => {
            dispatch(changeStatus({ id, status: "Confirmed" }));
          }}
        >
          Confirmed
        </a>

        <a
          className="dropdown-item"
          href="#"
          onClick={() => {
            dispatch(changeStatus({ id, status: "Assigned" }));
          }}
        >
          Assigned
        </a>

        <a
          className="dropdown-item"
          href="#"
          onClick={() => {
            dispatch(changeStatus({ id, status: "On way" }));
          }}
        >
          On way
        </a>
        <a
          className="dropdown-item"
          href="#"
          onClick={() => {
            dispatch(changeStatus({ id, status: "Loading" }));
          }}
        >
          Loading
        </a>

        <a
          className="dropdown-item"
          href="#"
          onClick={() => {
            dispatch(changeStatus({ id, status: "Started" }));
          }}
        >
          Started
        </a>

        <a
          className="dropdown-item"
          href="#"
          onClick={() => {
            dispatch(changeStatus({ id, status: "Completed" }));
          }}
        >
          Completed
        </a>
        <a
          className="dropdown-item"
          href="#"
          onClick={() => {
            dispatch(changeStatus({ id, status: "Closed" }));
          }}
        >
          Closed
        </a>
      </div>
    </>
  );
};
export default TripStatus;
