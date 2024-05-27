import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";

import {
  AccountBalanceOutlined,
  SyncAltOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  EqualizerOutlined,
  TrendingUpOutlined,
  AccountBalanceWalletOutlined,
  HomeWorkOutlined,
  MuseumOutlined,
} from "@mui/icons-material";
import { useEffect, useState , FC} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";

interface NavItem {
  text: string;
  icon: React.ReactNode | null;
}
const navItems: NavItem[] = [
  {
    text: "Housing",
    icon: null,
  },
  {
    text: "Balance",
    icon: <AccountBalanceOutlined />,
  },
  {
    text: "Transactions",
    icon: <SyncAltOutlined />,
  },
  {
    text: "Dashboard",
    icon: <EqualizerOutlined />,
  },
  {
    text: "Real Estate",
    icon: null,
  },
  {
    text: "Overview",
    icon: <HomeWorkOutlined />,
  },
  {
    text: "Operations",
    icon: <AccountBalanceWalletOutlined />,
  },
  {
    text: "Mortgages",
    icon: <MuseumOutlined />,
  },
  // {
  //   text: "Breakdown",
  //   icon: <AccountBalanceOutlined />,
  // },
  {
    text: "Performance",
    icon: <TrendingUpOutlined />,
  },
];
interface SidebarProps {
  drawerWidth: number;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  isNonMobile: boolean;
}
const Sidebar: FC<SidebarProps> = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.grey[200],
              backgroundColor: theme.palette.background.default[700],
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.primary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    ANDNATKR
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon && text === "Housing") {
                  return (
                    <Typography key={text} sx={{ m: "0.5rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lowerText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lowerText}`);
                        setActive(lowerText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lowerText
                            ? theme.palette.grey[800]
                            : "transparent",
                        color:
                          active === lowerText
                            ? theme.palette.grey[400]
                            : theme.palette.grey[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lowerText
                              ? theme.palette.grey[400]
                              : theme.palette.grey[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lowerText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
