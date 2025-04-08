"use client";

import { toaster } from "@/constants";
import { icon, LatLngExpression } from "leaflet";
import { useEffect, useState, useImperativeHandle, useCallback } from "react";

import { Marker, useMapEvents } from "react-leaflet";

export type LocationHandle = { centerUser: () => void };

type LocationProps = {
  defaultPosition: LatLngExpression;
  defaultZoom: number;
  ref?: React.Ref<LocationHandle>;
};

const customIcon = icon({
  iconUrl: "user-marker-icon.svg",
  iconSize: [35, 35],
});

const Location = ({ defaultPosition, defaultZoom, ref }: LocationProps) => {
  const [userPosition, setUserPosition] = useState<LatLngExpression | null>(
    null,
  );

  const map = useMapEvents({
    locationerror: _ => {
      map.setView(defaultPosition, map.getZoom(), { animate: true });

      toaster.create({
        title: "Odmówiono dostępu do lokalizacji",
        description: "Nie możemy znaleźć Twojej lokalizacji",
        type: "error",
      });
    },
    locationfound: event => {
      const userLatLng: LatLngExpression = [event.latlng.lat, event.latlng.lng];
      setUserPosition(userLatLng);
      map.setView(userLatLng, 13, { animate: true });
    },
  });

  const centerUser = useCallback(() => {
    if (userPosition) {
      map.setView(userPosition, 13, { animate: true });
    } else {
      toaster.create({
        title: "Pozwól nam na pobranie Twojej lokalizacji",
        description:
          "Aby znaleźć najbliższe placówki prozwierzęce, musimy znać Twoją lokalizację",
      });
    }
  }, [map, userPosition]);

  useImperativeHandle(ref, () => ({
    centerUser,
  }));

  useEffect(() => {
    map.locate({ setView: true });

    return () => {
      map.stopLocate();
    };
  }, [map]);

  return userPosition ? (
    <Marker position={userPosition} icon={customIcon} />
  ) : null;
};

export default Location;
