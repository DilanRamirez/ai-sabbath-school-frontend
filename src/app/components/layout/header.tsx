"use client";
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import Home from "@mui/icons-material/Home";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useAuth } from "@/app/hooks/use-auth";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const { logout } = useAuth();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
  };

  const handleProfile = () => {
    // Navigate to profile page
    router.push("/profile");
    handleMenuClose();
  };

  return (
    <AppBar position="static" sx={{ borderRadius: 0 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            href="/home"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={() => router.push(`/home/`)}
          >
            <Home />
          </IconButton>
          <Typography variant="h6">Sabbath+ (Beta)</Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <Typography sx={{ mr: 2 }}>{user.user.name}</Typography>
          <IconButton onClick={handleMenuOpen} color="inherit">
            <Avatar>{user.user.name?.charAt(0)}</Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleProfile}>Perfil</MenuItem>
            <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
