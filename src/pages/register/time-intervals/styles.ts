import { Box, styled, Text } from "@ignite-ui/react";

export const IntervalForm = styled(Box, {
  marginTop: "$6",
  display: "flex",
  flexDirection: "column",
});

export const IntervalsContainer = styled("div", {
  border: "1px solid $gray600",
  borderRadius: "$md",
  marginBottom: "$4",
});

export const IntervalItem = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "$4",
  padding: "$3 $4",

  "& + &": {
    borderTop: "1px solid $gray600",
  },
});

export const IntervalDay = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$3",

  "> label": {
    cursor: "pointer",
  },
});

export const IntervalInputs = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$2",

  "input::-webkit-calendar-picker-indicator": {
    filter: "invert(100%) brightness(30%)",
  },
});

export const FormError = styled(Text, {
  color: "var(--color-error)",
  marginTop: "$4",
});
