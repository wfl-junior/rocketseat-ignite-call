import { Box, styled, Text } from "@ignite-ui/react";

export const ConnectBox = styled(Box, {
  marginTop: "$6",
  display: "flex",
  flexDirection: "column",
  gap: "$4",
});

export const ConnectItem = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "$2",
  border: "1px solid $gray600",
  padding: "$4 $6",
  borderRadius: "$md",
});

export const AuthError = styled(Text, {
  color: "var(--color-error)",
});
