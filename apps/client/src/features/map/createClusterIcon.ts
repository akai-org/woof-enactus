import L from "leaflet";

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

export { createClusterIcon };
