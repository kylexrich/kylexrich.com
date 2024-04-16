import React from 'react';
import {Box} from '@chakra-ui/react';
import {ColorWeight, useAccentColor} from '../../theme/accentColor.ts';
import {PassThroughProps} from '../../util/types/PassThroughProps.ts';
import {MotionBox} from './MotionComponents.tsx';

export interface UnderlinedHeaderProps extends PassThroughProps {
    header: string;
}

const UnderlinedHeader: React.FC<UnderlinedHeaderProps> = ({header, ...props}) => {
    return (
        <MotionBox as="h1" mt={0} mb={6} fontSize="3xl" lineHeight="shorter" fontWeight="bold"
                   textAlign="left" {...props}>
            <Box as="span" display="inline-block" position="relative">
                {header}
                <Box
                    as="span"
                    display="block"
                    position="absolute"
                    bg={useAccentColor({lightModeWeight: ColorWeight.W200, darkModeWeight: ColorWeight.W600})}
                    w={'100%'}
                    h={'1px'}
                    bottom={-2}
                />
            </Box>
        </MotionBox>
    );
};

export default UnderlinedHeader;
