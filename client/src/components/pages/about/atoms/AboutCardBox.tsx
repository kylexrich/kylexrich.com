import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';

type AboutCardBoxProps = {
    children: React.ReactNode;
};

const AboutCardBox: React.FC<AboutCardBoxProps> = ({ children }) => {
    const cardBackground = useColorModeValue('white', 'gray.800');
    return (
        <Box
            px={4}
            py={5}
            borderWidth="1px"
            _hover={{ shadow: 'lg' }}
            bg={cardBackground}
            position="relative"
            rounded="md"
        >
            {children}
        </Box>
    );
};

export default AboutCardBox;
