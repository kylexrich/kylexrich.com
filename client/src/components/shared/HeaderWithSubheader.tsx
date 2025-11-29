import React from 'react';
import {Text, useColorModeValue} from '@chakra-ui/react';
import {MotionVStack} from './MotionComponents.tsx';
import {PassThroughProps} from '../../util/types/PassThroughProps.ts';
import UnderlinedHeader from './UnderlinedHeader.tsx';

export interface HeaderWithSubheaderProps extends PassThroughProps {
    header: string;
    subheader?: string;
}

const HeaderWithSubheader: React.FC<HeaderWithSubheaderProps> = ({header, subheader, ...props}) => {
    return (
        <MotionVStack align="start" {...props}>
            <UnderlinedHeader mt={0} mb={subheader ? 2 : 6} header={header}/>
            {subheader && (
                <Text color={useColorModeValue('gray.500', 'gray.200')} textAlign="left" mb={6}>
                    {subheader}
                </Text>
            )}
        </MotionVStack>
    );
};

export default HeaderWithSubheader;
