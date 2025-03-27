import { Button, ButtonProps } from "@chakra-ui/react";
import { MdArrowRightAlt } from "react-icons/md";

function Btn({
  ref,
  ...props
}: ButtonProps & React.RefAttributes<HTMLButtonElement>) {
  return (
    <Button
      ref={ref}
      variant={"solid"}
      fontFamily={"heading"}
      textTransform={"uppercase"}
      letterSpacing={"wide"}
      bgColor={"accent.green"}
      {...props}
    >
      {props.children} <MdArrowRightAlt />
    </Button>
  );
}

export default Btn;
