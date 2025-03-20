"use client";

import { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import MapMarker from "./MapMarker";
import "./style.css";

import MarkerClusterGroup from "react-leaflet-markercluster";
import { Data } from "./types";

/* 
  NOTE: Except for its children, MapContainer props are immutable:
  changing them after they have been set a first time will have no effect on the Map instance or its container.
*/

const DEFAULT_POSITION: LatLngExpression = [52.40379, 16.94935];
const DEFAULT_ZOOM = 13;

type MapProps = {
  children?: React.ReactNode;
  data: Data[];
};

function Map({ children, data }: MapProps) {
  return (
    <MapContainer
      center={DEFAULT_POSITION}
      zoom={DEFAULT_ZOOM}
      minZoom={10}
      maxZoom={18}
      style={{ minHeight: "60vh" }}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup showCoverageOnHover={false}>
        {data.map(item => (
          <MapMarker markerData={item} key={item.uuid} />
        ))}
      </MarkerClusterGroup>

      {children}
    </MapContainer>
  );
}

export default Map;
