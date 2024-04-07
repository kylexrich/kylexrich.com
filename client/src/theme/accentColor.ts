import { useColorModeValue } from '@chakra-ui/react';

export enum AccentColor {
    Green = 'green',
    Cyan = 'cyan',
    Orange = 'orange',
    Blue = 'blue',
    Pink = 'pink',
    Teal = 'teal',
    Purple = 'purple',
    Red = 'red'
}

export const ACCENT_COLOURS: AccentColor[] = Object.values(AccentColor);

export const ACCENT_THEME_DEF = {
    accent: {
        50: 'var(--colors-accent-50)',
        100: 'var(--colors-accent-100)',
        200: 'var(--colors-accent-200)',
        300: 'var(--colors-accent-300)',
        400: 'var(--colors-accent-400)',
        500: 'var(--colors-accent-500)',
        600: 'var(--colors-accent-600)',
        700: 'var(--colors-accent-700)',
        800: 'var(--colors-accent-800)',
        900: 'var(--colors-accent-900)'
    }
};

export function buildAccentColorVariables(colorObject: any): string {
    return `{
                --colors-accent-50: ${colorObject[50]};
                --colors-accent-100: ${colorObject[100]};
                --colors-accent-200: ${colorObject[200]};
                --colors-accent-300: ${colorObject[300]};
                --colors-accent-400: ${colorObject[400]};
                --colors-accent-500: ${colorObject[500]};
                --colors-accent-600: ${colorObject[600]};
                --colors-accent-700: ${colorObject[700]};
                --colors-accent-800: ${colorObject[800]};
                --colors-accent-900: ${colorObject[900]};
            }`;
}

export enum ColorWeight {
    W50 = 50, // Lightest color weight
    W100 = 100,
    W200 = 200,
    W300 = 300,
    W400 = 400,
    W500 = 500,
    W600 = 600,
    W700 = 700,
    W800 = 800,
    W900 = 900 // Darkest color weight
}

export interface AccentColorModeSettings {
    lightModeWeight: ColorWeight;
    darkModeWeight: ColorWeight;
}

export function useAccentColor(accentColorModeSettings?: AccentColorModeSettings) {
    const { lightModeWeight, darkModeWeight } = accentColorModeSettings ?? {
        lightModeWeight: ColorWeight.W500,
        darkModeWeight: ColorWeight.W400
    };
    return useColorModeValue(`accent.${lightModeWeight}`, `accent.${darkModeWeight}`);
}

export function useAccentMode(mode: string, accentColorModeSettings?: AccentColorModeSettings) {
    const { lightModeWeight, darkModeWeight } = accentColorModeSettings ?? {
        lightModeWeight: ColorWeight.W500,
        darkModeWeight: ColorWeight.W400
    };
    return useMode(mode, { lightMode: `accent.${lightModeWeight}`, darkMode: `accent.${darkModeWeight}` });
}

export function useMode(mode: string, { lightMode, darkMode }: { lightMode: string; darkMode: string }) {
    return mode === 'light' ? lightMode : darkMode;
}
