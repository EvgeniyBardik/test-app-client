import { Container, Typography, Button, Box, Stack, Link } from "@mui/material";
import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik";
import { Link as RouterLink, Navigate } from "react-router-dom";
import { FormTextField } from "../../FormTextField";
import validationSchema from "./validation/validationSchema";
import IFormValues from "./interface/form.interface";
import useStyles from "./styles";
import { api } from "../../../redux/UserService";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../../redux/userSlice";
import { useSnackBarError } from "../../../hooks/useSnackBarError";

export default function Login() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [login, { isError, error }] = api.useLoginUserMutation();
  const { classes } = useStyles();
  const closeSnack = useSnackBarError(isError, error);
  const submitHandler = async (
    values: IFormValues,
    formikHelpers: FormikHelpers<IFormValues>
  ) => {
    closeSnack();
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
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          {(formikProps: FormikProps<IFormValues>) => (
            <Form noValidate autoComplete="off">
              <Stack padding={3}>
                <Box marginBottom={5}>
                  <Typography
                    component="h1"
                    variant="h1"
                    color="primary.main"
                    align="center"
                    marginTop={3}
                    marginBottom={0}
                  >
                    Log in
                  </Typography>
                </Box>
                <Box height={70}>
                  <Field
                    name="email"
                    label="Email"
                    size="small"
                    component={FormTextField}
                  />
                </Box>
                <Box height={70}>
                  <Field
                    name="password"
                    label="Password"
                    size="small"
                    type="password"
                    component={FormTextField}
                  />
                </Box>
                <Box>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    size="large"
                    color="primary"
                    disabled={formikProps.isSubmitting}
                  >
                    Log In
                  </Button>
                </Box>
              </Stack>
            </Form>
          )}
        </Formik>
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
            Registration
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
