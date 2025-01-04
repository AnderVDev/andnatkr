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
import FlexCenter from "../../../components/FlexCenter";
import CustomLineChartEstates from "./_charts/CustomLineChartEstates";
import { estates, estateDetails } from "../../../dataUtil";
import { useState } from "react";
import CustomPieChartStatementByMonth from "./_charts/CustomPieChartStatementByMonth";
// import CustomPieChartDetailByMonth from "./_charts/CustomPieChartDetailByMonth";
import CustomPieChartTotalByStatements from "./_charts/CustomPieChartTotalByStatements";
import CustomBarEstates from "./_charts/CustomBarEstates";


const Performance = () => {
  const theme = useTheme<CustomTheme>();

  // const data = realEstateTransactions;

  // Call the hook

  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [selectedEstate, setSelectedEstate] = useState<string>("506");
  const handleEstateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedEstate(event.target.value); // Update state with selected value
  };

  const [selectedDetail, setSelectedDetail] = useState<string>("Rent");
  const handleDetailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDetail(event.target.value); // Update state with selected value
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="PERFORMANCE"
        subtitle="View a full performances of properties"
      />

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
              variant="h3"
              sx={{ color: theme.palette.secondary.light, marginTop: 1 }}
            >
              Last 12 months By Statements
            </Typography>
          </FlexCenter>
          <TextField
            id="estate"
            select
            label="Estate"
            value={selectedEstate} // Control the TextField value with state
            onChange={handleEstateChange} // Update state on change
            // helperText="Please select a detail"
            sx={{
              color: theme.palette.secondary.light,
              marginTop: 0,
              marginLeft: 2,
              display: "flex",
              width: "10%",
            }}
          >
            {estates.map((option, index) => (
              <MenuItem key={`${option}-${index}`} value={option}>
                {" "}
                {/* Unique key by combining option and index */}
                {option}
              </MenuItem>
            ))}
          </TextField>
          <CustomBarEstates estate={selectedEstate} />
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
              Total by statements 506
            </Typography>
            <CustomPieChartTotalByStatements estate={"506"} />
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
              Total by statements 619
            </Typography>
            <CustomPieChartTotalByStatements estate={"619"} />
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
              Statements By Month 506
            </Typography>
          </FlexCenter>

          <CustomPieChartStatementByMonth estate={"506"} />
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
              Statements By Month 619
            </Typography>
          </FlexCenter>
          <CustomPieChartStatementByMonth estate={"619"} />
        </Box>

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
              variant="h3"
              sx={{
                color: theme.palette.secondary.light,
                marginTop: 2,
                marginBottom: 1,
              }}
            >
              Total By detail last 12 months
            </Typography>
          </FlexCenter>

          <Box display="flex" flexDirection="row">
            <TextField
              id="estate"
              select
              label="Estate"
              value={selectedEstate} // Control the TextField value with state
              onChange={handleEstateChange} // Update state on change
              // helperText="Please select a detail"
              sx={{
                color: theme.palette.secondary.light,
                marginTop: 0,
                marginLeft: 2,
                display: "flex",
                width: "10%",
              }}
            >
              {estates.map((option, index) => (
                <MenuItem key={`${option}-${index}`} value={option}>
                  {" "}
                  {/* Unique key by combining option and index */}
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="detail"
              select
              label="Detail"
              value={selectedDetail} // Control the TextField value with state
              onChange={handleDetailChange} // Update state on change
              // helperText="Please select a detail"
              sx={{
                color: theme.palette.secondary.light,
                marginTop: 0,
                marginLeft: 2,
                display: "flex",
                // justifyContent: "flex-start",
                width: "15%",
              }}
            >
              {estateDetails.map((option, index) => (
                <MenuItem key={`${option}-${index}`} value={option}>
                  {" "}
                  {/* Unique key by combining option and index */}
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <CustomLineChartEstates
            estate={selectedEstate}
            detail={selectedDetail}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Performance;
