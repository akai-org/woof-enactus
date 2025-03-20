"use client";

import { LatLngExpression, icon } from "leaflet";
import React from "react";
import { Marker, Popup } from "react-leaflet";
import { Data } from "./types";
import { chakra } from "@chakra-ui/react";

type MapMarkerProps = {
  markerData: Data;
};

const customIcon = icon({
  iconUrl: "marker-icon.svg",
  iconSize: [35, 35],
});

const PopupUI = chakra(Popup);

/*
 TODO: remove default styles like shadow (css). Add content to popup.
*/

function MapMarker({ markerData }: MapMarkerProps) {
  const { latitude, longitude, name, profile } = markerData;
  const position: LatLngExpression = [latitude, longitude];

  return (
    <Marker position={position} icon={customIcon}>
      <PopupUI closeButton={false}>{name}</PopupUI>
    </Marker>
  );
}

export default MapMarker;
