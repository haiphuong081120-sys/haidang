/**
 * API Configuration
 * Centralized configuration for API client and endpoints
 */

// Xác định Base URL dựa trên biến môi trường hoặc hardcode cho production
const getBaseUrl = () => {
  // 1. Ưu tiên biến môi trường từ file .env (VITE_API_BASE_URL)
  // Đảm bảo loại bỏ slash ở cuối nếu có, và thêm /api/v1
  if (import.meta.env.VITE_API_BASE_URL) {
    const envUrl = import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '');
    // Nếu user đã nhập /api ở cuối biến môi trường, chỉ thêm /v1
    if (envUrl.endsWith('/api')) {
        return `${envUrl}/v1`;
    }
    // Nếu chưa có /api, thêm cả /api/v1
    return `${envUrl}/api/v1`;
  }

  // 2. Logic tự động cho Localhost
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:8000/api/v1';
    }
  }

  // 3. Mặc định Production
  // Trỏ thẳng sang API domain với path đầy đủ
  return 'https://api.haidangmeta.com/api/v1';
};

export const API_CONFIG = {
  baseURL: getBaseUrl(),
  // URL cho Storage: Dùng chuỗi rỗng để sử dụng đường dẫn tương đối (relative path)
  // hoặc domain chính nếu storage nằm trên CDN/Server khác.
  // Ở đây để trống vì đã có symlink trên server.
  storageURL: '', 
  timeout: 30000,
  apiVersion: 'v1',
  headers: {
    accept: 'application/json',
    contentType: 'application/json',
    requestedWith: 'XMLHttpRequest',
  },
  csrf: {
    cookieEndpoint: '/sanctum/csrf-cookie', 
    tokenHeader: 'X-XSRF-TOKEN',
    cookieName: 'XSRF-TOKEN',
  },
  retry: {
    maxAttempts: 2, 
    retryableStatusCodes: [408, 419, 429, 500, 502, 503, 504], 
  },
} as const;