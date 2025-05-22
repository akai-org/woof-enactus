"use client";
import { Button, ClientOnly } from "@chakra-ui/react";
import { AddToCalendarButton } from "add-to-calendar-button-react";

type Props = {
  name: string;
  description: string;
  startDate: string;
};

function RemindButton(props: Props) {
  return (
    <ClientOnly>
      <AddToCalendarButton
        {...props}
        options={["Apple", "Google", "MicrosoftTeams", "iCal"]}
        timeZone="Europe/Warsaw"
        language="pl"
      />
    </ClientOnly>
  );
}

export { RemindButton };
