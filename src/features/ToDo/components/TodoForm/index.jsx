import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import InputField from "../../../../components/FormControl/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

TodoForm.propTypes = {
  onSubmit: PropTypes.func,
};

function TodoForm(props) {
  const schema = yup
    .object({
      title: yup.string().required("Please enter title"),
    })
    .required();
  const form = useForm({
    defaultValues: {
      title: "",
    },
    resolver: yupResolver(schema),
  });

  const handleSub = (values) => {
    console.log("Todo Form", values);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSub)}>
      <InputField name="title" form={form} label="Todo" />
    </form>
  );
}

export default TodoForm;
