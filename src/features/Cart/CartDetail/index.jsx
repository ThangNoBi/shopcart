import CancelIcon from "@mui/icons-material/Cancel";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useDispatch } from "react-redux";
import { IMAGE_PLACEHOLDER, STATIC_HOST } from "../../../constants";
import { formatPrice } from "../../../utils";
import { removeFromCart } from "../cartSlice";

CartDetail.propTypes = {};

const useStyles = makeStyles({
  root: {},

  left: {
    width: "800px",
    textAlign: "left",
  },

  right: {
    flex: "1 1 0",
    height: "50px",
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

function CartDetail({ detail }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const ImageUrl = detail.product.thumbnail
    ? `${STATIC_HOST}${detail.product.thumbnail?.url}`
    : IMAGE_PLACEHOLDER;

  const handleRemoveItem = (itemID) => {
    const action = removeFromCart({
      id: itemID,
    });
    dispatch(action);
    // console.log(action);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={4}>
        <img src={ImageUrl} alt="" className={classes.imgCart} />
      </Grid>
      <Grid item xs={4} md={6}>
        <ul className={classes.list}>
          <li>
            <Typography>Tên SP : {detail.product.name}</Typography>
          </li>
          <li>Giá : {formatPrice(detail.product.salePrice)}</li>
          <li>Số lượng : {detail.quantity}</li>
        </ul>
      </Grid>
      <Grid item xs={2} md={2}>
        <CancelIcon
          onClick={() => handleRemoveItem(detail.id)}
          sx={{ cursor: "pointer", marginTop: 2 }}
        ></CancelIcon>

        <Typography>Xóa</Typography>
      </Grid>
    </Grid>
  );
}

export default CartDetail;
