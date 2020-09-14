import React, { useState } from "react";
import ReactMapGL, { GeolocateControl, Popup } from "react-map-gl";
import Pins from "components/3rdParty/pins";
import useUsers from "utils/useUsers";
import useGeolocation from "utils/useGeolocation";
import EntityCard from "components/Layout/Card";
import SearchBar from "components/3rdParty/SearchBar";
import { Grid } from "@material-ui/core";

const ApiKey = process.env.MAP_API;
const geolocateStyle = {
  position: "absolute",
  top: 10,
  right: 10,
  margin: 10,
};

export default function Map() {
  const [location, setLocation] = useGeolocation();
  const [users, searchByName, searchByType] = useUsers([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpInfo, setPopUpInfo] = useState({});

  const onClickSearch = (name) => {
    searchByName(name);
  };

  const onChangeSelect = (value) => {
    searchByType(value);
  };

  const _onClickMarker = ({ user }) => {
    setPopUpInfo(user);
    setShowPopUp(true);
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item xs={12}>
        <ReactMapGL
          {...location}
          width="100vw"
          height="calc(100vh - 64px)"
          mapboxApiAccessToken={ApiKey}
          onViewportChange={(viewport) => setLocation(viewport)}
        >
          <SearchBar onClick={onClickSearch} onChange={onChangeSelect} />
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
      </Grid>
    </Grid>
  );
}
