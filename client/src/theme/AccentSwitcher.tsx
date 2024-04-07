import { IconButtonProps } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { changeAccentColor } from '../redux/uiSlice';
import { theme } from './theme';
import { css, Global } from '@emotion/react';
import { buildAccentColorVariables, useAccentColor } from './accentColor';
import useSound from 'use-sound';
import { useAnimationControls } from 'framer-motion';
import { MotionIcon, MotionIconButton } from '../components/shared/MotionComponents';
import { MotionDuration } from '../components/shared/variants';

export const AccentPicker: React.FC<IconButtonProps> = ({ ...props }) => {
    const dispatch: AppDispatch = useDispatch();
    const color = useAccentColor();

    const controls = useAnimationControls();

    const [play] = useSound('assets/audios/switch.mp3', {
        volume: 0.02,
        sprite: {
            on: [0, 300]
        }
    });

    const updateAccent = useCallback(() => {
        dispatch(changeAccentColor());
    }, [dispatch]);

    const handleClick = () => {
        play({ id: 'on' });
    };

    const handleMouseEnter = () => {
        controls.start({ scale: 1.5, transition: { duration: MotionDuration.SHORT } });
    };

    const handleMouseLeave = () => {
        controls.start({ scale: 1, transition: { duration: MotionDuration.SHORT } });
    };

    return (
        <MotionIconButton
            isRound={true}
            onMouseDown={updateAccent}
            onClick={handleClick}
            color={color}
            {...props}
            onHoverStart={handleMouseEnter}
            onHoverEnd={handleMouseLeave}
        >
            <MotionIcon viewBox="0 0 200 200" boxSize="1.3em" color={color} animate={controls} initial={{ scale: 1 }}>
                <path fill="currentColor" d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0" />
            </MotionIcon>
        </MotionIconButton>
    );
};

export const GlobalAccent: React.FC = () => {
    const accentColor = useSelector((state: RootState) => state.ui.accentColor);
    const accent = theme.colors[accentColor];

    const styles = React.useMemo(
        () => css`
          :root${buildAccentColorVariables(accent)}
        }
        `,
        [accentColor]
    );
    return <Global styles={styles} />;
};
