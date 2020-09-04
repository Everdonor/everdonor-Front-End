import { useEffect, useState } from "react";

export default function useGeolocation() {

    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 15
    })

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setLocation({
                ...location, 
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            })
          });
    }, []);

    return [location, setLocation];
}