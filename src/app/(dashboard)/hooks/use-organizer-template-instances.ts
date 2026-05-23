import { useQuery } from "@tanstack/react-query";
import { getOrganizerTemplateInstances } from "../services/get-template-instances";

export const organizerTemplateInstancesKey = (page: number, limit: number) => [
  "organizer-template-instances",
  page,
  limit,
];

export function useOrganizerTemplateInstances(page = 1, limit = 20) {
  return useQuery({
    queryKey: organizerTemplateInstancesKey(page, limit),
    queryFn: () => getOrganizerTemplateInstances(page, limit),
  });
}
