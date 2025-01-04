import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ActionButtons from "./ActionButtons";
import CircularProgressWithLabel from "../../../../components/CircularProgress";
import numeral from "numeral";
import {
  Box,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { CustomTheme } from "../../../../theme";
import FlexBetween from "../../../../components/FlexBetween";
import Modal from "./Modal";
import { useGetGoalQuery } from "../../../../state/api";
// import { flatten } from "flat";
import { useSelector } from "react-redux";
import { RootState } from "../../../../state/store";
import { dataByUser } from "../../../../utilitiesByUser";
import { flatten } from "flat";

interface Goal {
  id: string;
  objective: string; // The objective or goal
  target: string; // Target value as a string
  current: string; // Current value as a string, calculated or "0"
  type: string; // Type of saving, e.g., "personal"
}

export default function SavingPersonalGrid() {
  const theme = useTheme<CustomTheme>();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  const persisted = useSelector((state: RootState) => state.persisted);
  const { user } = persisted;
  const id = user ? user.id : "";
  // console.log({ id });

  const { data, isLoading } = useGetGoalQuery({});
  const flattenedData = data ? data.map((item: Goal) => flatten(item)) : [];

  const filteredData = flattenedData
    ? flattenedData.filter((item: Goal) => item.type === "personal")
    : [];
  // const currentUserData = dataByUser(filteredData, id)
  const currentUserData = dataByUser(filteredData, id);
  // const currentUserData = dataByUser(
  //   filteredData,
  //   "cde08541-13e8-43bc-b662-c349b0652bf9"
  // );

  const columns: GridColDef[] = [
    // {
    //   field: "id",
    //   headerName: "ID",
    //   flex: 0.2,
    // },
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
    <Box
      gridColumn="span 8"
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
      <Box
        gridColumn="span 4"
        borderRadius="0.55rem"
        sx={{ backgroundColor: theme.palette.background.alt }}
      >
        <FlexBetween>
          <Typography variant="h6" sx={{ ml: "1rem" }}>
            Saving List
          </Typography>
          <Modal modalType={""} row={undefined} />
        </FlexBetween>
        <Divider />
      </Box>
      <DataGrid
        loading={isLoading || !data}
        getRowId={(row) => row.id}
        rows={currentUserData}
        columns={columns}
      />
    </Box>
  );
}
