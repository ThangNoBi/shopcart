import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  FormControl,
  FormHelperText,
  IconButton,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {},

  box: {
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
    maxWidth: "200px",
  },
}));

QuantityField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function QuantityField(props) {
  const classes = useStyles();
  const { form, name, label, disabled } = props;

  //Lấy dữ liệu từ form trong React-Hook-Form
  const {
    formState: { errors },
  } = form;
  const { setValue } = form;
  const hasErr = !!errors[name];

  return (
    <FormControl
      // error={hasErr}
      sx={{ m: 1, width: "25ch" }}
      variant="filled"
      fullWidth
      size="small"
    >
      <Typography>{label}</Typography>

      <Controller
        name={name}
        control={form.control}
        render={({
          field: { onChange, onBlur, value, name },
          fieldState: { error },
          formState,
        }) => (
          <Box className={classes.box}>
            <IconButton
              onClick={() =>
                setValue(
                  name,
                  Number.parseInt(value) ? Number.parseInt(value) - 1 : 0
                )
              }
            >
              <RemoveCircleOutlineIcon />
            </IconButton>

            <OutlinedInput
              type="number"
              name={name}
              value={value}
              label={label}
              onChange={onChange}
              onBlur={onBlur}
              disabled={disabled}
              variant="outlined"
              error={hasErr}
              // helperText={errors[name]?.message}
            />

            <IconButton
              onClick={() =>
                setValue(
                  name,
                  Number.parseInt(value) ? Number.parseInt(value) + 1 : 1
                )
              }
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </Box>
        )}
      />
      <FormHelperText>{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}

export default QuantityField;
