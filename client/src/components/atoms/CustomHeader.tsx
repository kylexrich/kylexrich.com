import React from "react";
import UnderlinedText from "./UnderlinedText";
import { Box } from "@chakra-ui/react";

type CustomHeaderProps = {
  underlineColor?: string;
  emoji?: string;
  children?: React.ReactNode;
};

const CustomHeader: React.FC<CustomHeaderProps> = ({ emoji, underlineColor, children }, props) => {
  return (
    <Box as="h1" mt={10} mb={6} fontSize="3xl" lineHeight="shorter" fontWeight="bold" {...props} textAlign="left">
      <UnderlinedText>{children}</UnderlinedText>
      {emoji ? " " + emoji : ""}
    </Box>
  );
};

export default CustomHeader;
