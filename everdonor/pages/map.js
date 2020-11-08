import React, { useState } from "react";
import ReactMapGL, { GeolocateControl, Popup } from "react-map-gl";
import Pins from "components/3rdParty/pins";
import useUsers from "utils/useUsers";
import useGeolocation from "utils/useGeolocation";
import EntityCard from "components/Layout/Card";
import SearchBar from "components/3rdParty/SearchBar";
import { useRouter } from "next/router";

const ApiKey = process.env.MAP_API;
const geolocateStyle = {
  position: "absolute",
  top: 10,
  right: 10,
  margin: 10,
};

export default function Map() {
  const [location, setLocation] = useGeolocation();
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpInfo, setPopUpInfo] = useState({});
  const [users, searchUsers] = useUsers([]);

  const _onClickMarker = ({ user }) => {
    setPopUpInfo(user);
    setShowPopUp(true);
  };

  return (
    <ReactMapGL
          {...location}
          width="inherit"
          height="inherit"
          mapboxApiAccessToken={ApiKey}
          onViewportChange={(viewport) => setLocation(viewport)}
        >
          <SearchBar searchUsers={searchUsers} location={location} />
          <GeolocateControl
            style={geolocateStyle}
            positionOptions={{ enableHighAccuracy: true }}
            label={"Go to my location"}
            fitBoundsOptions={{ maxZoom: 15 }}
            auto={true}
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
  );
}
