import React from 'react';
import { Box } from '@chakra-ui/react';
import { ColorWeight, useAccentColor } from '../../../theme/accentColor';

const UnderConstructionBanner: React.FC = () => {
    return (
        <Box
            position="fixed"
            left={0}
            bottom={0}
            w="full"
            bg={useAccentColor({
                lightModeWeight: ColorWeight.W500,
                darkModeWeight: ColorWeight.W400
            })}
            color="white"
            textAlign="center"
            fontWeight="bold"
            p={2}
            zIndex="banner"
        >
            Website Under Construction
        </Box>
    );
};

export default UnderConstructionBanner;
