import { styled, Text } from "@ignite-ui/react";

export const InputControlContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$2",
});

export const ErrorMessage = styled(Text, {
  color: "#F75A68",
});
