import {
  Box,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Header from "../../../components/Header";
import { CustomTheme } from "../../../theme";
import CustomBarChart from "../../../components/chart/CustomBarPosition";
import FlexCenter from "../../../components/FlexCenter";
import CustomLineChart from "../../../components/chart/CustomLineChart";
import CustomPieChartByDetail from "./_charts/CustomPieChartByDetail";
import { transactionDetails } from "../../../dataUtil";
import { useState } from "react";
import CustomPieChartStatementByMonth from "./_charts/CustomPieChartStatementByMonth";
import CustomPieChartDetailByMonth from "./_charts/CustomPieChartDetailByMonth";
import CustomPieChartTotalByStatements from "./_charts/CustomPieChartTotalByStatements";
// type Props = {}

const Dashboard = () => {
  const theme = useTheme<CustomTheme>();

  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [selectedDetail, setSelectedDetail] = useState<string>("Salary");
  const handleDetailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDetail(event.target.value); // Update state with selected value
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="DASHBOARD" subtitle="Finance resume" />

      {/* Main Grid */}
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          mt="20px"
          display="grid"
          gridColumn="span 12"
          gridRow="span 3"
          bgcolor={theme.palette.background.alt}
          borderRadius="0.55rem"
          sx={{
            "& > div": {
              gridColumn: isNonMediumScreens ? undefined : "span 12",
            },
          }}
        >
          <FlexCenter>
            <Typography
              variant="h2"
              sx={{ color: theme.palette.secondary.light, marginTop: 1 }}
            >
              Last 12 months By Statements
            </Typography>
            <CustomBarChart />
          </FlexCenter>
        </Box>

        {/* Row 2 */}
        <Box
          mt="20px"
          display="grid"
          gridColumn="span 6"
          gridRow="span 2"
          bgcolor={theme.palette.background.alt}
          borderRadius="0.55rem"
          sx={{
            "& > div": {
              gridColumn: isNonMediumScreens ? undefined : "span 12",
            },
          }}
        >
          <FlexCenter>
            <Typography
              variant="h3"
              sx={{ color: theme.palette.secondary.light, marginTop: 2 }}
            >
              Total By statements
            </Typography>
            <CustomPieChartTotalByStatements />
          </FlexCenter>
        </Box>

        <Box
          mt="20px"
          display="grid"
          gridColumn="span 6"
          gridRow="span 2"
          bgcolor={theme.palette.background.alt}
          borderRadius="0.55rem"
          sx={{
            "& > div": {
              gridColumn: isNonMediumScreens ? undefined : "span 12",
            },
          }}
        >
          <FlexCenter>
            <Typography
              variant="h3"
              sx={{ color: theme.palette.secondary.light, marginTop: 2 }}
            >
              Expenses By detail
            </Typography>
            <CustomPieChartByDetail />
          </FlexCenter>
        </Box>

        {/* Row 3 */}

        <Box
          mt="20px"
          display="grid"
          gridColumn="span 6"
          gridRow="span 2"
          bgcolor={theme.palette.background.alt}
          borderRadius="0.55rem"
          sx={{
            "& > div": {
              gridColumn: isNonMediumScreens ? undefined : "span 12",
            },
          }}
        >
          <FlexCenter>
            <Typography
              variant="h3"
              sx={{ color: theme.palette.secondary.light, marginTop: 2 }}
            >
              Statement By Month
            </Typography>
          </FlexCenter>
          

          <CustomPieChartStatementByMonth />
        </Box>

        <Box
          mt="20px"
          display="grid"
          gridColumn="span 6"
          gridRow="span 2"
          bgcolor={theme.palette.background.alt}
          borderRadius="0.55rem"
          sx={{
            "& > div": {
              gridColumn: isNonMediumScreens ? undefined : "span 12",
            },
          }}
        >
          <FlexCenter>
            <Typography
              variant="h3"
              sx={{ color: theme.palette.secondary.light, marginTop: 2 }}
            >
              Detail By month
            </Typography>
          </FlexCenter>
            <CustomPieChartDetailByMonth />
        </Box>

        <Box
          mt="20px"
          display="grid"
          gridColumn="span 12"
          gridRow="span 4"
          bgcolor={theme.palette.background.alt}
          borderRadius="0.55rem"
          sx={{
            "& > div": {
              gridColumn: isNonMediumScreens ? undefined : "span 12",
            },
          }}
        >
          <FlexCenter>
            <Typography
              variant="h3"
              sx={{ color: theme.palette.secondary.light, marginTop: 2 }}
            >
              Total By detail last 12 months
            </Typography>
          </FlexCenter>
          <TextField
            id="detail"
            select
            label="Detail"
            value={selectedDetail} // Control the TextField value with state
            onChange={handleDetailChange} // Update state on change
            // helperText="Please select a detail"
            sx={{
              color: theme.palette.secondary.light,
              marginTop: 2,
              marginLeft: 2,
              display: "flex",
              // justifyContent: "flex-start",
              width: "10%",
            }}
          >
            {transactionDetails.map((option, index) => (
              <MenuItem key={`${option}-${index}`} value={option}>
                {" "}
                {/* Unique key by combining option and index */}
                {option}
              </MenuItem>
            ))}
          </TextField>
          <CustomLineChart detail={selectedDetail} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
