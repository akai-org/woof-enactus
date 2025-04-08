"use client";

import { icon, LatLngExpression } from "leaflet";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import { toaster } from "@/components/ui/toaster"

type LocationProps = {
  defaultPosition: LatLngExpression;
  defaultZoom: number;
  ref?: React.Ref<{ center_user: () => void }>;
};

const customIcon = icon({
  iconUrl: "user-marker-icon.svg",
  iconSize: [35, 35],
});

const Location = ({ defaultPosition, defaultZoom, ref }: LocationProps) => {


  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);

  const map = useMapEvents({
    locationerror: (error) => {
      map.setView(defaultPosition, map.getZoom(), { animate: true });

      toaster.create({
        title: "Odmówiono dostępu do lokalizacji",
        description: "Nie możemy znaleźć Twojej lokalizacji",
        type: "error",
      })
      
      console.log(error);
    },
    locationfound: (event) => {
      const userLatLng = [event.latlng.lat, event.latlng.lng] as [number, number];
      setUserPosition(userLatLng);
      map.setView(userLatLng, 13, { animate: true });
    },
  });

  const center_user = () => {
    if (userPosition) {
      map.setView(userPosition, 13, { animate: true });
    }else{
      toaster.create({
        title: "Pozwól nam na pobranie Twojej lokalizacji",
        description: "Aby znaleść najbliższe placówki prozwierzęce, musimy znać Twoją lokalizację",  
      })
      
    }
  };
  useImperativeHandle(ref, () => ({
    center_user,
  }));

  useEffect(() => {
    map.locate({ setView: true });

    return () => {
      map.stopLocate();
    };
  }, [map]);

  return userPosition ? <Marker position={userPosition} icon={customIcon} /> : null;
};

export default Location;
