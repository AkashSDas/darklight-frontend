import * as Yup from "yup";

// ===========================
// Auth
// ===========================

export var signupSchema = Yup.object({
  username: Yup.string()
    .required("Required")
    .min(3, "Too short")
    .max(120, "Too long"),
  email: Yup.string().required("Required").email("Invalid"),
  password: Yup.string().required("Required").min(6, "Too short"),
});

export var completeOAuthSignupSchema = Yup.object({
  username: Yup.string()
    .required("Required")
    .min(3, "Too short")
    .max(120, "Too long"),
  email: Yup.string().required("Required").email("Invalid"),
});

export var loginSchema = Yup.object({
  email: Yup.string().required("Required").email("Invalid"),
  password: Yup.string().required("Required").min(6, "Too short"),
});

export var forgotPasswordSchema = Yup.object({
  email: Yup.string().required("Required").email("Invalid"),
});

export var passwordResetSchema = Yup.object({
  password: Yup.string().required("Required").min(6, "Too short"),
  confirmPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

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

export var passwordResetValidation = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password is too short"),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});
