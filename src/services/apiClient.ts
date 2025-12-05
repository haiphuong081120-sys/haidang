import axios, { InternalAxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { toast } from 'sonner';
import NProgress from 'nprogress';
import { logRequest } from "./apiLogService";
import { API_CONFIG } from "../config";
import { classifyError, formatErrorMessage } from "./errorHandler";

NProgress.configure({ showSpinner: false, minimum: 0.1 });

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return decodeURIComponent(match[2]);
  return null;
}

const apiClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  withCredentials: true,
  headers: {
    Accept: API_CONFIG.headers.accept,
    "X-Requested-With": API_CONFIG.headers.requestedWith,
    "Content-Type": API_CONFIG.headers.contentType,
  },
  timeout: API_CONFIG.timeout,
});

let csrfTokenPromise: Promise<any> | null = null;

const ensureCsrfCookie = async (): Promise<void> => {
  if (csrfTokenPromise) return csrfTokenPromise;

  const csrfUrl = API_CONFIG.csrf.cookieEndpoint; 
  // BASE_URL là https://api.haidangmeta.com/api/v1
  // Cần lấy root URL: https://api.haidangmeta.com
  const rootApiUrl = API_CONFIG.baseURL.replace(/\/api\/v1\/?$/, '').replace(/\/api\/?$/, '');

  csrfTokenPromise = apiClient.get(csrfUrl, { 
    baseURL: rootApiUrl, 
    withCredentials: true,
    headers: { 'Accept': 'application/json' }
  }).then(() => {
    csrfTokenPromise = null;
  }).catch((error) => {
    csrfTokenPromise = null;
    console.warn("[CSRF] Init failed:", error.message);
  });

  return csrfTokenPromise;
};

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (!NProgress.isStarted()) NProgress.start();

    // REMOVED: Prefix logic is handled by endpoints.config.ts now.

    const method = config.method?.toLowerCase();
    const isMutation = method && ['post', 'put', 'delete', 'patch'].includes(method);
    const isCsrfEndpoint = config.url?.includes(API_CONFIG.csrf.cookieEndpoint);

    if (isMutation && !isCsrfEndpoint) {
        let token = getCookie(API_CONFIG.csrf.cookieName);
        if (!token) {
            try {
                await ensureCsrfCookie();
                token = getCookie(API_CONFIG.csrf.cookieName);
            } catch (e) {
                console.error("CSRF fetch error", e);
            }
        }
        if (token) {
            config.headers[API_CONFIG.csrf.tokenHeader] = token;
        }
    }

    if (import.meta.env.DEV) {
        logRequest(
            config.method?.toUpperCase() || "UNKNOWN",
            config.url || "",
            config.data
        );
    }

    return config;
  },
  (error) => {
    NProgress.done();
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    NProgress.done();
    return response;
  },
  async (error: AxiosError) => {
    NProgress.done();
    const originalRequest = error.config as any; 
    if (!originalRequest) return Promise.reject(error);

    const status = error.response?.status;

    if ((status === 419 || status === 401) && !originalRequest._retry) {
      if (status === 401 && originalRequest.url?.includes('/login')) {
          return Promise.reject(error);
      }
      originalRequest._retry = true;
      try {
        await ensureCsrfCookie();
        return apiClient(originalRequest);
      } catch (refreshError) {}
    }
    
    const isInitialAuthCheck = originalRequest.url?.endsWith('/me') && originalRequest.method?.toUpperCase() === 'GET';
    const isNotificationEndpoint = originalRequest.url?.includes('/notifications');
    const classification = classifyError(error);
    const shouldSuppressError = (status === 401 && (isInitialAuthCheck || isNotificationEndpoint));

    if (classification.shouldNotify && !shouldSuppressError) {
      toast.error(formatErrorMessage(error), { id: `err-${status}-${originalRequest.url}` });
    }

    return Promise.reject(error);
  }
);

export default apiClient;
export { apiClient };