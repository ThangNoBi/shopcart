import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import QuantityField from "../../../../components/FormControl/QuantityField";

AddToCartDetail.propTypes = {
  onSubmit: PropTypes.func,
};

function AddToCartDetail({ onSubmit = null }) {
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .required("Please enter quantity")
      .min(1, "Minimum value is 1")
      .max(99, "Maximum value is 99")
      .typeError("Please enter a number"),
  });

  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} style={{ marginTop: 10 }}>
      <QuantityField name="quantity" label="Số lượng" form={form} />

      <Button
        type="submit"
        // onSubmit={handleSubmit}
        variant="contained"
        color="success"
        sx={{ display: "block" }}
        style={{ marginTop: 15, marginLeft: 45 }}
      >
        Thêm vào giỏ
      </Button>
    </form>
  );
}

export default AddToCartDetail;
