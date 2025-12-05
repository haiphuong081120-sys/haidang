/**
 * Enhanced Error Handling Service
 * Provides centralized error handling, classification, retry logic, and recovery strategies
 */

import { APP_CONFIG } from '../config';

// Error Types
export enum ErrorType {
  NETWORK = 'NETWORK',
  TIMEOUT = 'TIMEOUT',
  SERVER = 'SERVER',
  CLIENT = 'CLIENT',
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  RATE_LIMIT = 'RATE_LIMIT',
  UNKNOWN = 'UNKNOWN',
}

// Error Classification
export interface ErrorClassification {
  type: ErrorType;
  statusCode?: number;
  isRetryable: boolean;
  retryDelay?: number;
  userMessage: string;
  recoverySuggestion?: string;
  shouldLog: boolean;
  shouldNotify: boolean;
}

/**
 * Classifies an error and provides handling metadata
 */
export const classifyError = (error: unknown): ErrorClassification => {
  const err = error as { code?: string; message?: string; response?: { status?: number; data?: { message?: string } } };
  // Network errors (no response)
  if (!err?.response) {
    if (err?.code === 'ERR_NETWORK' || err?.message?.includes('Network Error')) {
      return {
        type: ErrorType.NETWORK,
        isRetryable: true,
        retryDelay: 1000, // 1 second
        userMessage: 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.',
        recoverySuggestion: 'Kiểm tra kết nối internet và thử lại.',
        shouldLog: true,
        shouldNotify: true,
      };
    }
    
    if (err?.code === 'ECONNABORTED' || err?.message?.includes('timeout')) {
      return {
        type: ErrorType.TIMEOUT,
        isRetryable: true,
        retryDelay: 2000, // 2 seconds
        userMessage: 'Yêu cầu đã hết thời gian chờ. Vui lòng thử lại.',
        recoverySuggestion: 'Thử lại sau vài giây hoặc kiểm tra kết nối mạng.',
        shouldLog: true,
        shouldNotify: true,
      };
    }
  }

  const status = err?.response?.status;
  const data = err?.response?.data;

  // HTTP Status Code Classification
  switch (status) {
    case 400:
      return {
        type: ErrorType.CLIENT,
        statusCode: 400,
        isRetryable: false,
        userMessage: data?.message || 'Yêu cầu không hợp lệ.',
        shouldLog: true,
        shouldNotify: true,
      };

    case 401:
      return {
        type: ErrorType.AUTHENTICATION,
        statusCode: 401,
        isRetryable: false,
        userMessage: data?.message || 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
        recoverySuggestion: 'Vui lòng đăng nhập lại để tiếp tục.',
        shouldLog: false, // Don't log expected auth errors
        shouldNotify: false, // Don't notify for expected auth errors
      };

    case 403:
      return {
        type: ErrorType.AUTHORIZATION,
        statusCode: 403,
        isRetryable: false,
        userMessage: data?.message || 'Bạn không có quyền truy cập tài nguyên này.',
        recoverySuggestion: 'Liên hệ quản trị viên nếu bạn cần quyền truy cập.',
        shouldLog: true,
        shouldNotify: true,
      };

    case 404:
      return {
        type: ErrorType.CLIENT,
        statusCode: 404,
        isRetryable: false,
        userMessage: data?.message || 'Không tìm thấy tài nguyên.',
        shouldLog: true,
        shouldNotify: true,
      };

    case 422:
      return {
        type: ErrorType.VALIDATION,
        statusCode: 422,
        isRetryable: false,
        userMessage: data?.message || 'Dữ liệu không hợp lệ.',
        recoverySuggestion: 'Vui lòng kiểm tra lại thông tin đã nhập.',
        shouldLog: true,
        shouldNotify: true,
      };

    case 429:
      return {
        type: ErrorType.RATE_LIMIT,
        statusCode: 429,
        isRetryable: true,
        retryDelay: 5000, // 5 seconds
        userMessage: 'Quá nhiều yêu cầu. Vui lòng thử lại sau vài giây.',
        recoverySuggestion: 'Vui lòng đợi một chút trước khi thử lại.',
        shouldLog: true,
        shouldNotify: true,
      };

    case 500:
    case 502:
    case 503:
    case 504:
      return {
        type: ErrorType.SERVER,
        statusCode: status,
        isRetryable: true,
        retryDelay: status === 503 ? 10000 : 3000, // 10s for 503, 3s for others
        userMessage: data?.message || 'Đã xảy ra lỗi máy chủ. Vui lòng thử lại sau.',
        recoverySuggestion: 'Vui lòng thử lại sau vài phút. Nếu vấn đề vẫn tiếp tục, liên hệ hỗ trợ.',
        shouldLog: true,
        shouldNotify: true,
      };

    default:
      return {
        type: ErrorType.UNKNOWN,
        statusCode: status,
        isRetryable: status ? status >= 500 : false,
        retryDelay: 3000,
        userMessage: data?.message || err?.message || 'Đã có lỗi xảy ra.',
        shouldLog: true,
        shouldNotify: true,
      };
  }
};

