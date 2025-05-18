import React from "react";
import type { WorkingHours as WorkingHoursType } from "@/types";
import { Card, Flex, VStack } from "@chakra-ui/react";
import { FaRegClock } from "react-icons/fa";
import InfoBox from "./InfoBox";
import { NullishGuard } from "@/components";

const POLISH_DAYS: Readonly<WorkingHoursType> = {
  monday: "Poniedziałek",
  tuesday: "Wtorek",
  wednesday: "Środa",
  thursday: "Czwartek",
  friday: "Piątek",
  saturday: "Sobota",
  sunday: "Niedziela",
};

const getPolishDay = (day: keyof WorkingHoursType) => POLISH_DAYS[day];

type WorkingHoursProps = {
  workingHours?: WorkingHoursType;
};

type DayOfTheWeekProps = {
  dayName: string;
  openHours: string | null;
  isWeekend: boolean;
};

function WorkingHours({ workingHours }: WorkingHoursProps) {
  const openHours = workingHours
    ? (Object.fromEntries(
        Object.entries(workingHours).filter(([key]) => key in POLISH_DAYS),
      ) as Record<keyof WorkingHoursType, string>)
    : null;

  return (
    <Card.Root w="full" borderColor="brand.300">
      <Card.Body p={[2, 4]}>
        <InfoBox icon={<FaRegClock />} title="Godziny pracy" mb={5} />
        <VStack>
          {openHours
            ? Object.entries(openHours).map(([day, hours], i) => (
                <DayOfTheWeek
                  dayName={day}
                  openHours={hours}
                  isWeekend={i > 5}
                  key={day}
                />
              ))
            : Object.entries(POLISH_DAYS).map(([day, _], i) => (
                <DayOfTheWeek
                  dayName={day}
                  isWeekend={i > 5}
                  openHours={null}
                  key={day}
                />
              ))}
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}

function DayOfTheWeek({ dayName, openHours, isWeekend }: DayOfTheWeekProps) {
  return (
    <Flex
      justifyContent="space-between"
      w="full"
      maxW={400}
      mx="auto"
      bg={isWeekend ? "brand.500" : "brand.600"}
      color="brand.100"
      rounded="md"
      p={2}
    >
      <span>{getPolishDay(dayName as keyof WorkingHoursType)}</span>
      <NullishGuard check={openHours}>
        <span>{openHours}</span>
      </NullishGuard>
    </Flex>
  );
}

export default WorkingHours;
