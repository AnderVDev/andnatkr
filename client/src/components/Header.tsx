import { Typography, Box, useTheme } from "@mui/material";
import { CustomTheme } from "../theme";
interface Props {
  title: string;
  subtitle: string;
}

const Header = ({ title, subtitle }: Props) => {
  const theme = useTheme<CustomTheme>();
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
