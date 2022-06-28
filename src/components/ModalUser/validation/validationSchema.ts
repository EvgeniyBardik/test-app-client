import * as yup from "yup";
const validationSchema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  nickName: yup.string().required("Required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  position: yup.string().required("Required"),
  description: yup.string().required("Required"),
  phoneNumber: yup.string().required("Required"),
});

export default validationSchema;
