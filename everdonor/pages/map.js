import React, { useState } from "react";
import ReactMapGL, { GeolocateControl, Popup } from "react-map-gl";
import Pins from "components/Layout/pins";
import useUsers from "utils/useUsers";
import useGeolocation from "utils/useGeolocation";
import EntityCard from "components/Layout/Card";
import SearchBar from "components/Layout/SearchBar"

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
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpInfo, setPopUpInfo] = useState({});

  const _onClickMarker = ({ user }) => {
    setPopUpInfo(user);
    setShowPopUp(true);
  };

  return (
    <div style={{ position: "relative" }}>
      <ReactMapGL
        {...location}
        width="198vh"
        height="89vh"
        mapboxApiAccessToken={ApiKey}
        onViewportChange={(viewport) => setLocation(viewport)}
      >
        <SearchBar />
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{ enableHighAccuracy: true }}
          label={"Go to my location"}
          fitBoundsOptions={{ maxZoom: 15 }}
        />
        <Pins data={users} onClick={_onClickMarker} />
        {showPopUp && (
          <Popup
            latitude={popUpInfo.latitude}
            longitude={popUpInfo.longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => {
              setShowPopUp(false);
            }}
            anchor="top"
          >
            <EntityCard {...popUpInfo} />
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}
