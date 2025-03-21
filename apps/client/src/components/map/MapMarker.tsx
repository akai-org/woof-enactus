"use client";

import { LatLngExpression, icon } from "leaflet";
import React from "react";
import { Marker, Popup } from "react-leaflet";
import { Data } from "./types";
import { Box, Link, List, Text } from "@chakra-ui/react";
import { MdLanguage, MdLocalPhone } from "react-icons/md";
import Btn from "../Btn";

type MapMarkerProps = {
  markerData: Data;
};

const customIcon = icon({
  iconUrl: "marker-icon.svg",
  iconSize: [35, 35],
});

function MapMarker({ markerData }: MapMarkerProps) {
  const { latitude, longitude, name, profile } = markerData;
  const position: LatLngExpression = [latitude, longitude];

  return (
    <Marker position={position} icon={customIcon}>
      <Popup>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
        >
          <Text textStyle="sm" fontWeight={"bold"}>
            {name}
          </Text>
          <Box marginTop={"1"} marginBottom={"2"}>
            <Text textStyle="xs">{profile.street}</Text>
            <Text textStyle="xs">{`${profile.postal} ${profile.city}`}</Text>
          </Box>

          <List.Root gap="2" variant="plain" align="center" marginY={"3"}>
            <List.Item>
              <List.Indicator asChild>
                <MdLocalPhone />
              </List.Indicator>
              <Link href={`tel:${profile.phone}`}>{profile.phone}</Link>
            </List.Item>
            <List.Item>
              <List.Indicator asChild>
                <MdLanguage />
              </List.Indicator>
              <Link href={profile.website}>{profile.website}</Link>
            </List.Item>
          </List.Root>
          <Btn>Szczegóły</Btn>
        </Box>
      </Popup>
    </Marker>
  );
}

export default MapMarker;
