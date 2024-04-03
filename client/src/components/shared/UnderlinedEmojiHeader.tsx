import React from 'react';
import { Box } from '@chakra-ui/react';

type UnderlinedEmojiHeaderProps = {
    text: string;
    emoji: string;
    marginRight?: string;
};

const UnderlinedEmojiHeader: React.FC<UnderlinedEmojiHeaderProps> = ({ text, emoji, marginRight }) => {
    return (
        <Box
            as="h1"
            mt={0}
            mb={6}
            fontSize="3xl"
            lineHeight="shorter"
            fontWeight="bold"
            textAlign="left"
            marginRight={marginRight}
        >
            <Box as="span" display="inline-block" position="relative">
                {text + ' ' + emoji}
                <Box as="span" display="block" position="absolute" bg={'gray.200'} w={'100%'} h={'1px'} bottom={-2} />
            </Box>
        </Box>
    );
};

export default UnderlinedEmojiHeader;
