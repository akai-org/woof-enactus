"use client";

import { LatLngExpression, icon } from "leaflet";
import React from "react";
import { Marker, Popup } from "react-leaflet";
import { Data } from "@/types";
import { Box, List, Text } from "@chakra-ui/react";
import { MdLanguage, MdLocalPhone } from "react-icons/md";
import { Link, Btn } from "@/components";

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
              <Link
                linkProps={{ href: `tel:${profile.phone}` }}
                chakraLinkProps={{
                  color: "brand.500",
                  textDecoration: "none",
                  _focus: { boxShadow: "none", outline: "none" },
                }}
              >
                {profile.phone}
              </Link>
            </List.Item>
            <List.Item>
              <List.Indicator asChild>
                <MdLanguage />
              </List.Indicator>
              <Link
                linkProps={{ href: profile.website }}
                chakraLinkProps={{
                  color: "brand.500",
                  textDecoration: "none",
                  _focus: { boxShadow: "none", outline: "none" },
                }}
              >
                {profile.website}
              </Link>
            </List.Item>
          </List.Root>
          <Link
            linkProps={{ href: `/placowki/${markerData.slug}` }}
            chakraLinkProps={{
              color: "brand.500",
              textDecoration: "none",
              _focus: { boxShadow: "none", outline: "none" },
              fontWeight: "bold",
            }}
          >
            <Btn>Szczegóły</Btn>
          </Link>
        </Box>
      </Popup>
    </Marker>
  );
}

export default MapMarker;
