"use client";

import { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import MapMarker from "./MapMarker";

/* 
  WARNING: Except for its children, MapContainer props are immutable:
  changing them after they have been set a first time will have no effect on the Map instance or its container.
*/

const DEFAULT_POSITION: LatLngExpression = [52.40379, 16.94935];
const DEFAULT_ZOOM = 13;

type MapProps = {
  children?: React.ReactNode;
};

const coordinates: Array<LatLngExpression> = [
  [52.472013, 16.994563],
  [52.523089, 16.934824],
  [52.58961, 17.142845],
  [52.508163, 17.207341],
  [52.401124, 16.84257],
  [52.515939, 16.878021],
  [52.553108, 17.034453],
  [52.428763, 16.981219],
  [52.462308, 17.176126],
  [52.494705, 16.839512],
];

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

      {coordinates.map((latLng, index) => (
        <MapMarker position={latLng} key={index} />
      ))}
      {children}
    </MapContainer>
  );
}

export default Map;
