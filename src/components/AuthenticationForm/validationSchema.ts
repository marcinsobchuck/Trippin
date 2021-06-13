import * as yup from "yup";

export const validationSchema = yup.object().shape({
  email: yup.string().email().required("This field can't be empty"),
  password: yup
    .string()
    .required("This field can't be empty")
    .min(6, "Password must be at least 6 characters long"),
  passwordConfirmation: yup
    .string()
    .required("This field can't be empty")
    .oneOf([yup.ref("password")], "Passwords must be identical"),
});
