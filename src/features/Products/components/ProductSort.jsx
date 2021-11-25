import React from "react";
import PropTypes from "prop-types";
import { Tab, Tabs } from "@mui/material";

ProductSort.propTypes = {
  currentSort: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

function ProductSort({ currentSort, onChange }) {
  const handleSortChange = (e, newValue) => {
    if (onChange) onChange(newValue);
  };

  return (
    <Tabs
      value={currentSort}
      onChange={handleSortChange}
      textColor="secondary"
      indicatorColor="secondary"
      aria-label="secondary tabs example"
    >
      <Tab label="Giá Tăng Dần" value="salePrice:ASC"></Tab>
      <Tab label="Giá Giảm Dần" value="salePrice:DESC"></Tab>
    </Tabs>
  );
}

export default ProductSort;
