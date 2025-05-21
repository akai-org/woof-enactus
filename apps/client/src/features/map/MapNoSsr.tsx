"use client";
import { Skeleton } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const MapNoSSR = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => <Skeleton minH="80vh" />,
});

export { MapNoSSR };
