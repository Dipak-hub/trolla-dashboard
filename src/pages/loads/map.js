import React from "react";
import { ModalView } from "../../component";
import {
  Marker,
  LoadScript,
  GoogleMap,
  useJsApiLoader,
  DirectionsService,
} from "@react-google-maps/api";
//
const Map = ({ data: load }) => {
  const containerStyle = {
    width: "50vw",
    height: "50vh",
  };
  console.log(load.pickup)
  return (
    <ModalView
      title="View Map"
      modalId="modal-load-map"
      cancelButtonText="Ok"
      size="xl"
    >
      <div className="content-wrapper">
        <LoadScript googleMapsApiKey={process.env.GOOGLE_MAP_KEY}>
          <GoogleMap
            zoom={5}
            center={load.pickup}
            mapContainerStyle={containerStyle}
          >
            <Marker position={load.pickup} />
            <Marker position={load.delivery} />
          </GoogleMap>
        </LoadScript>
      </div>
    </ModalView>
  );
};

export default Map;
