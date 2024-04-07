import React from 'react';
import { Box } from '@chakra-ui/react';
import { PropsAndChildren } from '../../util/types/PassThroughProps';
import { ColorWeight, useAccentColor } from '../../theme/accentColor';
import { MotionBox } from './MotionComponents';

export interface UnderlinedEmojiHeaderProps extends PropsAndChildren {
    // empty
}

const UnderlinedHeader: React.FC<UnderlinedEmojiHeaderProps> = ({ children, ...props }) => {
    return (
        <MotionBox as="h1" mt={0} mb={6} fontSize="3xl" lineHeight="shorter" fontWeight="bold" textAlign="left" {...props}>
            <Box as="span" display="inline-block" position="relative">
                {children}
                <Box
                    as="span"
                    display="block"
                    position="absolute"
                    bg={useAccentColor({ lightModeWeight: ColorWeight.W200, darkModeWeight: ColorWeight.W600 })}
                    w={'100%'}
                    h={'1px'}
                    bottom={-2}
                />
            </Box>
        </MotionBox>
    );
};

export default UnderlinedHeader;
