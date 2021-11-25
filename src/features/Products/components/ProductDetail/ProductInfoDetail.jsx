import React from "react";
import PropTypes from "prop-types";
import { Box, createTheme } from "@mui/system";
import { Typography } from "@mui/material";
import { formatPrice } from "../../../../utils";
import { makeStyles } from "@mui/styles";

ProductInfoDetail.propTypes = {
  product: PropTypes.object,
};

const theme = createTheme({
  spacing: 8,
});

const useStyles = makeStyles(() => ({
  root: {
    paddingBottom: theme.spacing(1),
    borderBottom: "1px solid #e0e0e0",
  },

  description: {
    margin: theme.spacing(2, 0),
  },

  priceBox: {
    padding: theme.spacing(1),
    backgroundColor: "#eeeeee",
  },

  salePr: {
    fontSize: "32px",
    // fontStyle: "italic",
    fontWeight: "bold",
    marginRight: theme.spacing(3),
  },

  oriPr: {
    marginRight: theme.spacing(2),
    textDecoration: "line-through",
  },
}));

function ProductInfoDetail({ product }) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h4">{product.name}</Typography>
      <Typography variant="subtitle2" className={classes.description}>
        Mô tả : {product.shortDescription}
      </Typography>

      <Box className={classes.priceBox}>
        <Box component="span" className={classes.salePr}>
          Giá : {formatPrice(product.salePrice)}
        </Box>

        {product.promotionPercent > 0 && (
          <>
            <Box component="span" className={classes.oriPr}>
              {formatPrice(product.originalPrice)}
            </Box>
            <Box component="span">
              <Typography variant="body2">
                {`-${product.promotionPercent}%`}
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default ProductInfoDetail;
