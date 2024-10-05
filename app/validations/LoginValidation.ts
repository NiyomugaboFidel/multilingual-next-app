import * as yup from "yup";

export const LoginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be 8 characters").max(8,"Password must be 8 characters" )
    .required("Password is required"),
});

