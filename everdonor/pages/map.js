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
  const [users, searchUsers] = useUsers([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpInfo, setPopUpInfo] = useState({});
  const [selectedTypes, setSelectedTypes] = useState([])
  const [selectedRange, setSelectedRange] = useState("")
  const [requestParams, setRequestParams] = useState({})

  const sendRequest = () => {
    searchUsers(requestParams);
  }

  const updateRequestWithName = (name) => {
    setRequestParams({...requestParams, name: name});
  };

  const updateRequestWithSelectedTypes = ({target}) => {
    const value = target.value;
    for (let i = 0, l = value.length; i < l; i += 1) {
      if (value[i].selected) {
        value.push(value[i].value);
      }
    }
    setSelectedTypes(value);
    setRequestParams({...requestParams, types: value})
  };

  const updateRequestWithSelectedRadius = (value) => {
    setSelectedRange(value);
    setRequestParams({...requestParams, ...location, distance: value });
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
          <SearchBar  onClick={sendRequest}
                      onChangeName={updateRequestWithName} 
                      onChangeType={updateRequestWithSelectedTypes} 
                      onChangeRadius={updateRequestWithSelectedRadius} 
                      selectedTypes={selectedTypes} 
                      selectedRange={selectedRange}/>
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
