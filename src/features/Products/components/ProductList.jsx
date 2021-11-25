import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import Product from "./Product";

ProductList.propTypes = {
  data: PropTypes.array,
};

function ProductList({ data = [] }) {
  return (
    <Box>
      <Grid container>
        {data.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductList;
