import { Text, Flex, Heading, type FlexProps, Span } from "@chakra-ui/react";
import type { ReactNode } from "react";

type InfoBoxProps = {
  icon?: ReactNode;
  title: string;
  children?: ReactNode;
} & FlexProps;

function InfoBox({ icon, title, children, ...rest }: InfoBoxProps) {
  return (
    <Flex
      align={rest.direction == "column" ? "start" : "center"}
      gap={2}
      my={1}
      wrap="wrap"
      {...rest}
    >
      <Flex align="center" gap={2} color="brand.500" textWrap="nowrap">
        {icon}
        <Heading size="lg" fontWeight="bold">
          {title}:
        </Heading>
      </Flex>

      <Span color="brand.900" textWrap="wrap" wordBreak="break-word">{children}</Span>
    </Flex>
  );
}

export default InfoBox;
