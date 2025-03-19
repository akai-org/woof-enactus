import { LatLngExpression, icon } from "leaflet";
import React from "react";
import { Marker } from "react-leaflet";

type MapMarkerProps = {
  markerData: Data;
};

// TEMPORARY
type Data = {
  id: number;
  uuid: string;
  name: string;
  latitude: number;
  longitude: number;
  type: "VET" | "ORG" | "SHOP" | "SHELTER";
};

const customIcon = icon({
  iconUrl: "marker-icon.svg",
  iconSize: [35, 35],
});

function MapMarker({ markerData }: MapMarkerProps) {
  const { latitude, longitude } = markerData;
  const position: LatLngExpression = [latitude, longitude];

  return <Marker position={position} icon={customIcon}></Marker>;
}

export default MapMarker;
