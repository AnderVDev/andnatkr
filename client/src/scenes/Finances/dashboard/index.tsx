import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Header from "../../../components/Header";
import { CustomTheme } from "../../../theme";
import CustomBarChart from "../../../components/chart/CustomBarPosition";
import CustomPieChart from "../../../components/chart/CustomPieChart";
import FlexCenter from "../../../components/FlexCenter";
import CustomLineChart from "../../../components/chart/CustomLineChart";
// type Props = {}

const Dashboard = () => {
  const theme = useTheme<CustomTheme>();

  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

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
              Last 12 months
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
              Totals
            </Typography>
            <CustomPieChart />
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
              Total Expenses By detail
            </Typography>
            <CustomPieChart />
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
              Total Statement By Month
            </Typography>
            <CustomPieChart />
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
              Total detail By month
            </Typography>
            <CustomPieChart />
          </FlexCenter>
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
              sx={{ color: theme.palette.secondary.light, marginTop: 2 }}
            >
              Total statement last 12 months
            </Typography>
            {/* <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                },
              ]}
              width={500}
              height={300}
            /> */}
            <CustomLineChart />
          </FlexCenter>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
