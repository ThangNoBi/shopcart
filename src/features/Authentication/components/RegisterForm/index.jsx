import { yupResolver } from "@hookform/resolvers/yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Button,
  createTheme,
  LinearProgress,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "../../../../components/FormControl/InputField";
import PassWordField from "../../../../components/FormControl/PassWordField";

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

const theme = createTheme({
  spacing: 8,
});

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    padding: 0,
    // paddingTop: theme.spacing(3),
  },

  avatar: {
    margin: "10px auto",
  },

  title: {
    margin: theme.spacing(2, 0),
    textAlign: "center",
  },

  progress: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: theme.spacing(1),
  },
}));

function RegisterForm(props) {
  const classes = useStyles();

  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required("Please enter your full name")
      .test(
        // Vì nhập Full name phải cần 2 từ trở lên nên validate luôn
        "Should has at least two words",
        "Please enter at least two words",
        (value) => {
          return value.split(" ").length >= 2;
        }
      ),

    email: yup
      .string()
      .required("Please enter your email")
      .email("Please enter a valid email address"),

    password: yup
      .string()
      .required("Please enter your password")
      .min(6, "Please enter at least 6 characters"),

    retypePass: yup
      .string()
      .required("Please retype your password")
      .oneOf([yup.ref("password")], "Password does not match"),
  });

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      retypePass: "",
    },
    resolver: yupResolver(schema),
  });

  // Lấy isSubmitting ra làm trạng thái loading của form
  const {
    formState: { isSubmitting },
  } = form;

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
      console.log(values);
    }
  };

  return (
    <div className={classes.root}>
      {/* Hiển thị trạng thái loading khi form đang chờ submit  */}
      {isSubmitting && (
        <LinearProgress color="secondary" className={classes.progress} />
      )}

      <Avatar sx={{ bgcolor: "secondary.main" }} className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>

      <Typography variant="h5" component="h3" className={classes.title}>
        Create an account
      </Typography>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="fullName" label="Full Name" form={form} />
        <InputField name="email" label="Email" form={form} />
        <PassWordField name="password" label="Password" form={form} />
        <PassWordField name="retypePass" label="Retype PassWord" form={form} />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ marginTop: 2 }}
          fullWidth
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
