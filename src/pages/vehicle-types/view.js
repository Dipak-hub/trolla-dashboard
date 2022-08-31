import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ModalView, VisibleStatusUpdater } from "../../component";
import { changeVehicleTypesStatus } from "../../store/slice/vehicle-types-slice";

const View = () => {
  const { vehicle_type, error_message } = useSelector(
    (state) => state.vehicle_types
  );
  return (
    <ModalView
      title="Vehicle Type Details"
      modalId="modal-vehicle-type-details"
      cancelButtonText="Ok"
    >
      <div className="form-group">
        <VisibleStatusUpdater
          bootstapId="status-changer-2"
          status={vehicle_type.visible}
          id={vehicle_type._id}
          changeStatus={changeVehicleTypesStatus}
        />
      </div>

      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <b>Vehicle Type :</b> {vehicle_type.vehicle_type}
        </li>
        <li className="list-group-item">
          <b>Capacity :</b> {vehicle_type.capacity}
        </li>
        <li className="list-group-item">
          <b>Body type :</b> {vehicle_type.body_type}
        </li>
        <li className="list-group-item">
          <b>Tyre : </b>
          {vehicle_type.tyre}
        </li>
        <li className="list-group-item">
          <b>Length :</b> {vehicle_type.length}
        </li>
        <li className="list-group-item">
          <b>Created At :</b>
          {vehicle_type.createdAt}
        </li>
      </ul>
    </ModalView>
  );
};

export default View;
