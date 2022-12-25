import { globalCss } from "@ignite-ui/react";

export const globalStyles = globalCss({
  ":root": {
    "--color-error": "#F75A68",
  },
  "*, *::before, *::after": {
    boxSizing: "border-box",
    padding: 0,
    margin: 0,
  },
  body: {
    backgroundColor: "$gray900",
    color: "$gray100",
    "-webkit-font-smoothing": "antialiased",
  },
});
