import { useSelector, useDispatch } from "react-redux";

const StatusUpdater = ({ bootstapId, id, status, changeStatus }) => {
  const dispatch = useDispatch();
  let className = "";
  switch (status) {
    case "Verified":
      className = "btn btn-success dropdown-toggle";
      break;
    case "Pending":
      className = "btn btn-warning dropdown-toggle";
      break;
    case "Rejected":
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
            dispatch(changeStatus({ id, status: "Pending" }));
          }}
        >
          Pending
        </a>
        <a
          className="dropdown-item"
          href="#"
          onClick={() => {
            dispatch(changeStatus({ id, status: "Rejected" }));
          }}
        >
          Rejected
        </a>
        <a
          className="dropdown-item"
          href="#"
          onClick={() => {
            dispatch(changeStatus({ id, status: "Verified" }));
          }}
        >
          Verified
        </a>
      </div>
    </>
  );
};

export default StatusUpdater;
