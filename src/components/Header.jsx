import * as React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Tooltip,
  IconButton,
  Avatar,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { Container } from "@mui/system";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import WalletIcon from "@mui/icons-material/Wallet";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Logout from "@mui/icons-material/Logout";
import axios from "axios";

const TypographyStyles = {
  flex: 1,
  color: "#4cd137",
  fontSize: "1.5rem",
  fontWeight: "bold",
  cursor: "pointer",
};

const ButtonStyles = {
  margin: "0 10px",
  backgroundColor: "#4cd137",
  color: "white",
  boxShadow: "none",
  fontWeight: "bold",
};

export const Header = ({ stateUser, setStateUser }) => {
  const { isConnected, id_user, name } = stateUser;
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const AppBarStyles = {
    WebkitBackdropFilter: "blur(5px)",
    backdropFilter: "blur(5px)",
    backgroundColor: "rgba(150 150 150 / 0.2)",
    boxShadow: "none",
    color: "black",
  };

  return (
    <AppBar position="sticky" style={AppBarStyles}>
      <Container>
        <Toolbar>
          <Typography
            style={TypographyStyles}
            onClick={() => navigate(`/app/home/${id_user}`)}
            /* onClick={() => navigate(`/app/coins/`)} */
          >
            Crypto Wallet
          </Typography>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>{name.charAt(0)}</Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem /* onClick={() => navigate(`/app/account/${id}`)} */>
              <Avatar sx={{ bgcolor: "#4cd137" }} /> Profile
            </MenuItem>
            <MenuItem onClick={() => navigate(`/app/account/${id_user}`)}>
              <Avatar sx={{ bgcolor: "#4cd137" }}>
                <AccountBalanceWalletIcon fontSize="small" />
              </Avatar>
              Account
            </MenuItem>
            <MenuItem onClick={() => navigate(`/app/wallet/${id_user}`)}>
              <Avatar sx={{ bgcolor: "#4cd137" }}>
                <WalletIcon fontSize="small" />
              </Avatar>
              Wallet
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
