/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { SetStateAction, useState, MouseEvent } from "react";
import { Menu as MenuIcon, Search, LogoutOutlined } from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../state";
import {
  Toolbar,
  AppBar,
  useTheme,
  IconButton,
  InputBase,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../state/api";
import avatar1 from "../assets/avatar1.jpg";
import avatar2 from "../assets/avatar2.jpeg";
import { CustomTheme } from "../theme";
import { RootState } from "../state/store";

interface NavbarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: SetStateAction<boolean>) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme<CustomTheme>();
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutMutation();
  const persisted = useSelector((state: RootState) => state.persisted);
  const { user } = persisted;
  const { firstName, lastName, role } = user || {};
  const selectedAvatar = firstName === "Anderson" ? avatar1 : avatar2;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  // const handleClick = (event: { currentTarget: SetStateAction<null> }) =>
  //   setAnchorEl(event.currentTarget);
  const handleLogout = async () => {
    const response: any = await logout({});
    const isAuthenticated =
      !response.isError && !response.isLoading && response;
    setAnchorEl(null);
    if (isAuthenticated) {
      navigate("/");
      dispatch(setLogout());
    }
  };

  return (
    <AppBar sx={{ position: "static", background: "none", boxShadow: "none" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween gap="1.2rem">
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            sx={{
              backgroundColor: theme.palette.background.alt,
              borderRadius: "9px",
              gap: "3rem",
              padding: "0.1rem 1.5rem"
            }}
          >
            <InputBase placeholder="Search" />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={handleLogout}>
            <LogoutOutlined
              sx={{ fontSize: "24px" }}
              // sx={{ color: theme.palette.secondary[300], fontSize: "24px" }}
            />
          </IconButton>
          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={selectedAvatar}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  // sx={{ color: theme.palette.secondary[100] }}
                >
                  {user ? `${firstName} ${lastName}` : ""}
                  {/* Fake User */}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  // sx={{ color: theme.palette.secondary[200] }}
                >
                  {user ? role : ""}
                  {/* Administrator */}
                </Typography>
              </Box>
            </Button>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
