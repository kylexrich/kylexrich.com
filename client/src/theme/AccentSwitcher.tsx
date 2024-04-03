import { Icon, IconButton, IconButtonProps } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { changeAccentColour } from '../redux/uiSlice';
import { theme } from './theme';
import { css, Global } from '@emotion/react';
import { buildAccentColourVariables, useAccentColour } from './accentColour';

export const AccentPickerIcon = ({ ...props }) => {
    return (
        <Icon viewBox="0 0 200 200" boxSize="1.3em" {...props}>
            <path fill="currentColor" d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0" />
        </Icon>
    );
};

export const AccentPicker: React.FC<IconButtonProps> = ({ ...props }) => {
    const dispatch: AppDispatch = useDispatch();
    const color = useAccentColour();

    const updateAccent = useCallback(() => {
        dispatch(changeAccentColour());
    }, [dispatch]);

    return (
        <IconButton
            icon={<AccentPickerIcon color={color} />}
            isRound={true}
            onMouseDown={updateAccent}
            color={color}
            {...props}
        />
    );
};

export const GlobalAccent: React.FC = () => {
    const accentColour = useSelector((state: RootState) => state.ui.accentColour);
    const accent = theme.colors[accentColour];

    const styles = React.useMemo(
        () => css`
          :root${buildAccentColourVariables(accent)}
        }
        `,
        [accentColour]
    );
    return <Global styles={styles} />;
};
