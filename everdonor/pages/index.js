import React, { useEffect, useState } from "react";
import ReactMapGL from 'react-map-gl';
import Pins from '../components/Layout/pins';
import useUsers from "../utils/useUsers";

const ApiKey = process.env.MAP_API

export default function Map() {

    const [viewport, setViewport] = useState({
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
    }
    );
    const users = useUsers([]);
    const _onClickMarker = () => {

    };

    return (
        <div style={{ position: "relative" }}>
            <ReactMapGL
                {...viewport}
                width='198vh'
                height='89vh'
                mapboxApiAccessToken={ApiKey}
                onViewportChange={(viewport) => setViewport(viewport)}
            >
                <Pins data={users} onClick={_onClickMarker} />
            </ReactMapGL>
        </div>
    );

}