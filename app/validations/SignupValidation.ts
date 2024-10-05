
import * as Yup from "yup";

// Validation schema with Yup
export const SignupValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be  8 characters").max(8, "Password must be  8 characters")
    .required("Password is required"),
});