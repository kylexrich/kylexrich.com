import React from 'react';
import { Box } from '@chakra-ui/react';

const UnderConstructionBanner: React.FC = () => {
    return (
        <Box
            position="fixed"
            left={0}
            bottom={0}
            w="full"
            bg="red.500"
            color="white"
            textAlign="center"
            p={2}
            zIndex="banner"
        >
            Website Under Construction
        </Box>
    );
};

export default UnderConstructionBanner;
