import React from "react";
import { Flex, Box, Text, Image, List, forwardRef } from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";

function createMotionComponent(Component: React.ElementType) {
  return motion(
    forwardRef((props: Record<string, any>, ref: React.Ref<any>) => {
      const chakraProps = Object.fromEntries(Object.entries(props).filter(([key]) => !isValidMotionProp(key)));
      return <Component ref={ref} {...chakraProps} />;
    }),
  );
}

export const MotionFlex = createMotionComponent(Flex);
export const MotionBox = createMotionComponent(Box);
export const MotionText = createMotionComponent(Text);
export const MotionList = createMotionComponent(List);
export const MotionImage = createMotionComponent(Image);
