"use client";

import { LatLngExpression, icon } from "leaflet";
import React from "react";
import { Marker, Popup } from "react-leaflet";
import { Data } from "./types";
import { Box, Button, Link, List, Text } from "@chakra-ui/react";
import { MdArrowRightAlt, MdLanguage, MdLocalPhone } from "react-icons/md";

type MapMarkerProps = {
  markerData: Data;
};

const customIcon = icon({
  iconUrl: "marker-icon.svg",
  iconSize: [35, 35],
});

/*
 TODO: remove default styles like shadow (css). Add content to popup.
*/

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
          <Button
            variant={"solid"}
            fontFamily={"heading"}
            textTransform={"uppercase"}
            letterSpacing={"wide"}
            bgColor={"accent.green"}
          >
            Szczegóły <MdArrowRightAlt />
          </Button>
        </Box>
      </Popup>
    </Marker>
  );
}

export default MapMarker;
