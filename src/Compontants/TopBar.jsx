import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Stack } from "@mui/material";
import DialogLoging from "./Dialogeloing";
import DialigRegister from "./DialogRegister";
import { Navigate, useNavigate } from "react-router-dom";

const pages = ["Home", "Contents", "Setting"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function TopBar() {
  const local = window.localStorage.getItem("user") || null;
  const { name, profile_image } = JSON.parse(local) || "";
  const [openDialoge, setOpenDialoga] = React.useState(false);
  const [openRegister, setOpenRegister] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleClickOpen = () => {
    setOpenDialoga(true);
  };
  const handleClickOpenRegister = () => {
    setOpenRegister(true);
  };
  const nivgate = useNavigate()

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Trameez 
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    textTransform: "capitalize",
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title={true ? "" : "setting"}>
                {window.localStorage.getItem("login") && local ||
                window.localStorage.getItem("register") && local ? (
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={name

                      ||
                      "User" 
                      
                      }
                      src={
                        profile_image 
                        ||
                        "https://www.google.com/imgres?q=user&imgurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fthumbnails%2F002%2F318%2F271%2Fsmall_2x%2Fuser-profile-icon-free-vector.jpg&imgrefurl=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fuser-icon&docid=E3VnjqP3ez2tMM&tbnid=KvWtrjVKkrYhpM&vet=12ahUKEwi7x5W-ne-IAxU5_gIHHblpOWcQM3oECGIQAA..i&w=400&h=400&hcb=2&ved=2ahUKEwi7x5W-ne-IAxU5_gIHHblpOWcQM3oECGIQAA"
                      

                      }
                    />
                  </IconButton>
                ) : (
                  <Stack direction={"row"}>
                    <Tooltip title="Login">
                      <Button
                        variant="outlined"
                        sx={{
                          color: "white",
                          display: "block",
                          textTransform: "capitalize",
                        }}
                        onClick={handleClickOpen}
                      >
                        Login
                      </Button>
                    </Tooltip>
                    <Tooltip title="Register">
                      <Button
                        sx={{
                          color: "white",
                          display: "block",
                          textTransform: "capitalize",
                        }}
                        onClick={handleClickOpenRegister}
                      >
                        Register
                      </Button>
                    </Tooltip>
                  </Stack>
                )}
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Box
                      sx={{ textAlign: "center" }}
                      onClick={() => {
                        if (setting === "Logout") {
                          window.localStorage.clear()
                       
                          window.location.reload();
                        } else if(setting === "Profile"){
                          nivgate("/profolio")
                          location.reload()
                          
                        }
                      }}
                    >
                      {setting}
                    </Box>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <DialogLoging openDialoge={openDialoge} setOpenDialoga={setOpenDialoga} />
      <DialigRegister
        openRegister={openRegister}
        setOpenRegister={setOpenRegister}
      />
    </>
  );
}
