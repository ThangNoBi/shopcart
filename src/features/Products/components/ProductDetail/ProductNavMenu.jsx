import { Link } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box, createTheme } from "@mui/system";
import React from "react";
import { NavLink, useRouteMatch } from "react-router-dom";

ProductNavMenu.propTypes = {};

const theme = createTheme({
  spacing: 8,
});

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    listStyleType: "none",

    "& > li": {
      padding: theme.spacing(2, 4),
    },

    "& > li > a": {
      color: "#9c27b0",
      textDecoration: "none",
    },

    "& > li > a.active": {
      color: "#ff8a65",
      textDecoration: "underline",
    },
  },
}));

function ProductNavMenu(props) {
  const classes = useStyles();
  const { url } = useRouteMatch();

  return (
    <Box component="ul" className={classes.root}>
      <li>
        <Link component={NavLink} to={url} exact>
          Description
        </Link>
      </li>

      <li>
        <Link component={NavLink} to={`${url}/additional`} exact>
          Additional infomation
        </Link>
      </li>

      <li>
        <Link component={NavLink} to={`${url}/reviews`} exact>
          Reviews
        </Link>
      </li>
    </Box>
  );
}

export default ProductNavMenu;
