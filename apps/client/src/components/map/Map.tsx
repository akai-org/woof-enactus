"use client";

import L from "leaflet";
import { useEffect } from "react";

function Map() {
  useEffect(() => {
    const map = L.map("map", { zoomControl: false }).setView(
      [51.505, -0.09],
      13,
    );

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ width: "100%", height: "700px" }}></div>;
}

export default Map;
