"use client";

import { useCallback, useMemo, useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

import MapMarker from "./MapMarker";
import Location from "./Location";
import type { LocationHandle } from "./Location";
import { SearchBar } from "./search-bar";
import {
  DEFAULT_POSITION,
  DEFAULT_ZOOM,
  LOCATION_FOUND_ZOOM,
  MAX_ZOOM,
  MIN_ZOOM,
  PARTNER_ADDRESS_SEARCH_PARAM,
} from "./map.config";
import type { PartnerData } from "@/types";
import { createClusterIcon } from "./createClusterIcon";

import { toaster } from "@/constants";
import { useSearchParams } from "next/navigation";

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
  const mapRef = useRef<L.Map | null>(null);
  const searchParams = useSearchParams();

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

  useEffect(() => {
    const searchQuery = searchParams.get(PARTNER_ADDRESS_SEARCH_PARAM);
    if (!searchQuery) return;

    if (data.length > 0) {
      mapRef.current?.flyTo(
        [data[0].latitude, data[0].longitude],
        LOCATION_FOUND_ZOOM,
        { animate: true, duration: 1 },
      );
    } else {
      queueMicrotask(() => {
        if (data.length == 0)
          toaster.create({
            description: "Nie znaleziono żadnych placówek",
            type: "error",
          });
      });
    }
  }, [data, searchParams]);

  return (
    <>
      <SearchBar onLocate={handleLocate} />
      <MapContainer
        center={DEFAULT_POSITION}
        zoom={DEFAULT_ZOOM}
        zoomControl={true}
        minZoom={MIN_ZOOM}
        maxZoom={MAX_ZOOM}
        ref={mapRef}
        style={{ minHeight: "65dvh" }}
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
