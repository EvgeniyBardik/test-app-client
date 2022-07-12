import { Container, Typography, Box, Link } from "@mui/material";
import { Link as RouterLink, Navigate } from "react-router-dom";
import IFormValues from "./interface/form.interface";
import useStyles from "./styles";
import { api } from "../../../redux/UserService";
import { useSnackbar } from "notistack";
import { useAppSelector } from "../../../hooks/redux";
import LoginForm from "./LoginForm";

export default function Login() {
  const { closeSnackbar } = useSnackbar();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [login] = api.useLoginUserMutation();
  const { classes } = useStyles();
  const submitHandler = async (values: IFormValues) => {
    closeSnackbar();
    await login({
      ...values,
    });
  };
  if (isAuthenticated) {
    return <Navigate to="/main" />;
  }
  return (
    <Container maxWidth="sm">
      <Box border={1} borderColor="gray" borderRadius={2} marginTop={5}>
        <LoginForm submitHandler={submitHandler} />
      </Box>
      <Box>
        <Typography
          marginTop={2}
          marginBottom={15}
          textAlign="center"
          variant="body1"
        >
          Don&apos;t have an account? &nbsp;
          <Link className={classes.link} component={RouterLink} to={"/signup"}>
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
