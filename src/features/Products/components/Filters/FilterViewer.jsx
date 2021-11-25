import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { Chip, createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const theme = createTheme({
  spacing: 8,
});

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center",
    margin: theme.spacing(2, 0),
    padding: 0,
    listStyleType: "none",

    "& > li": {
      margin: 0,
      padding: theme.spacing(1),
    },
  },
}));

const FILTER_LIST = [
  {
    id: 1,
    getLabel: () => "Giao hàng miễn phí",
    isActive: (filters) => filters.isFreeShip,
    isVisible: () => true,
    isRemovable: false,
    onRemove: () => {},
    onToggle: (filters) => {
      const newFilters = { ...filters };
      if (newFilters.isFreeShip) {
        delete newFilters.isFreeShip;
      } else {
        newFilters.isFreeShip = true;
      }
      return newFilters;
    },
  },
  {
    id: 2,
    getLabel: () => "Có khuyến mãi",
    isActive: () => true,
    isVisible: (filters) => filters.isPromotion,
    isRemovable: true,
    onRemove: (filters) => {
      const newFilter = { ...filters };
      delete newFilter.isPromotion;
      return newFilter;
    },
    onToggle: () => {},
  },
  {
    id: 3,
    getLabel: (filters) =>
      `Từ ${filters.salePrice_gte} đến ${filters.salePrice_lte}`,
    isActive: () => true,
    isVisible: (filters) =>
      Object.keys(filters).includes("salePrice_lte") &&
      Object.keys(filters).includes("salePrice_gte"),
    isRemovable: true,
    onRemove: (filters) => {
      const newFilter = { ...filters };
      delete newFilter.salePrice_lte;
      delete newFilter.salePrice_gte;
      return newFilter;
    },
    onToggle: () => {},
  },
];

FilterViewer.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

function FilterViewer({ filters = {}, onChange = null }) {
  const classes = useStyles();

  //Dùng useMemo để tối ưu, chỉ khi filters có sự thay đổi thì mới render lại
  const visibleFilters = useMemo(() => {
    return FILTER_LIST.filter((x) => x.isVisible(filters));
  }, [filters]);

  return (
    <Box component="ul" className={classes.root}>
      {visibleFilters.map((y) => (
        <li key={y.id}>
          <Chip
            label={y.getLabel(filters)}
            color={y.isActive(filters) ? "secondary" : "default"}
            size="small"
            clickable={!y.isRemovable}
            onClick={
              y.isRemovable
                ? null
                : () => {
                    if (!onChange) return;

                    const newFils = y.onToggle(filters);
                    onChange(newFils);
                  }
            }
            onDelete={
              y.isRemovable
                ? () => {
                    if (!onChange) return;

                    const newFils = y.onRemove(filters);
                    onChange(newFils);
                  }
                : null
            }
          />
        </li>
      ))}
    </Box>
  );
}

export default FilterViewer;
