import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, createTheme } from "@mui/system";
import { Button, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const theme = createTheme({
  spacing: 8,
});

const useStyles = makeStyles(() => ({
  root: {
    padding: theme.spacing(2),
    borderTop: "1px solid gray",
  },

  range: {
    display: "flex",
    flexFlow: "row no-wrap",
    alignItems: "center",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),

    "& > span": {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
}));

FiltersByPrice.propTypes = {
  onChange: PropTypes.func,
};

function FiltersByPrice({ onChange }) {
  const classes = useStyles();

  const [values, setValues] = useState({
    salePrice_gte: 0,
    salePrice_lte: 0,
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setValues((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // console.log(values);
    if (onChange) onChange(values);

    //Gán lại giá trị khởi tạo khi lọc SP
    setValues({
      salePrice_gte: 0,
      salePrice_lte: 0,
    });
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">CHỌN MỨC GIÁ</Typography>
      <Box className={classes.range}>
        <TextField
          name="salePrice_gte"
          value={values.salePrice_gte}
          onChange={handleChange}
          id="standard-basic"
          variant="standard"
        />
        <span>-</span>
        <TextField
          name="salePrice_lte"
          value={values.salePrice_lte}
          onChange={handleChange}
          id="standard-basic"
          variant="standard"
        />
      </Box>
      <Button
        variant="outlined"
        color="secondary"
        size="small"
        onClick={handleSubmit}
      >
        Áp dụng
      </Button>
    </Box>
  );
}

export default FiltersByPrice;
