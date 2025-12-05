/**
 * Application Configuration
 * General app settings and constants
 */

export const APP_CONFIG = {
  // App Info
  name: 'Hải Đăng Meta',
  version: '1.0.0',
  description: 'Facebook Account Store',
  
  // Environment
  env: import.meta.env.MODE || 'development',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD || false,
  
  // Features
  features: {
    // QUAN TRỌNG: Tắt Mock Data để chạy thật 100%
    mockData: false, 
    analytics: import.meta.env.PROD || false,
    emailVerification: true,
    twoFactorAuth: true,
  },
  
  // Pagination
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [10, 20, 50, 100],
  },
  
  // Upload
  upload: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    allowedDocTypes: ['application/pdf', 'text/plain'],
  },
  
  // Debounce
  debounce: {
    search: 500, // ms
    resize: 300, // ms
  },
  
  // UI
  ui: {
    toastDuration: 3000, // ms
    animationDuration: 300, // ms
    sidebarWidth: {
      expanded: 256, // px
      collapsed: 80, // px
    },
  },
} as const;