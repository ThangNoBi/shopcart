import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, createTheme, IconButton, Menu, MenuItem } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Login from "../../features/Authentication/components/Login";
import Register from "../../features/Authentication/components/Register";
import { logOut } from "../../features/Authentication/userSlice";
import { cartItemCount } from "../../features/Cart/selectors";

const theme = createTheme({
  spacing: 8,
});

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    display: "flex",
    justifyContent: "space-around",
  },

  title: {
    display: "flex",
    justifyContent: "space-between",
  },

  nameShop: {
    marginLeft: "16px",
    textDecoration: "none",
    color: "#ffeb3b",
  },

  closeBtn: {
    top: 0,
    right: theme.spacing(1),
    padding: theme.spacing(1),
  },

  search: {
    border: "1px solid #fff",
    padding: theme.spacing(1),
  },
}));

const MODE = {
  LOGIN: "login",
  REGISTER: "register",
};

export default function Header() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  // Lấy thông tin User từ LocalStorage hiển thị lên Header
  const loggedUser = useSelector((state) => state.user.current);
  const isLogged = loggedUser.id;

  const [anchorEl, setAnchorEl] = useState(null);

  // Lấy dữ liệu số lượng sản phẩm từ Redux về
  const getItemCount = useSelector(cartItemCount);

  const getInfoUser = useSelector((state) => state.user.current);

  // State để mở và đóng Dialog Form
  const [open, setOpen] = useState(false);

  // State để chuyển đổi giữa form signup và login
  const [mode, setMode] = useState(MODE.LOGIN);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e, reason) => {
    if (reason === "escapeKeyDown" || reason === "backdropClick") return;
    setOpen(false);
  };

  const handleClickIconCart = () => {
    history.push("/cart");
  };

  // Xử lý show thông tin User
  const handleClickMenuUser = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenuUser = () => {
    setAnchorEl(null);
  };

  // Xử lý Logout User
  const handleLogoutClick = () => {
    const action = logOut();
    dispatch(action);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar className={classes.root}>
          <Box className={classes.title}>
            <AirplanemodeActiveIcon />

            <Typography
              variant="h6"
              // sx={{ marginRight: 3 }}
            >
              <Link to="/products" className={classes.nameShop}>
                Ecommerce Shop
              </Link>
            </Typography>
          </Box>

          {/* <Box>
            <TextField
              // className={classes.search}
              // style={{ border: "1px solid #fff" }}
              id="standard-basic"
              label="Search"
              variant="standard"
              // sx={{ p: 1, m: 1 }}
            />
            <Button variant="outlined" color="inherit">
              Search
            </Button>
          </Box> */}

          <Box>
            {!isLogged ? (
              <Button
                color="inherit"
                onClick={handleClickOpen}
                // style={{ flexGrow: 0.5 }}
              >
                Login
              </Button>
            ) : (
              <IconButton color="inherit" onClick={handleClickMenuUser}>
                <Typography>Xin chào {getInfoUser.fullName}</Typography>
                <AccountCircleIcon />
              </IconButton>
            )}

            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={handleClickIconCart}
            >
              <Badge badgeContent={getItemCount} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Show Menu Login */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenuUser}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleCloseMenuUser}>My account</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>

      {/* Dialog dành cho Form  */}
      <Dialog
        open={open}
        onClose={handleClose}
        // disableEscapeKeyDown
        // onBackdropClick
      >
        <IconButton
          className={classes.closeBtn}
          style={{ position: "absolute" }}
          onClick={handleClose}
          size="large"
        >
          <CloseIcon />
        </IconButton>

        <DialogContent>
          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClose} />

              <Box textAlign="center" sx={{ m: 1 }}>
                <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                  Already have an account. Login here
                </Button>
              </Box>
            </>
          )}

          {mode === MODE.LOGIN && (
            <>
              <Login closeDialog={handleClose} />

              <Box textAlign="center" sx={{ m: 1 }}>
                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                  Don't have an account. Register here
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
