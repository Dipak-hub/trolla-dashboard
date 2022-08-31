import { useSelector, useDispatch } from "react-redux";

const VisibleStatusUpdater = ({ bootstapId, id, status, changeStatus }) => {
  const dispatch = useDispatch();
  let className = status
    ? "btn btn-success dropdown-toggle"
    : "btn btn-danger dropdown-toggle";
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
        {status ? "Visible" : "Not Visible"}
      </button>

      <div className="dropdown-menu" aria-labelledby={bootstapId}>
        <a
          className="dropdown-item"
          href="#"
          onClick={() => {
            dispatch(changeStatus({ id, visible: true }));
          }}
        >
          Visible
        </a>
        <a
          className="dropdown-item"
          href="#"
          onClick={() => {
            dispatch(changeStatus({ id, visible: false }));
          }}
        >
          Hide
        </a>
      </div>
    </>
  );
};

export default VisibleStatusUpdater;
