import { Checkbox as ChakraCheckbox } from "@chakra-ui/react";
import * as React from "react";

export interface CheckboxProps extends ChakraCheckbox.RootProps {
  icon?: React.ReactNode;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  rootRef?: React.Ref<HTMLLabelElement>;
  ref?: React.Ref<HTMLInputElement>;
}

export default function Checkbox(props: CheckboxProps) {
  const { icon, children, inputProps, rootRef, ref, ...rest } = props;

  return (
    <ChakraCheckbox.Root
      ref={rootRef}
      {...rest}
      variant="solid"
      colorPalette="yellow"
      defaultChecked
    >
      <ChakraCheckbox.HiddenInput ref={ref} {...inputProps} />
      <ChakraCheckbox.Control color="white">
        {icon ?? <ChakraCheckbox.Indicator />}
      </ChakraCheckbox.Control>
      {children != null && (
        <ChakraCheckbox.Label>{children}</ChakraCheckbox.Label>
      )}
    </ChakraCheckbox.Root>
  );
}
