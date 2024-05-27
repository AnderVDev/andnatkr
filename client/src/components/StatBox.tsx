import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";

interface StatBoxProps {
  span?: string;
  title: string;
  value: string | number;
  increase?: string;
  icon?: React.ReactNode; 
  description: string;
}
import { CustomTheme } from "../theme";

const StatBox: React.FC<StatBoxProps> = ({
  span,
  title,
  value,
  increase,
  icon,
  description,
}) => {
  const theme = useTheme<CustomTheme>();
  return (
    <Box
      gridColumn={`span ${span}`}
      gridRow="span 1"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1.25rem 1rem"
      flex="1 1 100%"
      bgcolor={theme.palette.background.alt}
      borderRadius="0.55rem"
    >
      <FlexBetween>
        <Typography variant="h6" >
          {title}
        </Typography>
        {icon}
      </FlexBetween>
      <Typography
        variant="h3"
        fontWeight="600"
      >
        {value}
      </Typography>
      <FlexBetween gap="1rem">
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: theme.palette.secondary.light }}
        >
          {increase}
        </Typography>
        <Typography>{description}</Typography>
      </FlexBetween>
    </Box>
  );
};

export default StatBox;
