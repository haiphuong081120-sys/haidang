/**
 * @deprecated Use adminService.getDashboardStats() instead
 * This file is kept for backward compatibility but will be removed in future versions.
 */
import { adminService } from './admin.service';
import type { DashboardData } from './admin.service';

/**
 * Fetches the data for the admin dashboard from the API.
 * Safe Mode: Returns default zero-data if API fails instead of throwing.
 * 
 * @deprecated Use adminService.getDashboardStats() instead
 */
export const fetchDashboardData = async (): Promise<DashboardData> => {
    return adminService.getDashboardStats();
};

// Re-export types for backward compatibility
export type { DashboardData };