import apiClient from './apiClient';
import { User } from '../types';
import { API_CONFIG } from '../config';
import { API_ENDPOINTS, endpoint } from '../config/endpoints.config';

export interface LoginCredentials {
    email: string;
    password: string;
    remember?: boolean;
}

export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

/** Fetches the currently authenticated user. */
export const fetchCurrentUser = async (): Promise<User> => {
    const response = await apiClient.get(API_ENDPOINTS.auth.me);
    return response.data?.user || response.data?.data || response.data;
};

/** Logs in a user. */
export const login = async (credentials: LoginCredentials): Promise<User> => {
    try {
        // BASE_URL là https://api.haidangmeta.com/api/v1
        // Cần lấy root URL: https://api.haidangmeta.com
        const rootUrl = API_CONFIG.baseURL.replace(/\/api\/v1\/?$/, '').replace(/\/api\/?$/, '');
        await apiClient.get('/sanctum/csrf-cookie', { baseURL: rootUrl });
    } catch (error) {
        console.warn('⚠️ Failed to get CSRF cookie, continuing anyway:', error);
    }
    
    const response = await apiClient.post(API_ENDPOINTS.auth.login, credentials);
    return response.data?.user || response.data?.data || response.data;
};

/** 
 * Redirects to Laravel Socialite Google Login route.
 */
export const loginWithGoogle = () => {
    console.warn('Google login is temporarily disabled');
    // Needs to hit the root URL auth/google/redirect, typically web route
    // BASE_URL là https://api.haidangmeta.com/api/v1
    // Cần lấy root URL: https://api.haidangmeta.com
    // const rootUrl = API_CONFIG.baseURL.replace(/\/api\/v1\/?$/, '').replace(/\/api\/?$/, '');
    // window.location.href = `${rootUrl}/auth/google/redirect`;
};

/** Registers a new user. */
export const register = async (userData: RegisterCredentials): Promise<User> => {
    const response = await apiClient.post(API_ENDPOINTS.auth.register, userData);
    return response.data?.user || response.data?.data || response.data;
};

/** Send email verification OTP code */
export const sendVerificationCode = async (email: string): Promise<void> => {
    await apiClient.post('/me/send-verification-code', { email });
};

/** Verify email with OTP code */
export const verifyEmailCode = async (email: string, code: string): Promise<void> => {
    await apiClient.post('/me/verify-email-code', { email, code });
};

export const logout = async (): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.auth.logout);
};

export const forgotPassword = async (email: string): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.auth.forgotPassword, { email });
};

export const resetPassword = async (data: object): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.auth.resetPassword, data);
};

export const resendVerification = async (): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.auth.resendVerification);
};

export const verifyFromLink = async (url: object): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.auth.verifyEmail, url);
};

export const updateProfile = async (data: Partial<User> & { avatar?: string }): Promise<User> => {
    const response = await apiClient.put(API_ENDPOINTS.user.update, data);
    return response.data?.user || response.data?.data || response.data;
};

export const updatePassword = async (data: object): Promise<void> => {
    // Use endpoint helper - me/password endpoint
    const passwordEndpoint = endpoint('me/password');
    await apiClient.put(passwordEndpoint, data);
};