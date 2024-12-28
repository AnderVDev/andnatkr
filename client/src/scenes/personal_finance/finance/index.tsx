import { Box, useMediaQuery } from "@mui/material";

import Header from "../../../components/Header";
import FlexBetween from "../../../components/FlexBetween";
// import { useGetTransactionQuery } from "../../../state/api";

// import { CustomTheme } from "../../../theme";
import StatBox from "../../../components/StatBox";
import {
  AccountBalanceOutlined,
  PaidOutlined,
  PaymentsOutlined,
  SavingsOutlined,
} from "@mui/icons-material";

const Finance = () => {
  // const theme = useTheme<CustomTheme>();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  // const { data, isLoading } = useGetTransactionQuery({});

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Personal Finance" subtitle="Resume of Finance" />
        {/* <ModalTransaction modalType="new" row={undefined} /> */}
      </FlexBetween>

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
      </Box>
    </Box>
  );
};

export default Finance;
