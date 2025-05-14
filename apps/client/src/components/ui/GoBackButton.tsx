"use client";

import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { RiArrowLeftLine } from "react-icons/ri";

export default function GoBackButton() {
  const { back } = useRouter();

  return (
    <Button variant="gray" size="sm" onClick={back}>
      <RiArrowLeftLine />
      Powrót
    </Button>
  );
}
