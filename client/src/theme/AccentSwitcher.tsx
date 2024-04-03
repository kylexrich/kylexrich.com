import { Icon, IconButton, IconButtonProps } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { changeAccentColor } from '../redux/uiSlice';
import { theme } from './theme';
import { css, Global } from '@emotion/react';
import { buildAccentColorVariables, useAccentColor } from './accentColor';

export const AccentPickerIcon = ({ ...props }) => {
    return (
        <Icon viewBox="0 0 200 200" boxSize="1.3em" {...props}>
            <path fill="currentColor" d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0" />
        </Icon>
    );
};

export const AccentPicker: React.FC<IconButtonProps> = ({ ...props }) => {
    const dispatch: AppDispatch = useDispatch();
    const color = useAccentColor();

    const updateAccent = useCallback(() => {
        dispatch(changeAccentColor());
    }, [dispatch]);

    return <IconButton icon={<AccentPickerIcon color={color} />} isRound={true} onMouseDown={updateAccent} color={color} {...props} />;
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
