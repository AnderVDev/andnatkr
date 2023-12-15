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
  Email,
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
import TodoList from "../../components/TodoList";
// import Dialog from "../../components/Dialog";
import Modal from "../../components/Modal";

type Props = {};

const Overview = () => {
  return <Box m="1.5rem 2.5rem">
    <Header title="OVERVIEW" subtitle="Real Estate Overview"/>
  </Box>;
};

export default Overview;
