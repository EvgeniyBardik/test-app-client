import * as yup from "yup";
const validationSchema = yup.object().shape({
  name: yup.string().required("Required"),
  address: yup.string().required("Required"),
  description: yup.string().required("Required"),
  serviceOfActivity: yup.string().required("Required"),
  type: yup.string().required("Required"),
  numberOfEmployees: yup
    .number()
    .max(2147483647, "must be less than or equal to 2147483647")
    .required("Required"),
});

export default validationSchema;
