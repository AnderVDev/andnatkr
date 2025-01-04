import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import CircularProgressWithLabel from "../../../components/CircularProgress";

import numeral from "numeral";
import Header from "../../../components/Header";
import FlexBetween from "../../../components/FlexBetween";
import Modal from "./modal/Modal";

import ActionButtons from "./ActionButtons";
import { useGetGoalQuery } from "../../../state/api";
import { CustomTheme } from "../../../theme";
import { flatten } from "flat";

// type Props = {}
interface Goal {
  id: string;
  objective: string; // The objective or goal
  target: string; // Target value as a string
  current: string; // Current value as a string, calculated or "0"
  type: string; // Type of saving, e.g., "personal"
}
const Savings = () => {
  const theme = useTheme<CustomTheme>();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetGoalQuery({});
  const flattenedData = data ? data.map((item: JSON) => flatten(item)) : [];

  const filteredData = flattenedData
    ? flattenedData.filter((item: Goal) => item.type === "housing")
    : [];

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
      renderCell: (params) => (
        <CircularProgressWithLabel
          value={(params.row.current / params.row.target) * 100}
        />
      ),
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
      <Header title="SAVINGS" subtitle="Saving Goals" />

      {/* Main Grid */}
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
      >
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          borderRadius="0.55rem"
          sx={{
            "& > div": {
              gridColumn: isNonMediumScreens ? undefined : "span 12",
            },
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
          <Box gridColumn="span 4" gridRow="span 3" borderRadius="0.55rem">
            <FlexBetween>
              <Typography variant="h6" sx={{ ml: "1rem" }}>
                Saving List
              </Typography>
              <Modal modalType={""} row={undefined} />
            </FlexBetween>
          </Box>
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row.id}
            rows={filteredData}
            columns={columns}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Savings;
