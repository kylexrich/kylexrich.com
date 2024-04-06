import React, { ReactNode } from 'react';
import { Box, Flex, forwardRef, Image, List, SlideFade, Text } from '@chakra-ui/react';
import { isValidMotionProp, motion } from 'framer-motion';
import { PassThroughProps } from '../../util/types/PassThroughProps';

function createMotionComponent(Component: React.ElementType) {
    return motion(
        forwardRef((props: Record<string, any>, ref: React.Ref<any>) => {
            const chakraProps = Object.fromEntries(Object.entries(props).filter(([key]) => !isValidMotionProp(key)));
            return <Component ref={ref} {...chakraProps} />;
        })
    );
}

export const MotionFlex = createMotionComponent(Flex);
export const MotionBox = createMotionComponent(Box);
export const MotionText = createMotionComponent(Text);
export const MotionList = createMotionComponent(List);
export const MotionImage = createMotionComponent(Image);

export const LayoutTransition: React.FC<PassThroughProps> = ({ children, ...props }) => {
    return (
        <MotionBox
            variants={{
                initial: {
                    opacity: 0,
                    translateY: -20
                },
                enter: {
                    y: 0,
                    opacity: 1,
                    transition: {
                        y: { stiffness: 1000, velocity: -100 }
                    }
                },
                exit: {
                    y: 50,
                    opacity: 0,
                    transition: {
                        y: { stiffness: 1000 }
                    }
                }
            }}
            {...props}
        >
            {children}
        </MotionBox>
    );
};

export const LayoutSlideFade: React.FC<PassThroughProps> = ({ children, ...props }) => {
    return (
        <SlideFade in {...props}>
            {children}
        </SlideFade>
    );
};

export const MotionContainer: React.FC<PassThroughProps> = ({ children, ...props }) => {
    return (
        <MotionBox
            variants={{
                hidden: { opacity: 1, scale: 0 },
                visible: {
                    opacity: 1,
                    scale: 1,
                    transition: {
                        delayChildren: 0.3,
                        staggerChildren: 0.2
                    }
                }
            }}
            {...props}
        >
            {children}
        </MotionBox>
    );
};

export const MotionItem: React.FC<PassThroughProps> = ({ children, ...props }) => {
    return (
        <MotionBox
            variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                    y: 0,
                    opacity: 1
                }
            }}
            {...props}
        >
            {children}
        </MotionBox>
    );
};

export const StaggerChildren: React.FC<PassThroughProps> = ({ children, ...props }) => {
    return (
        <MotionBox
            animate={{
                opacity: 1,
                translateY: 0
            }}
            variants={{
                initial: {
                    opacity: 0,
                    translateY: -20
                },
                enter: {
                    transition: { staggerChildren: 0.15, delayChildren: 0.4 }
                },
                exit: {
                    transition: { staggerChildren: 0.05, staggerDirection: -1 }
                }
            }}
            {...props}
        >
            {children}
        </MotionBox>
    );
};
