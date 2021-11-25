import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { IMAGE_PLACEHOLDER, STATIC_HOST } from "../../../constants";
import { useHistory } from "react-router-dom";
import { formatPrice } from "../../../utils";

Product.propTypes = {
  product: PropTypes.object,
};

function Product({ product }) {
  const history = useHistory();

  // Nếu sản phẩm có hình ảnh thì hiện ra, còn không thì hiện Placeholder
  const ImageUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : IMAGE_PLACEHOLDER;

  const handleClick = () => {
    // Navigative to detail product
    history.push(`/products/${product.id}`);
  };

  return (
    <Box padding={1}>
      <Box padding={1} onClick={handleClick}>
        <img
          src={ImageUrl}
          alt={product.name}
          width="100%"
          style={{ cursor: "pointer" }}
        />
      </Box>
      <Typography variant="body3">{product.name}</Typography>
      <Typography variant="body2" mt={1}>
        <Box component="span" fontSize="16px" fontWeight="bold">
          {formatPrice(product.salePrice)}
        </Box>
        {product.promotionPercent > 0 ? ` - ${product.promotionPercent}%` : ""}
      </Typography>
    </Box>
  );
}

export default Product;
