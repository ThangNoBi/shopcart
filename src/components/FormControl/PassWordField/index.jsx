import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Controller } from "react-hook-form";

PassWordField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function PassWordField(props) {
  const { form, name, label, disabled } = props;

  // Lấy dữ liệu từ form trong React-Hook-Form
  // const { errors } = form;
  const {
    formState: { errors },
  } = form;
  const hasErr = !!errors[name];

  const [showPassWord, setShowPassWord] = useState(false);

  const togggleShowPass = () => {
    setShowPassWord((x) => !x);
  };

  return (
    <FormControl
      error={hasErr}
      variant="outlined"
      sx={{ marginTop: 2 }}
      fullWidth
    >
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Controller
        name={name}
        control={form.control}
        render={({
          field: { onChange, onBlur, value, name },
          fieldState: { error },
          formState,
        }) => (
          <OutlinedInput
            type={showPassWord ? "text" : "password"}
            id={name}
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            error={hasErr}
            fullWidth
            variant="outlined"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={togggleShowPass}
                  edge="end"
                >
                  {showPassWord ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        )}
      />

      <FormHelperText>{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}

export default PassWordField;
