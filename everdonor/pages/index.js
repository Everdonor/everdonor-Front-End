import React, { useState } from "react";
import ReactMapGL, { GeolocateControl } from "react-map-gl";
import Pins from "../components/Layout/pins";
import useUsers from "../utils/useUsers";
import useGeolocation from "../utils/useGeolocation";

const ApiKey = process.env.MAP_API;
const geolocateStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  margin: 10,
};

export default function Map() {
  const [location, setLocation] = useGeolocation();
  const users = useUsers([]);
  const _onClickMarker = () => {};

  return (
    <div style={{ position: "relative" }}>
      <ReactMapGL
        {...location}
        width="198vh"
        height="89vh"
        mapboxApiAccessToken={ApiKey}
        onViewportChange={(viewport) => setLocation(viewport)}
      >
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{ enableHighAccuracy: true }}
          label={"Go to my location"}
          fitBoundsOptions={{maxZoom: 15}}
        />
        <Pins data={users} onClick={_onClickMarker} />
      </ReactMapGL>
    </div>
  );
}
