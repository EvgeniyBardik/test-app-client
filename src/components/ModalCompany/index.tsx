import * as React from "react";
import Modal from "@mui/material/Modal";
import { Container, Typography, Button, Box, Stack } from "@mui/material";
import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik";
import { FormTextField } from "../FormTextField";
import validationSchema from "./validation/validationSchema";
import IFormValues from "./interface/form.interface";
import { style } from "./styles";
import { api } from "../../redux/UserService";
import { CompanyRes } from "../../redux/interfaces/redux.interfaces";

interface IModalCompany {
  edit?: boolean;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  company?: CompanyRes;
}

export default function ModalCompany({
  edit,
  open,
  setOpen,
  company,
}: IModalCompany) {
  const [createCompany] = api.useCreateCompanyMutation();
  const [editCompany] = api.useEditCompanyMutation();
  const handleClose = () => setOpen(false);
  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!e.code.startsWith("Digit")) {
      e.preventDefault();
    }
  };
  const submitHandler = async (
    values: IFormValues,
    formikHelpers: FormikHelpers<IFormValues>
  ) => {
    if (edit) {
      const response = await editCompany({
        company: values,
        id: company!.id,
      });
      if ("data" in response) {
        handleClose();
      }
      return;
    }
    const response = await createCompany({
      ...values,
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
        aria-labelledby="modal-modal-company"
        aria-describedby="modal-modal-description"
        sx={{ overflow: "scroll" }}
      >
        <Box sx={style}>
          <Container maxWidth="sm">
            <Box border={1} borderColor="gray" borderRadius={2} marginY={5}>
              <Formik
                initialValues={
                  company
                    ? company
                    : {
                        name: "",
                        address: "",
                        description: "",
                        serviceOfActivity: "",
                        type: "",
                        numberOfEmployees: 0,
                      }
                }
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
                          {edit ? "Edit " : "Create "}
                          Company
                        </Typography>
                      </Box>
                      <Box height={70}>
                        <Field
                          name="name"
                          label="Name"
                          size="small"
                          component={FormTextField}
                        />
                      </Box>
                      <Box height={70}>
                        <Field
                          name="address"
                          label="Address"
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
                          name="serviceOfActivity"
                          label="Service of activity"
                          size="small"
                          component={FormTextField}
                        />
                      </Box>
                      <Box height={70}>
                        <Field
                          name="type"
                          label="Type"
                          size="small"
                          component={FormTextField}
                        />
                      </Box>
                      <Box height={70}>
                        <Field
                          name="numberOfEmployees"
                          label="Number of employees"
                          size="small"
                          type="number"
                          component={FormTextField}
                          onKeyPress={onKeyPressHandler}
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
                            {edit ? "Edit" : "Create"}
                          </Button>
                        </Box>
                        <Box>
                          <Button
                            sx={{ width: 100 }}
                            variant="contained"
                            size="large"
                            color="error"
                            disabled={formikProps.isSubmitting}
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
