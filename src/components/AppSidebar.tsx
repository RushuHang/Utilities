import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import type { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Outlet } from "react-router-dom";
import GestureIcon from "@mui/icons-material/Gesture";
import HomeIcon from "@mui/icons-material/Home";
import { NavLink } from "react-router-dom";
import FormatTextdirectionLToRIcon from "@mui/icons-material/FormatTextdirectionLToR";
import Footer from "./Footer";

const drawerWidth = 240;

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open?: boolean }>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function AppSidebar() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#f3f4f6",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          sx={{ backgroundColor: "var(--color-sctblue-600)" }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={[{ mr: 2 }, open && { display: "none" }]}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flex: 1, textAlign: "start" }}
            >
              SCT Utilities — Empowering Our Staff, Delivering Smarter IT
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <div className="flex items-center flex-1 justify-between ">
              <img
                src="/sct.png"
                alt="sctlogo"
                className="w-15 h-auto bg-white"
              />
              <p className="text-sctblue-600 font-bold ">Utilities</p>
              <IconButton onClick={handleDrawerClose}>
                <ChevronRightIcon />
              </IconButton>
            </div>
          </DrawerHeader>

          <Divider />
          <ul>
            <NavLink to="/">
              {({ isActive }) => (
                <li
                  className={`flex items-center justify-start gap-4 py-1 px-4 mr-2 my-2 transition-all ease-in-out ${
                    isActive
                      ? "bg-blue-100 text-sctblue-400 font-bold rounded-r-full" // active effect
                      : "hover:bg-sctblue-100 hover:text-sctblue-400"
                  }`}
                >
                  <HomeIcon
                    fontSize="small"
                    sx={{ color: "var(--color-sctblue-600)" }}
                  />
                  <span>Home</span>
                </li>
              )}
            </NavLink>

            <NavLink to="/signature">
              {({ isActive }) => (
                <li
                  className={`flex items-center justify-start gap-4 py-1 px-4 mr-2 my-2 transition-all ease-in-out ${
                    isActive
                      ? "bg-blue-100 text-sctblue-400 font-bold rounded-r-full" // active effect
                      : "hover:bg-sctblue-100 hover:text-sctblue-400"
                  }`}
                >
                  <GestureIcon
                    fontSize="small"
                    sx={{ color: "var(--color-sctblue-600)" }}
                  />
                  <span>Signature</span>
                </li>
              )}
            </NavLink>
            <NavLink to="/jsonformatter">
              {({ isActive }) => (
                <li
                  className={`flex items-center justify-start gap-4 py-1 px-4  transition-all ease-in-out ${
                    isActive
                      ? "bg-blue-100 text-sctblue-400 font-bold rounded-r-full" // active effect
                      : "hover:bg-sctblue-100 hover:text-sctblue-400"
                  }`}
                >
                  <FormatTextdirectionLToRIcon
                    fontSize="small"
                    sx={{ color: "var(--color-sctblue-600)" }}
                  />
                  <span>Json formatter</span>
                </li>
              )}
            </NavLink>
          </ul>
        </Drawer>

        <Main className="flex flex-col" open={open}>
          <DrawerHeader />
          <div className="flex-1">
            <Outlet />
          </div>
        </Main>
      </Box>
      <Footer />
    </Box>
  );
}
