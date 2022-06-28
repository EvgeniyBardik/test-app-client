import * as yup from "yup";
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must contain at least 6 characters")
    .required("Enter your password"),
});

export default validationSchema;
