import { styled, Text } from "@ignite-ui/react";

export const TextAreaControlContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$2",
});

export const ErrorMessage = styled(Text, {
  color: "var(--color-error)",
});
