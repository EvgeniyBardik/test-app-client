import * as React from "react";
import Modal from "@mui/material/Modal";
import { Container, Typography, Button, Box, Stack } from "@mui/material";
import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik";
import { FormTextField } from "../FormTextField";
import validationSchema from "./validation/validationSchema";
import IFormValues from "./interface/form.interface";
import { style } from "./styles";
import { useSnackBarError } from "../../hooks/useSnackBarError";
import { api } from "../../redux/UserService";
import { User } from "../../redux/interfaces/redux.interfaces";

interface IModalUser {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
}

export default function ModalUser({ open, setOpen, user }: IModalUser) {
  const [editUser, { isError: isErrorEdit, error: errorEdit }] =
    api.useEditUserMutation();
  const closeSnackEdit = useSnackBarError(isErrorEdit, errorEdit);
  const handleClose = () => setOpen(false);
  const submitHandler = async (
    values: IFormValues,
    formikHelpers: FormikHelpers<IFormValues>
  ) => {
    closeSnackEdit();
    const response = await editUser({
      ...values,
      id: user.id,
    });
    if ("data" in response) {
      handleClose();
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-user"
        aria-describedby="modal-modal-description"
        sx={{ overflow: "scroll" }}
      >
        <Box sx={style}>
          <Container maxWidth="sm">
            <Box border={1} borderColor="gray" borderRadius={2} marginY={5}>
              <Formik
                initialValues={{
                  firstName: user.firstName,
                  lastName: user.lastName,
                  nickName: user.nickName,
                  email: user.email,
                  position: user.position,
                  description: user.description,
                  phoneNumber: user.phoneNumber,
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
                          Edit Profile
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
                          label="Dercription"
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
                      <Box display="flex" justifyContent="space-between">
                        <Box>
                          <Button
                            sx={{ width: 100 }}
                            type="submit"
                            variant="contained"
                            size="large"
                            color="primary"
                            disabled={formikProps.isSubmitting}
                          >
                            Edit
                          </Button>
                        </Box>
                        <Box>
                          <Button
                            sx={{ width: 100 }}
                            variant="contained"
                            size="large"
                            color="error"
                            onClick={handleClose}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </Box>
                    </Stack>
                  </Form>
                )}
              </Formik>
            </Box>
          </Container>
        </Box>
      </Modal>
    </div>
  );
}
