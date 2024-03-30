import React from 'react';
import { Box } from '@chakra-ui/react';

type UnderlinedTextProps = {
    h?: string;
    children: React.ReactNode;
};

const UnderlinedText: React.FC<UnderlinedTextProps> = (props) => {
    return (
        <Box as="span" display="inline-block" position="relative">
            {props.children}
            <Box
                as="span"
                display="block"
                position="absolute"
                bg={'gray.200'}
                w={'100%'}
                h={props.h || '1px'}
                bottom={-2}
            />
        </Box>
    );
};

export default UnderlinedText;
