import Form from "./Form.tsx";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { CustomTheme } from "../../theme.ts";
// type Props = {};

const LoginPage = () => {
  const theme = useTheme<CustomTheme>();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        bgcolor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          AndnaTkr
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        bgcolor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to AndnaTkr a simple Finance Tracker!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
