import axios, { AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function apiClient<T>(
  endpoint: string,
  options?: AxiosRequestConfig,
): Promise<T> {
  const response = await instance.request<T>({
    url: endpoint,
    ...options,
  });

  return response.data;
}
