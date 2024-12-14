import { Box, Typography } from "@mui/material";
import { Link, Stack } from "expo-router";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Box>
        <Typography variant="h1" align="center" gutterBottom>
          This screen doesn't exist.
        </Typography>
        <Link href="/">
          <Typography>Go to home screen!</Typography>
        </Link>
      </Box>
    </>
  );
}
