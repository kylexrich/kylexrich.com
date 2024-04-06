import React from 'react';
import { Box } from '@chakra-ui/react';
import { PassThroughProps } from '../../util/types/PassThroughProps';
import { ColorWeight, useAccentColor } from '../../theme/accentColor';

export interface UnderlinedEmojiHeaderProps extends PassThroughProps {
    // empty
}

const UnderlinedHeader: React.FC<UnderlinedEmojiHeaderProps> = ({ children, ...props }) => {
    return (
        <Box as="h1" mt={0} mb={6} fontSize="3xl" lineHeight="shorter" fontWeight="bold" textAlign="left" {...props}>
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
        </Box>
    );
};

export default UnderlinedHeader;
