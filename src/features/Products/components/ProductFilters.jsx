import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import FiltersByCategory from "./Filters/ByCategory/FiltersByCategory";
import FiltersByPrice from "./Filters/FiltersByPrice";
import FiltersByService from "./Filters/FiltersByService";

ProductFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

function ProductFilters({ filters, onChange }) {
  const handleCategoryChange = (newCatsID) => {
    //Nếu không có sự thay đổi thì không trả về gì hết
    if (!onChange) return;

    const newFilter = {
      "category.id": newCatsID,
    };

    onChange(newFilter);
  };

  const handleChange = (values) => {
    // console.log(values);
    if (onChange) onChange(values);
  };

  return (
    <Box>
      <FiltersByCategory onChange={handleCategoryChange} />
      <FiltersByPrice onChange={handleChange} />
      <FiltersByService filters={filters} onChange={handleChange} />
    </Box>
  );
}

export default ProductFilters;
