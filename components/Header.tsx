import * as React from "react";
import Stack from "@mui/material/Stack";
import ColorModeIconDropdown from ".././theme/ColorModeIconDropdown";
import { Box, Typography } from "@mui/material";

export default function Header() {
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: "none", md: "flex" },
        width: "100%",
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: "space-between",
        maxWidth: { sm: "100%", md: "1700px" },
        pt: 1.5,
      }}
      spacing={2}
    >
      <Box>
        <Typography component="h2" variant="h6" sx={{ alignContent: "center" }}>
          Task List
        </Typography>
      </Box>
      <Stack direction="row" sx={{ gap: 1 }}>
        <ColorModeIconDropdown />
      </Stack>
    </Stack>
  );
}
