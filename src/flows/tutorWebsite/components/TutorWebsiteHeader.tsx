import { AppBar, Avatar, Box, Button, Drawer, IconButton, List, ListItem, ListItemText, Toolbar, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";

import EiraLogo from "../../../assets/images/png/eira-logo.png";

const TutorWebsiteHeader = () => {
  const navigate = useNavigate();
  const isPhoneScreen = useMediaQuery("(max-width:600px)");

  const headerOptions = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Our Tutors",
      link: "/tutors",
    },
    {
      title: "Why Choose Us",
      link: "/why-choose-us",
    },
    {
      title: "Testimonials",
      link: "/testimonials",
    },
    {
      title: "Contact",
      link: "/contact",
    },
  ];

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: any) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const renderDrawer = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {headerOptions.map((item) => (
          <ListItem
            button
            key={item?.title}
            onClick={() => {
              navigate(item.link);
            }}
          >
            <ListItemText primary={item?.title} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Header */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#ffffff",
          boxShadow: 0,
          padding: isPhoneScreen ? 1 : 2,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            flexDirection: "row",
            mt: isPhoneScreen ? 1 : 5,
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Avatar
              src={EiraLogo}
              alt="Eira Logo"
              sx={{
                width: isPhoneScreen ? 100 : 100,
                height: isPhoneScreen ? 33 : 33,
                mr: 2,
                borderRadius: 2,
              }}
            />
          </Box>
          {/* Hamburger Menu for Mobile */}
          {isPhoneScreen ? (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ color: "#232437" }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            // Navigation Links for Desktop
            <Box
              sx={{
                display: "flex",
                gap: 4,
                flexWrap: "nowrap",
                justifyContent: "flex-end",
              }}
            >
              {headerOptions.map((item) => (
                <Button
                  key={item?.title}
                  sx={{
                    color: "#232437",
                    textTransform: "none",
                    fontSize: "1rem",
                  }}
                  onClick={() => {
                    navigate(item.link);
                  }}
                >
                  {item?.title}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer Component */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {renderDrawer()}
      </Drawer>
    </>
  );
};

export default TutorWebsiteHeader;
