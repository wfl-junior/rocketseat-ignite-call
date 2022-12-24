import { Box, styled } from "@ignite-ui/react";

export const ConnectBox = styled(Box, {
  marginTop: "$6",
  display: "flex",
  flexDirection: "column",
  gap: "$2",
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
