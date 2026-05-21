"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import type { OrganiserTemplatePayload } from "../types/canvas-data";
import {
  createOrganiserTemplate,
  updateOrganiserTemplate,
} from "../services/templates";

interface SaveVariables {
  payload: OrganiserTemplatePayload;
  organiserTemplateId?: string | null;
}

export function useSaveOrganiserTemplate() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async ({ payload, organiserTemplateId }: SaveVariables) => {
      if (organiserTemplateId) {
        return updateOrganiserTemplate(organiserTemplateId, payload);
      }
      return createOrganiserTemplate(payload);
    },
    onSuccess: () => {
      toast.success("Badge template published successfully.");
      router.push("/dashboard");
    },
    onError: (error: unknown) => {
      const axiosError = error as AxiosError<{ message?: string }>;
      const message =
        axiosError.response?.data?.message ??
        "Failed to save template. Please try again.";
      toast.error(message);
    },
  });

  return {
    saveTemplate: mutation.mutate,
    saveTemplateAsync: mutation.mutateAsync,
    isSaving: mutation.isPending,
    error: mutation.error,
  };
}
