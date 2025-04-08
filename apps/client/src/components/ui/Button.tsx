import { Button as ChakraButton, type ButtonProps } from "@chakra-ui/react";
import { MdArrowRightAlt } from "react-icons/md";

function Button({
  ref,
  ...props
}: ButtonProps & React.RefAttributes<HTMLButtonElement>) {
  return (
    <ChakraButton
      ref={ref}
      variant={"solid"}
      fontFamily={"heading"}
      textTransform={"uppercase"}
      letterSpacing={"wide"}
      bgColor={"accent.green"}
      {...props}
    >
      {props.children} <MdArrowRightAlt />
    </ChakraButton>
  );
}

export default Button;
