import { IconButtonProps, useColorModeValue } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { changeAccentColor } from '../redux/uiSlice';
import { theme } from './theme';
import { css, Global } from '@emotion/react';
import { AccentColor, buildAccentColorVariables, useAccentColor } from './accentColor';
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
            userSelect='none'
            isRound={true}
            onMouseDown={updateAccent}
            onClick={handleClick}
            color={color}
            {...props}
            onHoverStart={handleMouseEnter}
            onHoverEnd={handleMouseLeave}
        >
            <MotionIcon viewBox='0 0 200 200' boxSize='1.3em' color={color} animate={controls} initial={{ scale: 1 }}>
                <path fill='currentColor' d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0' />
            </MotionIcon>
        </MotionIconButton>
    );
};

export const GlobalAccent: React.FC = () => {
    const accentColor = useSelector((state: RootState) => state.ui.accentColor);
    const colorMode = useColorModeValue('light', 'dark');
    setFavicon(accentColor, colorMode);
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

export const setFavicon = (color: AccentColor, mode: 'light' | 'dark') => {
    const faviconSizes = ['16x16', '32x32'];
    const version = new Date().getTime(); // Generates a timestamp to append as a query string

    faviconSizes.forEach((size) => {
        const link = document.querySelector(`link[rel*='icon'][sizes='${size}']`) as HTMLLinkElement;
        if (link) {
            link.href = `/assets/favicon/${mode}/${color}/favicon-${size}.png?v=${version}`;
        }
    });

    const appleLink = document.querySelector(`link[rel='apple-touch-icon']`) as HTMLLinkElement;
    if (appleLink) {
        appleLink.href = `/assets/favicon/${mode}/${color}/apple-touch-icon.png?v=${version}`;
    }

    const standardFavicon = document.querySelector("link[rel='icon'][type='image/x-icon']") as HTMLLinkElement;
    if (standardFavicon) {
        standardFavicon.href = `/assets/favicon/${mode}/${color}/favicon.ico?v=${version}`;
    }
};
