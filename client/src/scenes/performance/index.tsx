import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import FlexBetween from "../../components/FlexBetween";
import {
  AddCircleOutlineOutlined,
  ApartmentOutlined,
  PaidOutlined,
  SavingsOutlined,
  AccountBalanceWalletOutlined,
  MonetizationOnOutlined,
  ManOutlined,
  Person3Outlined,
  PermIdentityOutlined,
} from "@mui/icons-material";
import StatBox from "../../components/StatBox";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

type Props = {};

const Performance = (props: Props) => {
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="PERFORMANCE"
        subtitle="View a full performances of properties"
      />
    </Box>
  );
};

export default Performance;
