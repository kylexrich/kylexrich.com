import React from 'react';
import { Box, Center } from '@chakra-ui/react';

export type ContainerProps = {
    children: React.ReactNode;
} & React.ComponentProps<typeof Center>;

export const Container: React.FC<ContainerProps> = ({ children, ...props }) => {
    return (
        <Center as="section" {...props} w="100%">
            <Box textAlign="center" fontSize="xl" w={['90%', '85%', '80%']} maxW={800} mx="auto">
                {children}
            </Box>
        </Center>
    );
};

export default Container;
