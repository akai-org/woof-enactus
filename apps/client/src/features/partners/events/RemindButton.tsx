"use client";
import { Button } from "@chakra-ui/react";
import type { DateTime } from "ics";
import { createEvent } from "ics";
import { useState } from "react";
import { saveAs } from "file-saver";

type Props = {
  start: DateTime;
  title: string;
  description: string;
};

function RemindButton(props: Props) {
  const [status, setStatus] = useState<"initial" | "error" | "success">(
    "initial",
  );
  const icsHandler = () => {
    const event = {
      ...props,
      duration: {
        days: 1,
      },
    };
    createEvent(event, (error, value) => {
      if (error) {
        console.log(error);
        setStatus("error");
        return;
      }
      const blob = new Blob([value], { type: "text/calendar" });
      saveAs(blob, `${props.title}.ics`);
      setStatus("success");
    });
  };
  return (
    <>
      <Button onClick={icsHandler} variant="gray" size="lg">
        Przypomnij mi o wydarzeniu!
      </Button>
      {status == "error" && "Coś poszło nie tak..."}
    </>
  );
}

export { RemindButton };
