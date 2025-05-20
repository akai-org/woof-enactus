"use client";
import dynamic from "next/dynamic";

const MapNoSSR = dynamic(() => import("./Map"), {
  ssr: false,
});

export { MapNoSSR as Map };
