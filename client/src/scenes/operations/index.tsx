import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { flatten } from "flat";
import ModalRealEstate from "./Modal";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
// import StatBox from "../../components/StatBox";
import FlexBetween from "../../components/FlexBetween";
import { useGetEstateMgmtQuery } from "../../state/api";
import ActionButtons from "../../components/ActionButtons";
import { useEffect, useState } from "react";

// import { AddCircleOutlineOutlined } from "@mui/icons-material";

// type Props = {};



const Operations = () => {
  const theme = useTheme();
  // const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  // const [gridData, setGridData] = useState([]);
  const { data, isLoading, refetch } = useGetEstateMgmtQuery();
  const flattenedData = data ? data.map((item: JSON) => flatten(item)) : [];
  const [triggerUpdate, setTriggerUpdate] = useState(false);

  
  // useEffect(()=>{
    //   const flattenedData = data ? data.map((item: JSON) => flatten(item)) : [];
    //   setGridData(flattenedData);
    // },[data])
    
    useEffect(() => {
      refetch();
    }, [triggerUpdate]);// eslint-disable-next-line react-hooks/exhaustive-deps

    const HandledUpdate = () => setTriggerUpdate(!triggerUpdate);

  // const updatedGridData = (entry) => {
  //   setGridData(() => []);
  // };
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.3,
    },
    {
      field: "user.firstName",
      headerName: "User",
      flex: 0.5,
    },
  
    {
      field: "financeStatement",
      headerName: "Statement",
      flex: 0.7,
    },
    {
      field: "estate.dep_number",
      headerName: "Estate",
      flex: 0.5,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.5,
    },
    {
      field: "month",
      headerName: "Month",
      flex: 0.5,
    },
    {
      field: "year",
      headerName: "Year",
      flex: 0.5,
    },
    {
      field: "detail",
      headerName: "Detail",
      flex: 1,
    },
    {
      field: "comments",
      headerName: "Comments",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => <ActionButtons id={params.row.id} onDeleted={HandledUpdate} />,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="OPERTATIONS"
          subtitle="List of Real estate administration Transactions"
        />
        <ModalRealEstate onUpdated={HandledUpdate} />
      </FlexBetween>
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.neutral[100],
            // color: theme.palette.,
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            // backgroundColor: theme.palette.background.alt,
            backgroundColor: theme.palette.background.paper,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.neutral[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.neutral[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row.id}
          // rows={gridData}
          rows={flattenedData || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Operations;
