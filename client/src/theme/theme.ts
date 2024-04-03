import { extendTheme, theme as defaultTheme, ThemeConfig } from '@chakra-ui/react';
import { ACCENT_THEME_DEF, ColorWeight, useAccentColor } from './accentColor';

/* eslint-disable react-hooks/rules-of-hooks */

export interface ColorMode {
    light: string;
    dark: string;
}

const config: ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: false
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
        global: (props: Record<string, any>) => ({
            body: {
                color: props.colorMode === 'dark' ? 'whiteAlpha.900' : 'gray.700',
                bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.50',
                lineHeight: 'base',
                fontSize: '1.2em'
            },
            a: {
                color: props.colorMode === 'dark' ? 'blue.200' : 'blue.500',
                transition: 'color 0.15s',
                transitionTimingFunction: 'ease-out',
                fontWeight: '500',
                _hover: {
                    color: useAccentColor({ lightModeWeight: ColorWeight.W600, darkModeWeight: ColorWeight.W200 })
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
            baseStyle: {
                fontWeight: 'inherit',
                _hover: {
                    textDecoration: 'none'
                },
                _focus: {
                    boxShadow: 'none'
                },
                variants: {
                    text: {
                        color: 'blue.400',
                        transition: 'color 0.15s',
                        transitionTimingFunction: 'ease-out',
                        fontWeight: '500',
                        _hover: {
                            color: 'blue.300'
                        }
                    },
                    gradient: {
                        bgGradient: 'linear(to-br, blue.400,blue.300)',
                        bgClip: 'text',
                        fontWeight: '500',
                        _hover: {
                            bgGradient: 'linear(to-br, blue.500,blue.300)',
                            bgClip: 'text'
                        }
                    }
                }
            }
        }
    }
});
