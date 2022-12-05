export interface SignupInput {
  username: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface PasswordResetInput {
  password: string;
  confirmPassword: string;
}

export interface CompleteOAuthInput {
  username: string;
  email: string;
}
