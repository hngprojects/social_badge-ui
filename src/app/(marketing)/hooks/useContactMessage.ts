import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { sendContactMessage as sendContactMessageApi } from "../services/contact";
import {
  ContactApiError,
  ContactFormValues,
  ContactResponse,
} from "../types/contact";

export const getContactErrorMessage = (
  error: AxiosError<ContactApiError>,
) => {
  return error.response?.data?.message || "Failed to send message.";
};

export const useContactMessage = () => {
  const {
    mutate: sendContactMessage,
    isPending: isLoading,
    isError,
  } = useMutation<
    ContactResponse,
    AxiosError<ContactApiError>,
    ContactFormValues
  >({
    mutationFn: (data: ContactFormValues) =>
      sendContactMessageApi({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        subject: data.subject,
        message: data.message,
      }),
  });

  return { sendContactMessage, isLoading, isError };
};
