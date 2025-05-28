"use client";

import { icon } from "leaflet";
import type { LatLngExpression } from "leaflet";
import React from "react";
import { Marker, Popup } from "react-leaflet";
import type { PartnerData, PartnerType } from "@/types";
import { Box, List, Text, Button, Link, Flex, Span } from "@chakra-ui/react";
import { MdLanguage, MdLocalPhone } from "react-icons/md";
import { mapLegendItems } from "@/constants";
import { TiArrowRight } from "react-icons/ti";
import NextLink from "next/link";
import { NullishGuard } from "@/components";
import { truncate } from "@/utils";

type MapMarkerProps = {
  markerData: PartnerData;
};

const createIcon = (type: PartnerType) => {
  const markerPath = mapLegendItems.find(
    item => item.type === type,
  )?.markerPath;
  return icon({
    iconUrl: markerPath ?? "",
    iconSize: [35, 35],
  });
};

function MapMarker({ markerData }: MapMarkerProps) {
  const { latitude, longitude, name, profile, type } = markerData;
  const position: LatLngExpression = [latitude, longitude];

  return (
    <Marker position={position} icon={createIcon(type)}>
      <Popup>
        <Flex flexDirection="column" justifyContent="space-between">
          <Text textStyle="sm" fontWeight="bold">
            {name}
          </Text>
          <Box marginTop="1" marginBottom="2">
            <Text textStyle="xs">{profile.street}</Text>
            <Text textStyle="xs">{`${profile.postal} ${profile.city}`}</Text>
          </Box>

          <List.Root gap="2" variant="plain" align="center" marginY={"3"}>
            <List.Item>
              <List.Indicator asChild>
                <MdLocalPhone />
              </List.Indicator>
              <NullishGuard check={profile.phone}>
                <Link color="brand.500" href={`tel:${profile.phone}`}>
                  {profile.phone}
                </Link>
              </NullishGuard>
            </List.Item>

            <List.Item>
              <List.Indicator asChild>
                <MdLanguage />
              </List.Indicator>
              <NullishGuard check={profile.website}>
                <Link color="brand.500" href={profile.website}>
                  {truncate(profile.website ?? "")}
                </Link>
              </NullishGuard>
            </List.Item>
          </List.Root>
          <Button variant="cta" asChild>
            <Link asChild>
              <NextLink href={`/placowki/${markerData.slug}`}>
                <Span color="brand.100">Szczegóły</Span>
                <TiArrowRight color="white" />
              </NextLink>
            </Link>
          </Button>
        </Flex>
      </Popup>
    </Marker>
  );
}

export default MapMarker;
