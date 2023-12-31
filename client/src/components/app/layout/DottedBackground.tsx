import React from "react";
import { Box } from "@chakra-ui/react";

type DottedBackgroundProps = {};

const DottedBackground: React.FC<DottedBackgroundProps> = (props) => {
  const rightTransform = "translateX(0%) translateY(-45%)";
  const leftTransform = "translateX(0%) translateY(52%)";
  const color = "rgba(55,65,81, 1)";

  return (
    <Box
      position="absolute"
      height="50rem"
      width="100%"
      overflow="hidden"
      display={["none", "none", "block"]}
      zIndex={-1}
    >
      <Box position="relative" height="full" mx="auto" maxW="940px">
        <Box position="absolute" left="100%">
          <svg
            style={{ transform: rightTransform, color: color }}
            width="404"
            height="784"
            fill="none"
            viewBox="0 0 404 784"
          >
            {renderPattern()}
            <rect width="404" height="784" fill="url(#pattern)"></rect>
          </svg>
        </Box>
        <Box position="absolute" right="100%">
          <svg
            style={{ transform: leftTransform, color: color }}
            width="404"
            height="784"
            fill="none"
            viewBox="0 0 404 784"
          >
            {renderPattern()}
            <rect width="404" height="784" fill="url(#pattern)"></rect>
          </svg>
        </Box>
      </Box>
    </Box>
  );
};

const renderPattern = () => (
  <defs>
    <pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
    </pattern>
  </defs>
);

export default DottedBackground;
