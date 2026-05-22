export type ContactFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactPayload = {
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactResponse = {
  status: string;
  message: string;
};

export type ContactApiError = {
  message?: string;
  status?: string;
};
