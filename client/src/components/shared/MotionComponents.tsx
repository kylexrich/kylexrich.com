import React from 'react';
import {Box, Button, Flex, forwardRef, Icon, IconButton, Image, List, Text, VStack} from '@chakra-ui/react';
import {motion} from 'framer-motion';

function createMotionComponent(Component: React.ElementType) {
    return motion(forwardRef((props, ref) => <Component ref={ref} {...props} />));
}

export const MotionFlex = createMotionComponent(Flex);
export const MotionBox = createMotionComponent(Box);
export const MotionIcon = createMotionComponent(Icon);
export const MotionIconButton = createMotionComponent(IconButton);
export const MotionVStack = createMotionComponent(VStack);
export const MotionButton = createMotionComponent(Button);
export const MotionText = createMotionComponent(Text);
export const MotionList = createMotionComponent(List);
export const MotionImage = createMotionComponent(Image);
