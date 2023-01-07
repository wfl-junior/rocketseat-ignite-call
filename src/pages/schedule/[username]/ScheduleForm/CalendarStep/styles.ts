import { Box, styled, Text } from "@ignite-ui/react";

const timePickerWidth = "17.5rem";

export const Container = styled(Box, {
  margin: "$6 auto 0",
  padding: 0,
  display: "grid",
  maxWidth: "100%",
  position: "relative",
  overflow: "hidden",

  variants: {
    isTimePickerOpen: {
      true: {
        gridTemplateColumns: `1fr ${timePickerWidth}`,

        "@media(width < 900px)": {
          gridTemplateColumns: "1fr",
        },
      },
      false: {
        width: 540,
        gridTemplateColumns: "1fr",
      },
    },
  },
});

export const TimePicker = styled("div", {
  borderLeft: "1px solid $gray600",
  padding: "$6 $6 0",
  overflowY: "auto",
  position: "absolute",
  inset: "0 0 0 auto",
  width: timePickerWidth,

  // scrollbar chrome
  "&::-webkit-scrollbar": {
    width: "0.5rem",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "$gray100",
    borderRadius: "0 $md $md 0",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "$gray600",
  },

  // scrollbar firefox
  scrollbarWidth: "thin",
  scrollbarColor: "$gray600 $gray100",
});

export const TimePickerHeader = styled(Text, {
  fontWeight: "$medium",

  "> span": {
    color: "$gray200",
  },
});

export const TimePickerList = styled("div", {
  marginTop: "$3",
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "$2",

  "@media(width < 900px)": {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
});

export const TimePickerItem = styled("button", {
  border: 0,
  backgroundColor: "$gray600",
  padding: "$2 0",
  cursor: "pointer",
  color: "$gray100",
  borderRadius: "$sm",
  fontSize: "$sm",
  lineHeight: "$base",
  transition: "background-color 200ms linear",

  "&:last-child": {
    marginBottom: "$6",
  },

  "&:disabled": {
    background: "none",
    cursor: "not-allowed",
    opacity: 0.4,
  },

  "&:enabled:hover": {
    backgroundColor: "$gray500",
  },

  "&:focus": {
    outline: "none",
    boxShadow: "0 0 0 2px $colors$gray100",
  },
});
