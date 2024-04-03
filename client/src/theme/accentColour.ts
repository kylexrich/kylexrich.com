import { useColorModeValue } from '@chakra-ui/react';

export enum AccentColour {
    Green = 'green',
    Cyan = 'cyan',
    Orange = 'orange',
    Blue = 'blue',
    Pink = 'pink',
    Teal = 'teal',
    Purple = 'purple',
    Red = 'red'
}

export const ACCENT_COLOURS: AccentColour[] = Object.values(AccentColour);

export const ACCENT_THEME_DEF = {
    accent: {
        50: 'var(--colours-accent-50)',
        100: 'var(--colours-accent-100)',
        200: 'var(--colours-accent-200)',
        300: 'var(--colours-accent-300)',
        400: 'var(--colours-accent-400)',
        500: 'var(--colours-accent-500)',
        600: 'var(--colours-accent-600)',
        700: 'var(--colours-accent-700)',
        800: 'var(--colours-accent-800)',
        900: 'var(--colours-accent-900)'
    }
};

export function buildAccentColourVariables(colourObject: any): string {
    return `{
                --colours-accent-50: ${colourObject[50]};
                --colours-accent-100: ${colourObject[100]};
                --colours-accent-200: ${colourObject[200]};
                --colours-accent-300: ${colourObject[300]};
                --colours-accent-400: ${colourObject[400]};
                --colours-accent-500: ${colourObject[500]};
                --colours-accent-600: ${colourObject[600]};
                --colours-accent-700: ${colourObject[700]};
                --colours-accent-800: ${colourObject[800]};
                --colours-accent-900: ${colourObject[900]};
            }`;
}

export enum ColourWeight {
    W50 = 50, // Lightest colour weight
    W100 = 100,
    W200 = 200,
    W300 = 300,
    W400 = 400,
    W500 = 500,
    W600 = 600,
    W700 = 700,
    W800 = 800,
    W900 = 900 // Darkest colour weight
}

type AccentColourModeSettings = { lightModeWeight: ColourWeight; darkModeWeight: ColourWeight };

export function useAccentColour(accentColourModeSettings?: AccentColourModeSettings) {
    const { lightModeWeight, darkModeWeight } = accentColourModeSettings ?? {
        lightModeWeight: ColourWeight.W500,
        darkModeWeight: ColourWeight.W400
    };
    return useColorModeValue(`accent.${lightModeWeight}`, `accent.${darkModeWeight}`);
}
