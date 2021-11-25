import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, createTheme } from "@mui/system";
import { Typography } from "@mui/material";
import categoryAPI from "../../../../../API/categoryApi";
import { makeStyles } from "@mui/styles";
import SkeletonCategory from "./SkeletonCategory";

const theme = createTheme({
  spacing: 8,
  palette: {
    secondary: {
      main: "#dd33fa",
    },
  },
});

const useStyles = makeStyles(() => ({
  root: {
    padding: theme.spacing(2),
  },

  menu: {
    padding: 0,
    margin: 0,
    listStyleType: "none",
    "& > li": {
      marginTop: theme.spacing(1),
      transition: "all .25s",

      "&:hover": {
        color: theme.palette.secondary.main,
        cursor: "pointer",
      },
    },
  },
}));

FiltersByCategory.propTypes = {
  onChange: PropTypes.func,
};

function FiltersByCategory({ onChange }) {
  const [categoryList, setCategoryList] = useState([]);
  const classes = useStyles();

  // Set Loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const getData = await categoryAPI.getAll();
        // console.log({ getData });
        setCategoryList(
          getData.map((x) => {
            return {
              id: x.id,
              name: x.name,
            };
          })
        );
      } catch (error) {
        console.log("Failed to fetch Category List", error);
      }

      // Set lại trạng thái loading
      setLoading(false);
    })();
  }, []);

  const handleClick = (cate) => {
    if (onChange) {
      onChange(cate.id);
    }
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">Danh Mục Sản Phẩm</Typography>

      {loading ? (
        <SkeletonCategory />
      ) : (
        <ul className={classes.menu}>
          {categoryList.map((cats) => (
            <li key={cats.id} onClick={() => handleClick(cats)}>
              <Typography variant="body3">{cats.name}</Typography>
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
}

export default FiltersByCategory;
