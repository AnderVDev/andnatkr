import { Box, Button, useTheme } from "@mui/material";
import Header from "../../components/Header";
import FlexBetween from "../../components/FlexBetween";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
type Props = {};

const Balance = () => {
  const theme = useTheme();
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="BALANCE" subtitle="Managing balance" />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              mr: "24px"
            }}
          >
            <AddCircleOutlineOutlined  />
          </Button>
        </Box>
      </FlexBetween>
    </Box>
  );
};

export default Balance;
