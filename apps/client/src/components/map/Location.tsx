"use client";
import { icon, LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";

type LocationProps = {
  defaultPosition: LatLngExpression;
  defaultZoom: number;
};
const customIcon = icon({
  iconUrl: "user-marker-icon.svg",
  iconSize: [35, 35],
});

function Location({ defaultPosition }: LocationProps) {
  const [userPosition, setUserPosition] = useState<[number, number] | null>(
    null,
  );

  const map = useMapEvents({
    locationerror: error => {
      map.setView(defaultPosition, map.getZoom(), { animate: true });
      alert("Nie można znaleźć lokalizacji");
      console.log(error);
    },
    locationfound: event => {
      setUserPosition([event.latlng.lat, event.latlng.lng]);

      map.setZoom(13);
    },
  });

  useEffect(() => {
    map.locate({ setView: true });

    return () => {
      map.stopLocate();
    };
  }, [map]);

  return userPosition ? (
    <Marker position={userPosition} icon={customIcon} />
  ) : null;
}

export default Location;
