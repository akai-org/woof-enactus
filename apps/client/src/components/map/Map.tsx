"use client";

import { useCallback, useMemo, useState, useRef } from "react";
import type { LatLngExpression } from "leaflet";

import { MapContainer, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import type { PartnerData } from "@/types";

import MapMarker from "./MapMarker";
import Location from "./Location";
import type { LocationHandle } from "./Location";
import { SearchBar } from "../map-search-bar";
import L from "leaflet";

/* 
  NOTE: Except for its children, MapContainer props are immutable:
  changing them after they have been set a first time will have no effect on the Map instance or its container.
*/

const DEFAULT_POSITION: LatLngExpression = [52.40379, 16.54935];
const DEFAULT_ZOOM = 11;

type MapProps = {
  children?: React.ReactNode;
  data: PartnerData[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createClusterIcon = (markerCluster: any) => {
  const childCount = markerCluster.getChildCount();
  let iconUrl = "cluster-";

  if (childCount < 10) {
    iconUrl += "sm";
  } else if (childCount < 100) {
    iconUrl += "md";
  } else {
    iconUrl += "lg";
  }

  return new L.DivIcon({
    html: `<div><img alt="markers" src="${iconUrl + ".png"}"><span>${childCount}</span></div>`,
    iconSize: [50, 50],
    className: "custom-cluster-icon",
  });
};

function Map({ children, data }: MapProps) {
  const [showLocation, setShowLocation] = useState(false);
  const locationRef = useRef<LocationHandle>(null);

  const memoizedMarkers = useMemo(
    () => data.map(item => <MapMarker markerData={item} key={item.uuid} />),
    [data],
  );

  const handleLocate = useCallback(() => {
    if (showLocation) {
      locationRef.current?.centerUser();
    } else {
      setShowLocation(true);
    }
  }, [showLocation]);

  return (
    <>
      <SearchBar onLocate={handleLocate} />
      <MapContainer
        center={DEFAULT_POSITION}
        zoom={DEFAULT_ZOOM}
        zoomControl={true}
        minZoom={6}
        maxZoom={18}
        style={{ minHeight: "70vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showLocation && (
          <Location
            ref={locationRef}
            defaultPosition={DEFAULT_POSITION}
            defaultZoom={DEFAULT_ZOOM}
          />
        )}
        <MarkerClusterGroup
          showCoverageOnHover={false}
          iconCreateFunction={createClusterIcon}
        >
          {memoizedMarkers}
        </MarkerClusterGroup>

        {children}
      </MapContainer>
    </>
  );
}

export default Map;
