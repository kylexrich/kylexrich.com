import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  fonts: {
    body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
  },
  colors: {
    navBar: {
      bg: {
        light: "white",
        dark: "gray.700",
      },
    },
    footer: {
      text: {
        light: "gray.500",
        dark: "gray.200",
      },
    },
  },
  styles: {
    global: (props: Record<string, any>) => ({
      body: {
        color: mode("gray.700", "whiteAlpha.900")(props),
        bg: mode("gray.50", "gray.900")(props),
        lineHeight: "base",
        fontSize: "1.2em",
      },
      a: {
        color: mode("blue.500", "blue.200")(props),
        transition: "color 0.15s",
        transitionTimingFunction: "ease-out",
        fontWeight: "500",
        _hover: {
          color: mode("blue.600", "blue.300")(props),
        },
      },
      h1: {
        fontSize: { base: "2xl", sm: "3xl" },
        fontWeight: "bold",
      },
      h2: {
        fontSize: { base: "xl", sm: "2xl" },
        fontWeight: "semibold",
      },
    }),
  },
  components: {
    Link: {
      baseStyle: {
        fontWeight: "inherit",
        _hover: {
          textDecoration: "none",
        },
        _focus: {
          boxShadow: "none",
        },
        variants: {
          text: {
            color: "blue.400",
            transition: "color 0.15s",
            transitionTimingFunction: "ease-out",
            fontWeight: "500",
            _hover: {
              color: "blue.300",
            },
          },
          gradient: {
            bgGradient: "linear(to-br, blue.400,blue.300)",
            bgClip: "text",
            fontWeight: "500",
            _hover: {
              bgGradient: "linear(to-br, blue.500,blue.300)",
              bgClip: "text",
            },
          },
        },
      },
    },
  },
});
