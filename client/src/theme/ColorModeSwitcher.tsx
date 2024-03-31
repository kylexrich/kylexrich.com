import React from 'react';
import { useColorMode, useColorModeValue } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { MotionBox } from '../components/shared/MotionComponents';

type ColorModeSwitcherProps = {};

const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = () => {
    const { toggleColorMode } = useColorMode();
    const iconKey = useColorModeValue('moon-icon', 'sun-icon');
    const emoji = useColorModeValue('🌙', '🌤');

    const handleClick = () => {
        toggleColorMode();
    };

    return (
        <AnimatePresence mode="wait" initial={false}>
            <MotionBox
                onClick={handleClick}
                key={iconKey}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
                cursor="pointer"
                fontSize={{ base: '2xl', sm: '3xl', md: '3xl' }}
            >
                {emoji}
            </MotionBox>
        </AnimatePresence>
    );
};

export default ColorModeSwitcher;
