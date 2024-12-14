import { alpha, Box, CssBaseline, Stack } from "@mui/material";
import React from "react";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex", height: "100%" }}>
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: alpha(theme.palette.background.default, 1),
            overflow: "auto",
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mx: 3,
              mt: { xs: 1, md: 0 },
            }}
          >
            <Header />
            {children}
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Layout;
