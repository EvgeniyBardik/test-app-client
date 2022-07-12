import { Typography, Button, Box, Stack } from "@mui/material";
import { Formik, FormikProps, Form, Field, FormikHelpers } from "formik";
import { FormTextField } from "../../FormTextField";
import validationSchema from "./validation/validationSchema";
import IFormValues from "./interface/form.interface";

export interface ILoginFormProps {
  submitHandler: (values: IFormValues) => Promise<void>;
}

const LoginForm = ({ submitHandler }: ILoginFormProps) => {
  const submitFormikHandler = async (
    values: IFormValues,
    formikHelpers: FormikHelpers<IFormValues>
  ) => {
    await submitHandler(values);
  };
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={submitFormikHandler}
    >
      {(formikProps: FormikProps<IFormValues>) => (
        <Form noValidate autoComplete="off" data-testid="login-form">
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
                data-testid="login-input"
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
                data-testid="submitButton"
              >
                Log In
              </Button>
            </Box>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
export default LoginForm;
