// src/types.ts

import { AxiosError, AxiosResponse } from 'axios';

// === USER & AUTH ===
export interface User {
  id: number;
  name: string;
  email: string;
  emailVerified?: boolean;
  email_verified_at?: string | null;
  balance: number;
  role: 'user' | 'admin';
  avatarUrl?: string;
  referralLink?: string;
  createdAt?: string;
}

export interface TopUser {
  rank: number;
  name: string;
  avatar: string;
  amount: number;
}

// === PRODUCTS ===
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  country: string;
  category: string;
  imageUrl?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  product_count: number;
}

export interface Document {
  id: string;
  name: string;
  description: string;
  price: number;
  downloadUrl: string;
  version: string;
  releaseDate: string;
  category?: string; // Danh mục tài liệu
}


// === ORDERS & PAYMENTS ===
export interface Order {
  id: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  purchaseDate: string;
  status: 'Đã hoàn thành' | 'Đã hủy' | 'Đang xử lý';
  userEmail?: string; // For admin views
  items?: { data: string }[]; // For order details
}

export interface Deposit {
  id: string;
  amount: number;
  method: string;
  createdAt: string;
  status: 'completed' | 'pending' | 'failed' | 'Hoàn thành' | 'Đang chờ' | 'Thất bại';
  transaction_code?: string;
  transactionCode?: string;
  userEmail?: string; // For admin views
}

export interface PaymentMethod {
  id: string;
  type: 'bank' | 'momo';
  name: string;
  accountName: string;
  accountNumber: string;
  qrCodeUrl?: string;
  is_active: boolean;
  transaction_code?: string; // For deposit response
}

// Response type khi tạo deposit
export interface CreateDepositResponse {
  message: string;
  deposit: Deposit;
  transaction_code: string;
  payment_method: PaymentMethod;
  amount: number;
}

// === API & ADMIN ===
// Fix: Redefined ApiError to correctly use AxiosError generics for the response data type.
// This ensures that ApiError correctly inherits all properties from AxiosError, including `message`.
export interface ApiError extends AxiosError {
  response?: AxiosResponse<{
    message: string;
    errors?: Record<string, string[]>;
  }>;
}

export interface AdminApiKey {
    id: string;
    keyPreview: string;
    createdAt: string;
    lastUsed: string | null;
    status: 'active' | 'revoked';
}

export interface ApiKeyUsage {
    id: string;
    timestamp: string;
    action: string;
    ipAddress: string;
}

export interface UploadedFile {
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
}


// === SUPPLIERS ===
export interface Supplier {
  id: string;
  name: string;
  productCount: number;
}

export interface SupplierProduct {
  id: string;
  name: string;
  cost: number;
  stock: number;
}

// === CONTENT & MARKETING ===
export interface Testimonial {
  quote: string;
  author: string;
  position: string;
  avatar?: string;
}

export interface AffiliateStats {
  totalCommission: number;
  pendingCommission: number;
  referrals: number;
  conversionRate: number;
}

export interface Commission {
  id: string;
  orderId: string;
  referredUser: string;
  orderTotal: number;
  commissionAmount: number;
  date: string;
  status: 'approved' | 'pending' | 'rejected';
  userEmail?: string; // For admin views
}

export interface Post {
    id: string;
    title: string;
    slug: string;
    content: string;
    authorName: string;
    status: 'published' | 'draft';
    createdAt: string;
    updatedAt: string;
}

export interface Faq {
    id: string;
    question: string;
    answer: string;
    is_active: boolean;
    order: number;
}

// === TASKS ===
export interface Task {
    id: string;
    title: string;
    isCompleted: boolean;
    priority: 'low' | 'medium' | 'high';
}

// === SETTINGS ===
export interface GeneralSettings {
    siteName: string;
    siteLogoUrl: string;
    siteFaviconUrl: string;
    primaryDomain: string;
    apiDomain: string;
    maintenanceMode: boolean;
    systemNotification: string;
    contactEmail: string;
    contactZalo: string;
    contactTelegram: string;
}

export interface ServiceApiSettings {
    externalApiKey: string;
    webhookEndpoint: string;
    retryOnError: boolean;
}

export interface ToolsSettings {
    checkLiveEngine: 'internal' | 'external';
    checkLiveApiKey: string;
    requestLimitPerUser: number;
    cacheDurationMinutes: number;
}

export interface UserRolesSettings {
    vipTiers: { id: number; name: string; minDeposit: number; discountPercent: number; }[];
    kycRequired: boolean;
    depositBonuses: { id: number; depositAmount: number; bonusPercent: number; }[];
}

export interface NotificationSettings {
    smtpHost: string;
    smtpPort: number;
    smtpUser: string;
    smtpPass: string;
    smtpEncryption: 'none' | 'tls' | 'ssl';
    fromEmail: string;
    fromName: string;
    telegramWebhookUrl: string;
    discordWebhookUrl: string;
}

export interface SecuritySettings {
    enable2FA: boolean;
    rateLimitGlobal: number;
    rateLimitAuth: number;
    adminIpWhitelist: string;
}
