import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { formatPrice } from "../../../utils";
import CartDetail from "../CartDetail";
import { cartItemTotal } from "../selectors";

CartItem.propTypes = {
  detail: PropTypes.object,
};

const useStyles = makeStyles({
  root: {},

  left: {
    width: "800px",
    textAlign: "left",
  },

  right: {
    flex: "1 1 0",
  },

  list: {
    listStyleType: "none",
    textAlign: "left",
    paddingLeft: 0,
    "& > li": {
      margin: "5px",
    },
  },

  imgCart: {
    width: "200px",
    height: "200px",
    margin: "15px",
    borderRadius: "15px",
  },
});

function CartItem({ detail }) {
  const classes = useStyles();

  const getTotalCart = useSelector(cartItemTotal);

  // const tongTien = detail.reduce((tongT, item, index) => {
  //   return (tongT += item.product.salePrice * item.quantity);
  // }, 0);
  console.log(detail);

  return (
    <Box className={classes.root}>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={3} sx={{ marginTop: "20px" }}>
              {detail.map((item, index) => (
                <CartDetail detail={item} key={index} />
              ))}
            </Paper>
          </Grid>

          {detail.length < 1 ? (
            <Box height="500px">
              <Typography variant="h6">Hiện chưa có sản phẩm</Typography>
            </Box>
          ) : (
            <Grid item className={classes.right}>
              <Paper
                elevation={0}
                sx={{ height: "50px", marginTop: "5px", pt: 2 }}
              >
                <Typography variant="h6">
                  Tổng Tiền : {formatPrice(getTotalCart)}
                </Typography>
              </Paper>
              <Button variant="contained" sx={{ mt: 2 }}>
                Đặt hàng
              </Button>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}

export default CartItem;
