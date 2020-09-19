import { useEffect, useState } from "react";

export default function useGeolocation(coordenates) {

    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 15
    })

    useEffect(() => {
        coordenates && coordenates.longitude ?
            setLocation({ ...coordenates, zoom: 15 })
            :
            navigator.geolocation.getCurrentPosition(function (position) {
                setLocation({
                    ...location,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                })
            });
    }, [coordenates]);

    return [location, setLocation];
}