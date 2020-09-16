import React, { useRef, useCallback } from 'react'
import MapGL from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import useGeolocation from "utils/useGeolocation";

// Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens
const MAPBOX_TOKEN = process.env.MAP_API


const MapWithSearch = ({ setCoordenates }) => {
    const [viewport, setViewport] = useGeolocation();
    const mapRef = useRef();
    const handleViewportChange = useCallback(
        (newViewport) => {
            setCoordenates(newViewport)
            setViewport(newViewport)
        },
        []
    );


    // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
    const handleGeocoderViewportChange = useCallback(
        (newViewport) => {
            const geocoderDefaultOverrides = { transitionDuration: 1000 };

            return handleViewportChange({
                ...newViewport,
                ...geocoderDefaultOverrides
            });
        },
        []
    );

    return (
        <div style={{ height: "65vh" }}>
            <MapGL
                {...viewport}
                countries={"ar"}
                ref={mapRef}
                width="100%"
                height="100%"
                onViewportChange={handleViewportChange}
                mapboxApiAccessToken={MAPBOX_TOKEN}
            >
                <Geocoder
                    reverseGeocode
                    countries={"ar"}
                    mapRef={mapRef}
                    onViewportChange={handleGeocoderViewportChange}
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                    position="top-left"
                    queryParams
                />
            </MapGL>
        </div>
    );
};

export default MapWithSearch