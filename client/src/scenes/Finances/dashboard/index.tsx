import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import CircularProgressWithLabel from "../../../components/CircularProgress";
import { flatten } from "flat";
import numeral from "numeral";
import Header from "../../../components/Header";
import FlexBetween from "../../../components/FlexBetween";
import Modal from "./modal/Modal";
import StatBox from "../../../components/StatBox";
import {
  AccountBalanceOutlined,
  PaidOutlined,
  PaymentsOutlined,
  SavingsOutlined,

} from "@mui/icons-material";
import ActionButtons from "./ActionButtons";
import { useGetGoalQuery } from "../../../state/api";
import { CustomTheme } from "../../../theme";
// type Props = {}

const Dashboard = () => {
  const theme = useTheme<CustomTheme>();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetGoalQuery({});
  const flattenedData = data ? data.map((item: JSON) => flatten(item)) : [];

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.2,
    },
    {
      field: "objective",
      headerName: "Objective",
      flex: 0.4,
    },
    {
      field: "target",
      headerName: "Target",
      flex: 0.3,
      renderCell: (params) => numeral(params.value).format("0,0.00"),
    },
    {
      field: "current",
      headerName: "Current",
      flex: 0.3,
      renderCell: (params) => numeral(params.value).format("0,0.00"),
    },
    {
      field: "progress",
      headerName: "Progress",
      flex: 0.4,
      renderCell: (params) => <CircularProgressWithLabel value={(params.row.current/params.row.target) * 100} />,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => (
        <ActionButtons row={params.row} modalType="update" />
      ),
    },
  ];
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="DASHBOARD" subtitle="Dashboard Finance and Goals" />

      {/* Main Grid */}
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          span="3"
          title="Total Balance"
          value="1000"
          increase=""
          description=""
          icon={<AccountBalanceOutlined sx={{ fontSize: "26px" }} />}
        />
        <StatBox
          span="3"
          title="Total Savings"
          value="1000"
          increase=""
          description=""
          icon={<SavingsOutlined sx={{ fontSize: "26px" }} />}
        />
        <StatBox
          span="3"
          title="Total Incomes"
          value="1000"
          increase=""
          description=""
          icon={<PaidOutlined sx={{ fontSize: "26px" }} />}
        />
        <StatBox
          span="3"
          title="Total Expenses"
          value="1000"
          increase=""
          description=""
          icon={<PaymentsOutlined sx={{ fontSize: "26px" }} />}
        />

        {/* ROW 2 */}

        {/* Row3 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          borderRadius="0.55rem"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.grey[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.paper,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.grey[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.neutral.main} !important`,
            },
          }}
        >
          <Box
            gridColumn="span 4"
            gridRow="span 3"
            borderRadius="0.55rem"
          >
            <FlexBetween>
              <Typography
                variant="h6"
                sx={{ ml: "1rem" }}
              >
                Goals List
              </Typography>
              <Modal />
            </FlexBetween>
          </Box>
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row.id}
            rows={flattenedData}
            columns={columns}
          />
        </Box>
      </Box>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(4, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      ></Box>
    </Box>
  );
};

export default Dashboard;
