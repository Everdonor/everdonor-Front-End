import React, { useRef, useCallback, useState, useEffect } from 'react'
import ReactMapGL from 'react-map-gl'
import { Marker } from 'react-map-gl';
import useGeolocation from "utils/useGeolocation";

// Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens
const MAPBOX_TOKEN = process.env.MAP_API

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const SIZE = 30;


const MapWithSearch = ({ setCoordenates, coordenates, disableClick }) => {
    const [viewport, setViewport] = useGeolocation(coordenates);
    const [marker, setMarker] = useState(coordenates)
    const mapRef = useRef();
    const handleViewportChange = useCallback(
        (viewport) => {
            if (!disableClick) {
                setViewport(viewport)
            }
        },
        []
    );

    useEffect(() => {
        setMarker(coordenates)
    }, [coordenates]);

    const handleClick = useCallback(
        ({ lngLat }) => {
            const newCoordenates = { longitude: lngLat[0], latitude: lngLat[1], zoom: 15 }
            if (!disableClick) {
                setMarker(newCoordenates)
                setCoordenates(newCoordenates)
            }
        },
        []
    );



    return (
        <div style={{ height: "65vh" }}>
            <ReactMapGL
                {...viewport}
                countries={"ar"}
                ref={mapRef}
                width="100%"
                height="100%"
                onClick={handleClick}
                onViewportChange={handleViewportChange}
                mapboxApiAccessToken={MAPBOX_TOKEN}
            >
                {marker && marker.latitude &&
                    <Marker key={`marker-${marker.longitude}${marker.latitude}`} longitude={marker.longitude} latitude={marker.latitude}>
                        <svg
                            height={SIZE}
                            viewBox="0 0 24 24"
                            style={{
                                cursor: 'pointer',
                                fill: '#d00',
                                stroke: 'none',
                                transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
                            }}
                        >
                            <path d={ICON} />
                        </svg>
                    </Marker>
                }
            </ReactMapGL>
        </div>
    );
};

export default MapWithSearch