"use client";

import { Box } from "@chakra-ui/react";
import L, { ErrorEvent, LocationEvent } from "leaflet";
import { useEffect } from "react";

function Map() {
  useEffect(() => {
    const map = L.map("map", { zoomControl: false }).locate({
      setView: true,
    });

    const onLocationFound = (_: LocationEvent) => {
      map.setZoom(12);
    };

    const onLocationError = (_: ErrorEvent) => {
      map.setView([52.40379, 16.94935], 15);
    };

    map.once("locationfound", onLocationFound);
    map.once("locationerror", onLocationError);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    return () => {
      map.stopLocate();
      map.remove();
    };
  }, []);

  return <Box id="map" width="100%" minHeight="60vh" />;
}

export default Map;
