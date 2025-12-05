import { API_CONFIG } from './api.config';

const BASE_URL = API_CONFIG.baseURL; // Đã có /api/v1

export const endpoint = (path: string): string => {
  if (path.startsWith('http')) return path;
  
  // Loại bỏ leading slash nếu có
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // BASE_URL đã có /api/v1 rồi, chỉ cần thêm path
  // Nếu path đã có v1 ở đầu, loại bỏ nó vì BASE_URL đã có rồi
  if (cleanPath.startsWith('v1/')) {
    return `${BASE_URL}/${cleanPath.slice(3)}`;
  }
  
  return `${BASE_URL}/${cleanPath}`;
};

export const API_ENDPOINTS = {
  // ... (giữ nguyên các endpoint definitions như cũ)
  auth: {
    login: endpoint('login'),
    register: endpoint('register'),
    logout: endpoint('logout'),
    me: endpoint('me'),
    forgotPassword: endpoint('forgot-password'),
    resetPassword: endpoint('reset-password'),
    verifyEmail: endpoint('verify-email'),
    resendVerification: endpoint('resend-verification'),
  },
  user: {
    me: endpoint('me'),
    update: endpoint('me'),
  },
  products: {
    list: endpoint('products'),
    show: (id: string | number) => endpoint(`products/${id}`),
    detail: (id: string | number) => endpoint(`products/${id}`),
    create: endpoint('admin/products'),
    update: (id: string | number) => endpoint(`admin/products/${id}`),
    delete: (id: string | number) => endpoint(`admin/products/${id}`),
    upload: endpoint('admin/products/upload'),
    categories: endpoint('product-categories'),
  },
  orders: {
    list: endpoint('orders'),
    create: endpoint('orders'),
    show: (id: string | number) => endpoint(`orders/${id}`),
    cancel: (id: string | number) => endpoint(`orders/${id}/cancel`),
  },
  deposits: {
    list: endpoint('deposits'),
    create: endpoint('deposits'),
    show: (id: string | number) => endpoint(`deposits/${id}`),
  },
  paymentMethods: {
    list: endpoint('payment-methods'),
  },
  posts: {
    list: endpoint('posts'),
    show: (slug: string) => endpoint(`posts/${slug}`),
  },
  faq: {
    list: endpoint('faq'),
  },
  settings: {
    public: endpoint('settings'),
    admin: endpoint('admin/settings'),
    theme: endpoint('admin/settings/theme'),
  },
  wishlist: {
    list: endpoint('wishlist'),
    add: endpoint('wishlist'),
    remove: (productId: string | number) => endpoint(`wishlist/${productId}`),
    check: (productId: string | number) => endpoint(`wishlist/check/${productId}`),
    count: endpoint('wishlist/count'),
  },
  reviews: {
    list: (productId: string | number) => endpoint(`products/${productId}/reviews`),
    summary: (productId: string | number) => endpoint(`products/${productId}/reviews/summary`),
    create: (productId: string | number) => endpoint(`products/${productId}/reviews`),
    update: (reviewId: string | number) => endpoint(`reviews/${reviewId}`),
    delete: (reviewId: string | number) => endpoint(`reviews/${reviewId}`),
    voteHelpful: (reviewId: string | number) => endpoint(`reviews/${reviewId}/helpful`),
    voteUnhelpful: (reviewId: string | number) => endpoint(`reviews/${reviewId}/unhelpful`),
  },
  admin: {
    dashboard: endpoint('admin/dashboard'),
    users: endpoint('admin/users'),
    products: endpoint('admin/products'),
    orders: endpoint('admin/orders'),
    deposits: endpoint('admin/deposits'),
    apiKeys: endpoint('admin/api-keys'),
    settings: endpoint('admin/settings'),
    productCategories: endpoint('admin/product-categories'),
    posts: endpoint('admin/posts'),
    faq: endpoint('admin/faq'),
    suppliers: endpoint('admin/suppliers'),
    files: endpoint('admin/files'),
    logs: endpoint('admin/logs'),
    reviews: endpoint('admin/reviews'),
    paymentMethods: endpoint('admin/payment-methods'),
  },
  webhooks: {
    sepay: endpoint('webhooks/sepay'),
  },
} as const;