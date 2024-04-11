import { extendTheme, theme as defaultTheme, ThemeConfig } from '@chakra-ui/react';
import { ACCENT_THEME_DEF, ColorWeight, useAccentMode, useMode } from './accentColor';

/* eslint-disable react-hooks/rules-of-hooks */

export interface ColorMode {
    light: string;
    dark: string;
}

const config: ThemeConfig = {
    initialColorMode: 'system',
    useSystemColorMode: true
};

export const theme = extendTheme({
    config,
    fonts: {
        body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`
    },
    colors: {
        ...defaultTheme.colors,
        navBar: {
            bg: {
                light: 'white',
                dark: 'gray.700'
            }
        },
        about: {
            aboutCard: {
                bg: {
                    light: 'white',
                    dark: 'gray.800'
                },
                textColor: {
                    light: 'gray.700',
                    dark: 'gray.300'
                },
                subTextColor: {
                    light: 'gray.500',
                    dark: 'gray.400'
                }
            }
        },
        ...ACCENT_THEME_DEF
    },
    styles: {
        global: ({ colorMode }: Record<string, any>) => ({
            html: {
                maxWidth: '100vw',
                overflowX: 'hidden'
            },
            body: {
                color: useMode(colorMode, { lightMode: 'gray.700', darkMode: 'whiteAlpha.900' }),
                bg: useMode(colorMode, { lightMode: 'gray.50', darkMode: 'gray.900' }),
                lineHeight: 'base',
                fontSize: '1.2em'
            },
            a: {
                color: useMode(colorMode, { lightMode: 'blue.500', darkMode: 'blue.200' }),
                transition: 'color 0.15s',
                transitionTimingFunction: 'ease-out',
                fontWeight: '500',
                _hover: {
                    color: useAccentMode(colorMode, { lightModeWeight: ColorWeight.W600, darkModeWeight: ColorWeight.W200 })
                }
            },
            h1: {
                fontSize: { base: '2xl', sm: '3xl' },
                fontWeight: 'bold'
            },
            h2: {
                fontSize: { base: 'xl', sm: '2xl' },
                fontWeight: 'semibold'
            }
        })
    },
    components: {
        Link: {
            baseStyle: ({ colorMode }: Record<string, any>) => ({
                fontWeight: 'inherit',
                _hover: {
                    textDecoration: 'none'
                },
                _focus: {
                    boxShadow: 'none'
                }
            })
        },
        Button: {
            baseStyle: ({ colorMode }: Record<string, any>) => ({}),
            variants: {
                primaryButton: ({ colorMode }: Record<string, any>) => ({
                    color: useAccentMode(colorMode, {
                        lightModeWeight: ColorWeight.W900,
                        darkModeWeight: ColorWeight.W50
                    }),
                    bg: useAccentMode(colorMode, {
                        lightModeWeight: ColorWeight.W100,
                        darkModeWeight: ColorWeight.W700
                    }),
                    _hover: {
                        color: useAccentMode(colorMode, {
                            lightModeWeight: ColorWeight.W900,
                            darkModeWeight: ColorWeight.W50
                        }),
                        bg: useAccentMode(colorMode, {
                            lightModeWeight: ColorWeight.W300,
                            darkModeWeight: ColorWeight.W900
                        })
                    }
                })
            }
        }
    }
});
