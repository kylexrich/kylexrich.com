import React from 'react';
import {useColorMode, useColorModeValue} from '@chakra-ui/react';
import {AnimatePresence} from 'framer-motion';
import {MotionBox} from '../components/shared/MotionComponents.tsx';
import {MotionDuration} from '../components/shared/variants.tsx';
// @ts-expect-error use-sound doesn't have types
import useSound from 'use-sound';

export interface ColorModeSwitcherProps {
    // empty
}

const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = () => {
    const {toggleColorMode} = useColorMode();

    const text = useColorModeValue('dark', 'light');

    const [play] = useSound('assets/audios/switch.mp3', {
        volume: 0.05,
        sprite: {
            on: [0, 300],
            off: [500, 300]
        }
    });

    const iconKey = useColorModeValue('moon-icon', 'sun-icon');
    const emoji = useColorModeValue('🌙', '🌤');

    const handleClick = () => {
        if (text === 'dark') {
            play({id: 'on'});
        } else {
            play({id: 'off'});
        }
        toggleColorMode();
    };

    return (
        <AnimatePresence mode="wait" initial={false}>
            <MotionBox
                userSelect="none"
                onClick={handleClick}
                key={iconKey}
                initial={{y: -20, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                whileHover={{scale: 1.2}}
                exit={{y: 20, opacity: 0}}
                transition={{duration: MotionDuration.SHORT}}
                cursor="pointer"
                fontSize={{base: '2xl', sm: '3xl', md: '3xl'}}
            >
                {emoji}
            </MotionBox>
        </AnimatePresence>
    );
};

export default ColorModeSwitcher;
