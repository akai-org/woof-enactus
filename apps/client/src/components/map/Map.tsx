"use client";

import { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import Location from "./Location";

/* 
  WARNING: Except for its children, MapContainer props are immutable:
  changing them after they have been set a first time will have no effect on the Map instance or its container.
*/

const DEFAULT_POSITION: LatLngExpression = [52.40379, 16.94935];
const DEFAULT_ZOOM = 13;

type MapProps = {
  children?: React.ReactNode;
};

function Map({ children }: MapProps) {
  return (
    <MapContainer
      center={DEFAULT_POSITION}
      zoom={DEFAULT_ZOOM}
      style={{ minHeight: "60vh" }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Location defaultPosition={DEFAULT_POSITION} defaultZoom={DEFAULT_ZOOM} />
      {children}
    </MapContainer>
  );
}

export default Map;
