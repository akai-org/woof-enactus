"use client";

import { Box } from "@chakra-ui/react";
import L, { ErrorEvent, LocationEvent } from "leaflet";
import { useEffect, useRef } from "react";

function Map() {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    const map = L.map("map", { zoomControl: false }).locate({
      setView: true,
    });

    mapRef.current = map;

    const onLocationFound = (_: LocationEvent) => {
      if (mapRef.current) {
        mapRef.current.setZoom(12);
      }
    };

    const onLocationError = (_: ErrorEvent) => {
      if (mapRef.current) {
        mapRef.current.setView([52.40379, 16.94935], 15);
      }
    };

    map.once("locationfound", onLocationFound);
    map.once("locationerror", onLocationError);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    return () => {
      if (mapRef.current) {
        mapRef.current.stopLocate();
        mapRef.current.remove();
      }
    };
  }, []);

  return <Box id="map" width="100%" minHeight="60vh" />;
}

export default Map;
