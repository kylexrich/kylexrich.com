import { PassThroughProps } from '../../util/types/PassThroughProps';
import React from 'react';
import { MotionVStack } from './MotionComponents';
import { Text, useColorModeValue } from '@chakra-ui/react';
import UnderlinedHeader from './UnderlinedHeader';

export interface HeaderWithSubheaderProps extends PassThroughProps {
    header: string;
    subheader: string;
}

const HeaderWithSubheader: React.FC<HeaderWithSubheaderProps> = ({ header, subheader, ...props }) => {
    return (
        <MotionVStack align='start' {...props}>
            <UnderlinedHeader mt={0} mb={2} header={header} />
            <Text color={useColorModeValue('gray.500', 'gray.200')} textAlign='left' mb={6}>
                {subheader}
            </Text>
        </MotionVStack>
    );
};

export default HeaderWithSubheader;
