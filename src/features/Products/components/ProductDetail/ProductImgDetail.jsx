import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { IMAGE_PLACEHOLDER, STATIC_HOST } from "../../../../constants";

ProductImgDetail.propTypes = {
  product: PropTypes.object,
};

function ProductImgDetail({ product }) {
  const ImageUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : IMAGE_PLACEHOLDER;

  return (
    <Box sx={{ p: 2 }}>
      <img
        src={ImageUrl}
        alt={product.name}
        width="100%"
        style={{ borderRadius: "15px" }}
      />
    </Box>
  );
}

export default ProductImgDetail;
