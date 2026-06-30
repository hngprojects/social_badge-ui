import { useQuery } from "@tanstack/react-query";
import { getPlatformTemplates } from "../services/get-platform-templates";

export const platformTemplatesKey = (page: number, limit: number) => [
  "platform-templates",
  page,
  limit,
];

export function usePlatformTemplates(page = 1, limit = 100) {
  const query = useQuery({
    queryKey: platformTemplatesKey(page, limit),
    queryFn: () => getPlatformTemplates(page, limit),
  });

  return {
    ...query,
    templates: query.data?.templates ?? [],
    total: query.data?.total ?? 0,
  };
}
