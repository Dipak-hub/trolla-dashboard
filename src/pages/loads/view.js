import { Link } from "react-router-dom";
import { ModalView, VisibleStatusUpdater } from "../../component";
import {
  Marker,
  LoadScript,
  GoogleMap,
  useJsApiLoader,
  DirectionsService,
} from "@react-google-maps/api";
import { useEffect } from "react";
import { changeLoadStatus } from "../../store/slice/loads-slice";
const View = ({ data: load }) => {
  const containerStyle = {
    width: "500px",
    height: "400px",
  };
  return (
    <ModalView
      title="Load Details"
      modalId="modal-load-details"
      cancelButtonText="Ok"
      size="xl"
    >
      <div className="form-group">
        <VisibleStatusUpdater
          bootstapId="status-changer-2"
          status={load.visible}
          id={load._id}
          changeStatus={changeLoadStatus}
        />
      </div>

      <div className="row">
        <div className="col-md-6 col-sm-12 col-xl-6">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <b>Load No :</b> {load.load_no}
            </li>
            <li className="list-group-item">
              <b>Loader : </b>
              {load?.loader?.user_name}
            </li>
            <li className="list-group-item">
              <b>Pickup Address :</b> {load?.pickup?.address}
            </li>
            <li className="list-group-item">
              <b>Pickup Person Number :</b> {load?.pickup?.contact_number}
            </li>
            <li className="list-group-item">
              <b>Delivery Address :</b> {load?.delivery?.address}
            </li>
            <li className="list-group-item">
              <b>Delivery Person Number:</b> {load?.delivery?.contact_number}
            </li>
            <li className="list-group-item">
              <b>Consignment Insured :</b>{" "}
              {load?.consignment_insured ? "Yes" : "No"}
            </li>
          </ul>
        </div>
        <div className="col-md-6 col-sm-12 col-xl-6">
          <ul className="list-group list-group-flush">
            {/* <li className="list-group-item">Load No : {load.load_no}</li>
          <li className="list-group-item">Loader : {load.loader.user_name}</li>
          <li className="list-group-item">
            Pickup Address : {load.pickup.address}
          </li>
          <li className="list-group-item">
            Delevery : {load.delivery.address}
          </li> */}
            <li className="list-group-item">
              <b>Value :</b> {load?.value}
            </li>
            <li className="list-group-item">
              <b>Weight :</b> {load?.weight}
            </li>
            <li className="list-group-item">
              <b>Pickup Date :</b>
              {load.pickup_date}
            </li>
            <li className="list-group-item">
              <b>Expected Date :</b>
              {load?.expected_delivery_date}
            </li>
            <li className="list-group-item">
              <b>Remark :</b>
              {load?.remark}
            </li>
            <li className="list-group-item">
              <b>Created At :</b>
              {load?.createdAt}
            </li>
          </ul>
        </div>
        {/* <div className="shadow-lg p-2 mb-5 bg-white rounded">
          <div className="ml-3">

            <LoadScript googleMapsApiKey={process.env.GOOGLE_MAP_KEY}>
              <GoogleMap zoom={4} center={load.pickup} mapContainerStyle={containerStyle}>
                <Marker position={load.pickup} />
                <Marker position={load.delivery} />

              </GoogleMap>
            </LoadScript>

          </div>
        </div> */}
      </div>
    </ModalView>
  );
};

export default View;
