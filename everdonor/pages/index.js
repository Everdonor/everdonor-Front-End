import React from "react";
import HEREMap from "here-maps-react";

export default function Home() {
  return (
    <HEREMap
      appId={"jAsJv2nTxVC2Nz5o1CAB"}
      apikey={"mtLUMWwVB-mtHKTCBtU0ydFOq4bobBAb-uY-RFHaFgU"}
      center={{ lat: 10.998666, lng: -63.79841 }}
      zoom={12}
    />
  );
}
