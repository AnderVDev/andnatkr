import { Typography, Box, useTheme } from "@mui/material";

type Props = {};

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="h2"
        color={theme.palette.primary.main}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={theme.palette.neutral.mediumMain}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
