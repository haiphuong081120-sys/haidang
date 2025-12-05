/**
 * Retry Handler Service
 * Provides retry logic with exponential backoff for API requests
 */

import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { shouldRetry, calculateRetryDelay, sleep, classifyError, ErrorType } from './errorHandler';

export interface RetryConfig {
  maxRetries?: number;
  retryableStatusCodes?: number[];
  retryableErrorTypes?: ErrorType[];
  onRetry?: (error: AxiosError, retryCount: number) => void;
}

const DEFAULT_RETRY_CONFIG: Required<RetryConfig> = {
  maxRetries: 3,
  retryableStatusCodes: [500, 502, 503, 504],
  retryableErrorTypes: [ErrorType.NETWORK, ErrorType.TIMEOUT, ErrorType.SERVER, ErrorType.RATE_LIMIT],
  onRetry: () => {},
};

/**
 * Creates a retry interceptor for axios
 */
export const createRetryInterceptor = (config: RetryConfig = {}) => {
  const finalConfig = { ...DEFAULT_RETRY_CONFIG, ...config };

  return async (error: AxiosError & { config: InternalAxiosRequestConfig & { _retryCount?: number } }) => {
    const originalRequest = error.config;
    
    // Don't retry if request was cancelled
    if (error.code === 'ERR_CANCELED') {
      return Promise.reject(error);
    }

    // Initialize retry count
    if (!originalRequest._retryCount) {
      originalRequest._retryCount = 0;
    }

    const retryCount = originalRequest._retryCount;
    const classification = classifyError(error);

    // Check if we should retry
    if (!shouldRetry(error, retryCount, finalConfig.maxRetries)) {
      return Promise.reject(error);
    }

    // Check if error type is retryable
    if (!finalConfig.retryableErrorTypes.includes(classification.type)) {
      return Promise.reject(error);
    }

    // Check if status code is retryable
    if (classification.statusCode && !finalConfig.retryableStatusCodes.includes(classification.statusCode)) {
      return Promise.reject(error);
    }

    // Increment retry count
    originalRequest._retryCount = retryCount + 1;

    // Calculate delay
    const delay = calculateRetryDelay(error, retryCount);

    // Call onRetry callback
    finalConfig.onRetry(error, originalRequest._retryCount);

    // Wait before retrying
    await sleep(delay);

    // Retry the request
    return originalRequest;
  };
};

