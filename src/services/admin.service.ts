import apiClient from './apiClient';
import { API_ENDPOINTS } from '../config';
import { User } from '../types';

export interface AdminListResponse<T> {
    data: T[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
}

export interface DashboardData {
    stats: {
        total_users?: number;
        total_orders?: number;
        total_products?: number;
        total_deposits?: number;
        totalRevenue?: number;
        newUsersMonthly?: number;
        newOrders24h?: number;
        conversionRate?: number;
    };
    revenueLast7Days?: { day: string; amount: number }[] | { date: string; revenue: number }[];
    recentActivities?: { type: 'newUser' | 'newOrder'; text: string; timestamp: string; link?: string }[];
    recent_orders?: any[];
    recent_deposits?: any[];
    topProducts?: { name: string; sales: number; link?: string }[];
    top_products?: any[];
    daily_stats?: any;
}

/**
 * Admin Service
 * Centralized logic for all Admin API calls.
 * Uses API_ENDPOINTS for consistency and ensures data integrity.
 * Prevents UI crashes by returning safe defaults.
 */
export const adminService = {
    // --- DASHBOARD ---
    async getDashboardStats(): Promise<DashboardData> {
        try {
            const response = await apiClient.get(API_ENDPOINTS.admin.dashboard);
            const data = response.data;
            
            // Normalize response structure to match frontend expectations
            return {
                stats: {
                    totalRevenue: data.stats?.total_deposits || data.stats?.totalRevenue || 0,
                    newUsersMonthly: data.stats?.total_users || data.stats?.newUsersMonthly || 0,
                    newOrders24h: data.stats?.total_orders || data.stats?.newOrders24h || 0,
                    conversionRate: data.stats?.conversionRate || 0,
                },
                revenueLast7Days: data.revenueLast7Days || data.daily_stats?.orders || [],
                recentActivities: data.recentActivities || [],
                topProducts: data.topProducts || data.top_products || [],
            };
        } catch (error) {
            console.error('AdminService: Failed to fetch dashboard', error);
            // Return safe default structure
            return {
                stats: { totalRevenue: 0, newUsersMonthly: 0, newOrders24h: 0, conversionRate: 0 },
                revenueLast7Days: [],
                recentActivities: [],
                topProducts: []
            };
        }
    },

    // --- USERS ---
    async getUsers(page = 1, search = '', limit = 10): Promise<AdminListResponse<User>> {
        try {
            const response = await apiClient.get(API_ENDPOINTS.admin.users, { 
                params: { page, limit, search: search || undefined } 
            });
            return {
                data: Array.isArray(response.data?.data) ? response.data.data : [],
                totalPages: response.data?.totalPages || 1,
                totalItems: response.data?.totalItems || 0,
                currentPage: response.data?.currentPage || 1
            };
        } catch (error) {
            console.error('AdminService: Failed to fetch users', error);
            return { data: [], totalPages: 1, totalItems: 0, currentPage: 1 };
        }
    },

    async deleteUser(id: number | string): Promise<void> {
        await apiClient.delete(`${API_ENDPOINTS.admin.users}/${id}`);
    },

    async updateUser(id: number | string, data: Partial<User>): Promise<User> {
        const response = await apiClient.put(`${API_ENDPOINTS.admin.users}/${id}`, data);
        return response.data;
    },

    // --- PRODUCTS ---
    async getProducts(page = 1, search = '', limit = 10): Promise<AdminListResponse<any>> {
        try {
            const response = await apiClient.get(API_ENDPOINTS.admin.products, { 
                params: { page, limit, search: search || undefined } 
            });
            return {
                data: Array.isArray(response.data?.data) ? response.data.data : [],
                totalPages: response.data?.totalPages || 1,
                totalItems: response.data?.totalItems || 0,
                currentPage: response.data?.currentPage || 1
            };
        } catch (error) {
            console.error('AdminService: Failed to fetch products', error);
            return { data: [], totalPages: 1, totalItems: 0, currentPage: 1 };
        }
    },

    async deleteProduct(id: number | string): Promise<void> {
        await apiClient.delete(API_ENDPOINTS.products.delete(id));
    },

    async createProduct(data: any): Promise<any> {
        const response = await apiClient.post(API_ENDPOINTS.products.create, data);
        return response.data;
    },

    async updateProduct(id: number | string, data: any): Promise<any> {
        const response = await apiClient.put(API_ENDPOINTS.products.update(id), data);
        return response.data;
    },

    // --- ORDERS ---
    async getOrders(page = 1, search = '', limit = 10): Promise<AdminListResponse<any>> {
        try {
            const response = await apiClient.get(API_ENDPOINTS.admin.orders, { 
                params: { page, limit, search: search || undefined } 
            });
            return {
                data: Array.isArray(response.data?.data) ? response.data.data : [],
                totalPages: response.data?.totalPages || 1,
                totalItems: response.data?.totalItems || 0,
                currentPage: response.data?.currentPage || 1
            };
        } catch (error) {
            console.error('AdminService: Failed to fetch orders', error);
            return { data: [], totalPages: 1, totalItems: 0, currentPage: 1 };
        }
    },

    // --- DEPOSITS ---
    async getDeposits(page = 1, search = '', limit = 10): Promise<AdminListResponse<any>> {
        try {
            const response = await apiClient.get(API_ENDPOINTS.admin.deposits, { 
                params: { page, limit, search: search || undefined } 
            });
            return {
                data: Array.isArray(response.data?.data) ? response.data.data : [],
                totalPages: response.data?.totalPages || 1,
                totalItems: response.data?.totalItems || 0,
                currentPage: response.data?.currentPage || 1
            };
        } catch (error) {
            console.error('AdminService: Failed to fetch deposits', error);
            return { data: [], totalPages: 1, totalItems: 0, currentPage: 1 };
        }
    },

    async updateDepositStatus(id: string, status: string): Promise<void> {
        await apiClient.put(`${API_ENDPOINTS.admin.deposits}/${id}`, { status });
    },

    // --- CATEGORIES ---
    async getCategories(): Promise<any[]> {
        try {
            const response = await apiClient.get(API_ENDPOINTS.admin.productCategories);
            // Safely handle potential malformed responses to prevent 500 errors from crashing UI
            const data = response.data?.categories || response.data?.data || response.data || [];
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('AdminService: Failed to fetch categories', error);
            return []; // Return empty array instead of throwing
        }
    },

    async createCategory(data: any): Promise<any> {
        const response = await apiClient.post(API_ENDPOINTS.admin.productCategories, data);
        return response.data;
    },

    async updateCategory(id: number | string, data: any): Promise<any> {
        const response = await apiClient.put(`${API_ENDPOINTS.admin.productCategories}/${id}`, data);
        return response.data;
    },

    async deleteCategory(id: number | string): Promise<void> {
        await apiClient.delete(`${API_ENDPOINTS.admin.productCategories}/${id}`);
    },

    // --- POSTS ---
    async getPosts(page = 1, search = '', limit = 10): Promise<AdminListResponse<any>> {
        try {
            const response = await apiClient.get(API_ENDPOINTS.admin.posts, { 
                params: { page, limit, search: search || undefined } 
            });
            return {
                data: Array.isArray(response.data?.data) ? response.data.data : [],
                totalPages: response.data?.totalPages || 1,
                totalItems: response.data?.totalItems || 0,
                currentPage: response.data?.currentPage || 1
            };
        } catch (error) {
            console.error('AdminService: Failed to fetch posts', error);
            return { data: [], totalPages: 1, totalItems: 0, currentPage: 1 };
        }
    },

    async createPost(data: any): Promise<any> {
        const response = await apiClient.post(API_ENDPOINTS.admin.posts, data);
        return response.data;
    },

    async updatePost(id: number | string, data: any): Promise<any> {
        const response = await apiClient.put(`${API_ENDPOINTS.admin.posts}/${id}`, data);
        return response.data;
    },

    async deletePost(id: number | string): Promise<void> {
        await apiClient.delete(`${API_ENDPOINTS.admin.posts}/${id}`);
    },

    // --- FAQ ---
    async getFaqs(): Promise<any[]> {
        try {
            const response = await apiClient.get(API_ENDPOINTS.admin.faq);
            const data = response.data?.faqs || response.data?.data || response.data || [];
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('AdminService: Failed to fetch FAQs', error);
            return [];
        }
    },

    async createFaq(data: any): Promise<any> {
        const response = await apiClient.post(API_ENDPOINTS.admin.faq, data);
        return response.data;
    },

    async updateFaq(id: number | string, data: any): Promise<any> {
        const response = await apiClient.put(`${API_ENDPOINTS.admin.faq}/${id}`, data);
        return response.data;
    },

    async deleteFaq(id: number | string): Promise<void> {
        await apiClient.delete(`${API_ENDPOINTS.admin.faq}/${id}`);
    },

    // --- FILES ---
    async getFiles(): Promise<any[]> {
        try {
            const response = await apiClient.get(API_ENDPOINTS.admin.files);
            const data = response.data?.files || response.data?.data || response.data || [];
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('AdminService: Failed to fetch files', error);
            return [];
        }
    },

    async uploadFile(file: File): Promise<any> {
        const formData = new FormData();
        formData.append('file', file);
        const response = await apiClient.post(`${API_ENDPOINTS.admin.files}/upload`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },

    async deleteFile(id: string): Promise<void> {
        await apiClient.delete(`${API_ENDPOINTS.admin.files}/${id}`);
    },

    // --- PAYMENT METHODS ---
    async getPaymentMethods(): Promise<any[]> {
        try {
            const response = await apiClient.get(API_ENDPOINTS.admin.paymentMethods);
            const data = response.data?.methods || response.data?.data || response.data || [];
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('AdminService: Failed to fetch payment methods', error);
            return [];
        }
    },

    async createPaymentMethod(data: any): Promise<any> {
        const response = await apiClient.post(API_ENDPOINTS.admin.paymentMethods, data);
        return response.data;
    },

    async updatePaymentMethod(id: number | string, data: any): Promise<any> {
        const response = await apiClient.put(`${API_ENDPOINTS.admin.paymentMethods}/${id}`, data);
        return response.data;
    },

    async deletePaymentMethod(id: number | string): Promise<void> {
        await apiClient.delete(`${API_ENDPOINTS.admin.paymentMethods}/${id}`);
    },

    // --- AFFILIATE (Handle Missing Route Gracefully) ---
    async getCommissions(page = 1, search = '', limit = 10): Promise<AdminListResponse<any>> {
        try {
            const response = await apiClient.get('/admin/affiliate/commissions', { 
                params: { page, limit, search: search || undefined } 
            });
            return {
                data: Array.isArray(response.data?.data) ? response.data.data : [],
                totalPages: response.data?.totalPages || 1,
                totalItems: response.data?.totalItems || 0,
                currentPage: response.data?.currentPage || 1
            };
        } catch (error) {
            // Backend chưa có route này -> Trả về rỗng để UI không lỗi
            console.warn('AdminService: Affiliate API missing or error');
            return { data: [], totalPages: 1, totalItems: 0, currentPage: 1 };
        }
    }
};