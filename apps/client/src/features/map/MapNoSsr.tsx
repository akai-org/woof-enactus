"use client";
import dynamic from "next/dynamic";
import { SekletonMap } from "./SkeletonMap";

const MapNoSSR = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => <SekletonMap />,
});

export { MapNoSSR };
