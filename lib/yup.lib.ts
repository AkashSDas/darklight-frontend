import * as yup from "yup";

// ===============================
// AUTH
// ===============================

export var signupSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Too short")
    .max(32, "Too long")
    .required("Required"),
  email: yup.string().email("Invalid").required("Required"),
  password: yup
    .string()
    .min(8, "Too short")
    .max(64, "Too long")
    .required("Required")
    .matches(/(.*[a-z]{3,})/, "3 lowercase letters")
    .matches(/(.*[A-Z]{2,})/, "2 uppercase letters")
    .matches(/(.*[0-9]{2,})/, "2 numbers")
    .matches(/(.*[[!@#$%^&*()\-__+.]{1,})/, "1 special character"),
});
