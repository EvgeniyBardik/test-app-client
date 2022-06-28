import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import useStyles from "./styles";
import { Box, Typography, Grid, Divider, List, Button } from "@mui/material";
import { ReactNode } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { api } from "../../redux/UserService";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { AppBar, Drawer } from "./AppBar";
import { useLocation, Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const { pathname } = useLocation();
  const [logout] = api.useLogoutUserMutation();
  const logoutHandler = () => {
    logout("");
  };
  const [open, setOpen] = React.useState(true);
  const { classes } = useStyles();
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>
          <Button
            onClick={logoutHandler}
            variant="text"
            sx={{ textTransform: "none" }}
          >
            <Typography color="white">Logout</Typography>
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <ListItemButton
            component={Link}
            to={"/main"}
            selected={"/main" === pathname}
          >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Companies" />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to={"/profile"}
            selected={"/profile" === pathname}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
          <ListItemButton onClick={logoutHandler}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container
          maxWidth="lg"
          sx={{
            mt: 4,
            mb: 4,
          }}
        >
          <Grid container spacing={3} className={classes.main}>
            {children}
          </Grid>
          <footer className={classes.footer}>
            <Typography>Test App</Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              {"Copyright © "}
              {new Date().getFullYear()}.
            </Typography>
          </footer>
        </Container>
      </Box>
    </Box>
  );
}

export default Layout;