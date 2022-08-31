import React from "react";

import { ModalView } from "../../../component";
import {
  Marker,
  LoadScript,
  GoogleMap,
  useJsApiLoader,
  DirectionsService,
} from "@react-google-maps/api";

const Map = ({ data: booking }) => {
  const containerStyle = {
    width: "65vw",
    height: "65vh",
  };
  return (
    <ModalView
      title="View Map"
      modalId="modal-booking-view-map"
      cancelButtonText="Ok"
      size="xl"
    >
      <div className="content-wrapper">
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_KEY}>
          <GoogleMap
            zoom={6}
            center={booking?.load?.pickup}
            mapContainerStyle={containerStyle}
          >
            <Marker position={booking?.load?.pickup} />
            <Marker position={booking?.load?.delivery} />
          </GoogleMap>
        </LoadScript>
      </div>
    </ModalView>
  );
};

export default Map;
