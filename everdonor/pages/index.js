import React from "react";
import { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

const ApiKey = process.env.MAP_API
debugger
export default class Map extends Component {

  state = {
    viewport: {
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8
    }
  };

  render() {
    return (
      <div style={{ position: "relative" }}>
        <ReactMapGL
          {...this.state.viewport}
          width='198vh'
          height='89vh'
          mapboxApiAccessToken={ApiKey}
          onViewportChange={(viewport) => this.setState({ viewport })}
        >
          <Marker latitude={37.78} longitude={-122.41} offsetLeft={-20} offsetTop={-10}>
            <div>You are here</div>
          </Marker>
        </ReactMapGL>
      </div>
    );
  }
}