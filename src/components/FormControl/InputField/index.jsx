import { TextField } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputField(props) {
  const { form, name, label, disabled } = props;

  //Lấy dữ liệu từ form trong React-Hook-Form
  // const { errors } = form;
  // const hasErr = errors[name];

  const {
    formState: { errors },
  } = form;
  const hasErr = !!errors[name];
  // console.log(errors[name]);

  return (
    <Controller
      name={name}
      control={form.control}
      render={({
        field: { onChange, onBlur, value, name },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          fullWidth
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          margin="none"
          sx={{ marginTop: 2 }}
          variant="outlined"
          error={hasErr}
          helperText={errors[name]?.message}
        />
      )}
    />
  );
}

export default InputField;
