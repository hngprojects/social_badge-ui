export type endpointSignupPayload = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
};
export type SignupPayload = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export type ApiError = {
  message: string;
  status: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};