/**
 * Extracts validation errors from a 422 response
 */
export const extractValidationErrors = (error: unknown): Record<string, string> | null => {
  const err = error as { response?: { status?: number; data?: { errors?: Record<string, string | string[]> } } };
  if (err?.response?.status === 422 && err?.response?.data?.errors) {
    const validationErrors: Record<string, string> = {};
    const errors = err.response.data.errors;
    
    for (const key in errors) {
      const errorValue = errors[key];
      if (Array.isArray(errorValue) && errorValue.length > 0) {
        validationErrors[key] = String(errorValue[0]);
      } else if (typeof errorValue === 'string') {
        validationErrors[key] = errorValue;
      }
    }
    
    return Object.keys(validationErrors).length > 0 ? validationErrors : null;
  }
  return null;
};

/**
 * Formats error message for user display
 */
export const formatErrorMessage = (error: unknown, defaultMessage = 'Đã có lỗi xảy ra.'): string => {
  const classification = classifyError(error);
  return classification.userMessage || defaultMessage;
};

/**
 * Logs error with appropriate level
 */
export const logError = (error: unknown, context?: string): void => {
  const err = error as { message?: string; response?: { data?: unknown }; config?: { url?: string; method?: string } };
  const classification = classifyError(error);
  
  if (!classification.shouldLog) {
    return;
  }

  const logData = {
    type: classification.type,
    statusCode: classification.statusCode,
    message: err?.message || 'Unknown error',
    response: err?.response?.data,
    context,
    url: err?.config?.url,
    method: err?.config?.method,
    timestamp: new Date().toISOString(),
  };

  if (classification.type === ErrorType.SERVER || classification.statusCode === 500) {
    console.error('[Error Handler] Server Error:', logData);
  } else if (classification.type === ErrorType.NETWORK || classification.type === ErrorType.TIMEOUT) {
    console.warn('[Error Handler] Network Error:', logData);
  } else {
    console.error('[Error Handler] Client Error:', logData);
  }

  // In production, you might want to send to error tracking service (Sentry, LogRocket, etc.)
  if (APP_CONFIG.isProd && classification.type === ErrorType.SERVER) {
    // Example: sendToErrorTracking(logData);
  }
};

/**
 * Determines if an error should trigger a retry
 */
export const shouldRetry = (error: unknown, retryCount: number, maxRetries: number = 3): boolean => {
  if (retryCount >= maxRetries) {
    return false;
  }

  const classification = classifyError(error);
  
  if (!classification.isRetryable) {
    return false;
  }

  // Don't retry authentication errors
  if (classification.type === ErrorType.AUTHENTICATION || classification.type === ErrorType.AUTHORIZATION) {
    return false;
  }

  return true;
};

/**
 * Calculates retry delay with exponential backoff
 */
export const calculateRetryDelay = (error: unknown, retryCount: number): number => {
  const classification = classifyError(error);
  const baseDelay = classification.retryDelay || 1000;
  
  // Exponential backoff: baseDelay * 2^retryCount
  const exponentialDelay = baseDelay * Math.pow(2, retryCount);
  
  // Cap at 30 seconds
  return Math.min(exponentialDelay, 30000);
};

/**
 * Sleep utility for retry delays
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};