import React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import DOMPurify from "dompurify";

ProductDescription.propTypes = {
  product: PropTypes.object,
};

function ProductDescription({ product }) {
  // Chuyển hóa dữ liệu an toàn, tránh không bị tấn công XSS
  const safeDescription = DOMPurify.sanitize(product.description);

  return (
    <Paper elevation={3} style={{ padding: 15 }}>
      <div dangerouslySetInnerHTML={{ __html: safeDescription }} />;
    </Paper>
  );
}

export default ProductDescription;
