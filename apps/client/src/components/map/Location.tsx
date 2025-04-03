import type { LatLngExpression } from "leaflet";
import { useEffect } from "react";
import { useMapEvents } from "react-leaflet";

type LocationProps = {
  defaultPosition: LatLngExpression;
  defaultZoom: number;
};

function Location({ defaultPosition, defaultZoom }: LocationProps) {
  const map = useMapEvents({
    locationerror: () => {
      map.setView(defaultPosition, map.getZoom(), { animate: true });
    },
    locationfound: () => {
      map.setZoom(defaultZoom);
    },
  });

  useEffect(() => {
    map.locate({ setView: true });

    return () => {
      map.stopLocate();
    };
  }, [map]);

  return <></>;
}

export default Location;
