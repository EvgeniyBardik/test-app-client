import { Container, Typography, Button, Box, Stack, Link } from "@mui/material";
import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik";
import { Link as RouterLink, Navigate } from "react-router-dom";
import { FormTextField } from "../../FormTextField";
import validationSchema from "./validation/validationSchema";
import IFormValues from "./interface/form.interface";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import { api } from "../../../redux/UserService";
import { selectIsAuthenticated } from "../../../redux/userSlice";
import { useSnackbar } from "notistack";

export default function Signup() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { closeSnackbar } = useSnackbar();
  const { classes } = useStyles();
  const [signup] = api.useSignUpUserMutation();
  const submitHandler = async (
    values: IFormValues,
    formikHelpers: FormikHelpers<IFormValues>
  ) => {
    closeSnackbar();
    await signup({
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
            firstName: "",
            lastName: "",
            nickName: "",
            email: "",
            position: "",
            description: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
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
                    Registration
                  </Typography>
                </Box>
                <Box height={70}>
                  <Field
                    name="firstName"
                    label="First name"
                    size="small"
                    component={FormTextField}
                  />
                </Box>
                <Box height={70}>
                  <Field
                    name="lastName"
                    label="Last name"
                    size="small"
                    component={FormTextField}
                  />
                </Box>
                <Box height={70}>
                  <Field
                    name="nickName"
                    label="Nick name"
                    size="small"
                    component={FormTextField}
                  />
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
                    name="position"
                    label="Position"
                    size="small"
                    component={FormTextField}
                  />
                </Box>
                <Box height={70}>
                  <Field
                    name="description"
                    label="Description"
                    size="small"
                    component={FormTextField}
                  />
                </Box>
                <Box height={70}>
                  <Field
                    name="phoneNumber"
                    label="Phone number"
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
                <Box height={70}>
                  <Field
                    name="confirmPassword"
                    label="Confirm password"
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
                    Sign Up
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
          Already have an account? &nbsp;
          <Link component={RouterLink} to={"/login"} className={classes.link}>
            Log in
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
