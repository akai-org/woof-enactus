"use client";

import { useCallback, useMemo, useState, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

import MapMarker from "./MapMarker";
import Location from "./Location";
import type { LocationHandle } from "./Location";
import { SearchBar } from "./search-bar";
import {
  DEFAULT_POSITION,
  DEFAULT_ZOOM,
  MAX_ZOOM,
  MIN_ZOOM,
} from "./map.config";
import type { PartnerData } from "@/types";
import { createClusterIcon } from "./createClusterIcon";

/* 
  NOTE: Except for its children, MapContainer props are immutable:
  changing them after they have been set a first time will have no effect on the Map instance or its container.
*/

type MapProps = {
  children?: React.ReactNode;
  data: PartnerData[];
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
        minZoom={MIN_ZOOM}
        maxZoom={MAX_ZOOM}
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
