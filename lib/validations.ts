import * as Yup from "yup";

// ===========================
// Auth
// ===========================

export var signupValidation = Yup.object({
  fullName: Yup.string()
    .required("Full name is required")
    .min(6, "Fullname is too short")
    .max(240, "Fullname is too long"),
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username is too short")
    .max(120, "Username is too long"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password is too short"),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export var completeOAuthSignupValidation = Yup.object({
  fullName: Yup.string()
    .required("Full name is required")
    .min(6, "Fullname is too short")
    .max(240, "Fullname is too long"),
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username is too short")
    .max(120, "Username is too long"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
});

export var loginValidation = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password is too short"),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export var forgotPasswordValidation = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
});
