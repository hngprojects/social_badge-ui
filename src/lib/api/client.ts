import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";
import { clearAuthSession } from "./auth-session";

const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

let isRefreshing = false;
let refreshQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

function flushRefreshQueue(error: unknown | null) {
  refreshQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(undefined);
  });
  refreshQueue = [];
}

function isAuthBypassPath(url?: string): boolean {
  if (!url) return false;
  return (
    url.includes("/auth/login") ||
    url.includes("/auth/signup") ||
    url.includes("/auth/refresh") ||
    url.includes("/auth/logout") ||
    url.includes("/auth/forgot-password") ||
    url.includes("/auth/reset-password") ||
    url.includes("/auth/verify-email") ||
    url.includes("/auth/resend-verification-email")
  );
}

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      isAuthBypassPath(originalRequest.url)
    ) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshQueue.push({ resolve, reject });
      }).then(() => instance.request(originalRequest));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      await instance.post("/auth/refresh");
      flushRefreshQueue(null);
      return instance.request(originalRequest);
    } catch (refreshError) {
      flushRefreshQueue(refreshError);
      clearAuthSession();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

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

export { instance as apiAxios };
