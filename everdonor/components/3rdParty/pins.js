import * as React from 'react';
import { Marker } from 'react-map-gl';


const SIZE = 75;

export default function Pins({ data, onClick = () => { } }) {

    return data.map((user, index) => {
        return <Marker key={`marker-${user.id}`} longitude={user.longitude} latitude={user.latitude}>
            <img
                src={`/${user.donationTypes[0]}.png`}
                alt={"icono"}
                height={SIZE}
                viewBox="0 0 24 24"
                style={{
                    cursor: 'pointer',
                    fill: '#d00',
                    stroke: 'none',
                    transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
                }}
                onClick={() => onClick({ user })}
            >
            </img>
        </Marker>
    });

}