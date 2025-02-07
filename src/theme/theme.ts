import { Button, createTheme, Input, rem } from "@mantine/core";

export const theme = createTheme({
  focusRing: "auto",
  white: "#EDE7E3",
  black: "#404040",
  fontSizes: {
    xs: rem(18),
    sm: rem(20),
    md: rem(24),
    lg: rem(28),
    xl: rem(32),
  },
  spacing: {
    xs: rem(10),
    sm: rem(12),
    md: rem(16),
    lg: rem(20),
    xl: rem(32),
  },
  fontFamily: "Jura, serif",
  fontFamilyMonospace: "Monaco, Courier, monospace",
  autoContrast: true,
  headings: {
    fontFamily: "Monomaniac One, serif",
    fontWeight: "400",
    sizes: {
      h1: { fontSize: "30px" },
    },
  },
  // Must have 10 shades in the array
  colors: {
    // teal.[0] primary teal
    //teal.[1] secondary teal
    //teal.[2] warning teal
    teal: [
      "#16697A",
      "#489FB5",
      "82C0CC",
      "#0c3841",
      "#1b8297",
      "#23a7c2",
      "#3dc1dc",
      "#68cfe4",
      "#93dcec",
      "#beeaf3",
    ],
    // yellow.[0] primary yellow
    yellow: [
      "#FFA62B",
      "#4d2c00",
      "#804a00",
      "#b36800",
      "#e68500",
      "#ff9f1a",
      "#ffb44d",
      "#ed8900",
      "#ffc980",
      "#ffdfb3",
    ],
    // white, black, pink, orange red, purple
    secondary: [
      "EDE7E3",
      "#404040",
      "8E5572",
      "E63946",
      "8D6A9F",
      "9B2915",
      "B8D8D8",
      "EEF5DB",
      "92B6B1",
      "B2C9AB",
    ],
  },
  shadows: {
    md: "1px 1px 3px rgba(0, 0, 0, .25)",
    xl: "5px 5px 3px rgba(0, 0, 0, .25)",
  },
  components: {
    Button: Button.extend({
      defaultProps: {
        color: "#16697A",
        variant: "outline",
        size: "md",
      },
    }),
    Input: Input.extend({
      defaultProps: {
        variant: "default",
        size: "lg",
      },
    }),
  },
});
