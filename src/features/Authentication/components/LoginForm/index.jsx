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

LoginForm.propTypes = {
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

function LoginForm(props) {
  const classes = useStyles();

  const schema = yup.object().shape({
    identifier: yup
      .string()
      .required("Please enter your email")
      .email("Please enter a valid email address"),

    password: yup.string().required("Please enter your password"),
  });

  const form = useForm({
    defaultValues: {
      identifier: "",
      password: "",
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
        Login an account
      </Typography>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="identifier" label="Email" form={form} />
        <PassWordField name="password" label="Password" form={form} />

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Sign In
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
