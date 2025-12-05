
// Chỉ import các type được sử dụng trong mock data
import { Testimonial, Order, AffiliateStats, Commission, User, Product, Deposit, Faq, Post, ProductCategory, PaymentMethod, AdminApiKey, Task, TopUser, Document } from '../types';

export const mockUser: User = {
  id: 1,
  name: 'Hải Đăng',
  email: 'admin@haidang.com',
  emailVerified: true,
  // Đảm bảo trường này có dữ liệu để bypass các check ở frontend
  email_verified_at: new Date().toISOString(),
  balance: 1250000,
  role: 'admin',
  avatarUrl: 'https://i.pravatar.cc/150?u=admin',
  referralLink: 'https://haidangmeta.com/ref/hd123'
};

export const mockUsers: User[] = [
    mockUser,
    { 
        id: 2, 
        name: 'Normal User', 
        email: 'user@haidang.com', 
        // FIX: Luôn set true để không bắt xác thực
        emailVerified: true, 
        email_verified_at: new Date().toISOString(),
        balance: 250000, 
        role: 'user', 
        createdAt: new Date().toISOString() 
    },
    { 
        id: 3, 
        name: 'Another User', 
        email: 'user2@haidang.com', 
        emailVerified: true, 
        email_verified_at: new Date().toISOString(),
        balance: 0, 
        role: 'user', 
        createdAt: new Date().toISOString() 
    },
];

export const mockTestimonials: Testimonial[] = [
    {
        quote: 'Dịch vụ tuyệt vời, tài khoản chất lượng, support nhiệt tình. Sẽ ủng hộ dài dài.',
        author: 'Nguyễn Văn A',
        position: 'Marketer tại ABC Corp',
        avatar: 'https://i.pravatar.cc/150?u=a',
    },
    {
        quote: 'Giá cả phải chăng, hệ thống tự động nhanh chóng. Rất hài lòng với trải nghiệm.',
        author: 'Trần Thị B',
        position: 'Chủ shop online',
        avatar: 'https://i.pravatar.cc/150?u=b',
    },
];

export const mockDashboardData = {
    revenueLast7Days: [
        { day: 'T2', amount: 1500000 },
        { day: 'T3', amount: 2200000 },
        { day: 'T4', amount: 1800000 },
        { day: 'T5', amount: 2500000 },
        { day: 'T6', amount: 3000000 },
        { day: 'T7', amount: 2800000 },
        { day: 'CN', amount: 4000000 },
    ],
};

export const mockAdminDashboardData = {
    stats: { totalRevenue: 12345678, newUsersMonthly: 123, newOrders24h: 45, conversionRate: 5.6 },
    revenueLast7Days: mockDashboardData.revenueLast7Days,
    recentActivities: [
        { type: 'newUser' as const, text: 'user@haidang.com vừa đăng ký', timestamp: new Date().toISOString() },
        { type: 'newOrder' as const, text: 'Đơn hàng #123 mới trị giá 250,000đ', timestamp: new Date().toISOString() },
    ],
    topProducts: [
        { name: 'VIA US Cổ', sales: 150 },
        { name: 'Clone Philippines', sales: 300 },
    ],
};

export const mockProducts: Product[] = [
    { id: 'prod_1', name: 'VIA US Cổ', description: 'Tài khoản VIA US cổ, trust cao, phù hợp chạy quảng cáo.', price: 50000, stock: 150, country: 'US', category: 'VIA' },
    { id: 'prod_2', name: 'Clone Philippines', description: 'Tài khoản clone profile thật, tương tác tốt, dùng để seeding.', price: 15000, stock: 2500, country: 'PH', category: 'Clone' },
    { id: 'prod_3', name: 'BM5 kháng', description: 'Business Manager 5 đã kháng, sẵn sàng cho chiến dịch lớn.', price: 750000, stock: 10, country: 'VN', category: 'BM' },
    { id: 'prod_4', name: 'Fanpage cổ', description: 'Fanpage > 1 năm tuổi, có tương tác.', price: 200000, stock: 0, country: 'VN', category: 'Fanpage' },
];

export const mockDocuments: Document[] = [
    { id: 'doc_1', name: 'Bộ tài liệu Hướng dẫn chạy Ads A-Z', description: 'Tài liệu chi tiết từ cơ bản đến nâng cao về quảng cáo Facebook, Google, và Tiktok.', price: 500000, downloadUrl: '#', version: '1.2', releaseDate: '2023-10-01' },
    { id: 'doc_2', name: 'Tổng hợp tuts blackhat 2024', description: 'Các thủ thuật nâng cao và mẹo độc quyền dành cho người dùng có kinh nghiệm.', price: 1000000, downloadUrl: '#', version: '2.0', releaseDate: '2023-09-15' },
    { id: 'doc_3', name: 'Ebook: Xây dựng thương hiệu cá nhân', description: 'Bí quyết xây dựng hình ảnh và thương hiệu cá nhân thành công trên mạng xã hội.', price: 250000, downloadUrl: '#', version: '1.0', releaseDate: '2023-11-05' },
];

export const mockOrderDataString = Array.from({ length: 5 }, (_, i) => `uid${1000+i}|pass${1000+i}|2fa_secret_key_${1000+i}|cookie_data_...`).join('\n');

export const mockProductCategories: ProductCategory[] = [
    { id: 'cat_1', name: 'VIA', description: 'Tài khoản VIA các nước', product_count: 5 },
    { id: 'cat_2', name: 'Clone', description: 'Tài khoản clone seeding', product_count: 3 },
    { id: 'cat_3', name: 'BM', description: 'Tài khoản Business Manager', product_count: 2 },
];

export const mockOrders: Order[] = [
    { id: 'ord_1', productName: 'VIA US Cổ', quantity: 5, totalPrice: 250000, purchaseDate: new Date().toISOString(), status: 'Đã hoàn thành', userEmail: 'user@haidang.com', items: [{data: 'uid|pass|2fa'}] },
    { id: 'ord_2', productName: 'Clone Philippines', quantity: 10, totalPrice: 150000, purchaseDate: new Date(Date.now() - 86400000).toISOString(), status: 'Đã hoàn thành', userEmail: 'user2@haidang.com' },
];

export const mockPaymentMethods: PaymentMethod[] = [
    { id: 'pm_1', name: 'Vietcombank', type: 'bank', accountName: 'NGUYEN VAN A', accountNumber: '123456789', qrCodeUrl: '/qr-code.png', is_active: true },
    { id: 'pm_2', name: 'Momo', type: 'momo', accountName: 'NGUYEN VAN A', accountNumber: '0987654321', qrCodeUrl: '/qr-code.png', is_active: true },
];

export const mockDeposits: Deposit[] = [
    { id: 'dep_1', amount: 500000, method: 'Vietcombank', createdAt: new Date().toISOString(), status: 'Hoàn thành', transactionCode: 'FT23001', userEmail: 'user@haidang.com' },
    { id: 'dep_2', amount: 200000, method: 'Momo', createdAt: new Date(Date.now() - 86400000).toISOString(), status: 'Đang chờ', userEmail: 'user2@haidang.com' },
];

export const mockTopUsers: TopUser[] = [
    { rank: 1, name: 'User A', avatar: 'https://i.pravatar.cc/150?u=usera', amount: 5000000 },
    { rank: 2, name: 'User B', avatar: 'https://i.pravatar.cc/150?u=userb', amount: 3500000 },
    { rank: 3, name: 'User C', avatar: 'https://i.pravatar.cc/150?u=userc', amount: 2000000 },
];

export const mockAffiliateStats: AffiliateStats = {
    totalCommission: 75000,
    pendingCommission: 15000,
    referrals: 12,
    conversionRate: 5.2,
};

export const mockCommissions: Commission[] = [
    { id: 'com_1', orderId: 'ord_1', referredUser: 'user@haidang.com', orderTotal: 250000, commissionAmount: 25000, date: new Date().toISOString(), status: 'approved', userEmail: 'affiliate@user.com' },
    { id: 'com_2', orderId: 'ord_2', referredUser: 'user2@haidang.com', orderTotal: 150000, commissionAmount: 15000, date: new Date().toISOString(), status: 'pending', userEmail: 'affiliate@user.com' },
];
export const mockAdminCommissions: Commission[] = mockCommissions;

export const mockPosts: Post[] = [
    { 
        id: 'post_1', 
        title: 'Mẹo Chạy Quảng Cáo Facebook 2025 - Lách Policy Hợp Pháp', 
        slug: 'meo-chay-quang-cao-facebook-2025-lach-policy-hop-phap', 
        content: `# 🎯 Mẹo Chạy Quảng Cáo Facebook 2025 - Lách Policy Hợp Pháp

---

## 📜 CHÍNH SÁCH QUẢNG CÁO FACEBOOK 2025

### 🆕 **CẬP NHẬT MỚI NHẤT**

#### 1. **Verification bắt buộc**

**Yêu cầu:**
\`\`\`
✅ Business verification (verify doanh nghiệp)
✅ Identity verification (xác minh danh tính)
✅ Domain verification (xác minh domain)
✅ Two-Factor Authentication (2FA)
\`\`\`

**Không verify = không chạy ads**

---

#### 2. **Landing Page Requirements**

Facebook kiểm tra nghiêm ngặt:
\`\`\`
✅ HTTPS (bắt buộc SSL)
✅ Privacy Policy page
✅ Terms of Service
✅ Contact information
✅ About Us page
✅ Load speed < 3s
\`\`\`

---

## 🔧 SETUP ADS ACCOUNT ĐÚNG CÁCH

### **BƯỚC 1: Chuẩn bị tài khoản**

#### Tài khoản cá nhân (Personal Account)

**Yêu cầu:**
\`\`\`
✅ Đã nuôi 14-30 ngày
✅ Có bạn bè 100+
✅ Có hoạt động đều đặn
✅ Đã setup 2FA
\`\`\`

---

## 🔓 MẸO LÁCH POLICY HỢP PHÁP

### ⚖️ **QUAN TRỌNG: Lách ≠ Vi phạm**

**Lách hợp pháp:** Tìm cách tuân thủ policy thông minh
**Vi phạm:** Cố tình đi ngược policy → BỊ BAN

---

### **1. Content Strategy**

#### ❌ **TRÁNH:**
\`\`\`
"GIẢM CÂN NHANH TRONG 7 NGÀY"
→ Claim không realistic
→ Dễ bị reject
\`\`\`

#### ✅ **NÊN:**
\`\`\`
"HỖ TRỢ QUẢN LÝ CÂN NẶNG"
→ Soft claim, hợp lý
\`\`\`
---

## 📈 TỐI ƯU CHIẾN DỊCH

### **Campaign Structure**

#### Recommended structure:

\`\`\`
CAMPAIGN
├── Campaign Budget Optimization (CBO)
├── Budget: 500,000 VND/day
└── Objective: Conversions
\`\`\`
`, 
        authorName: 'Admin', 
        status: 'published', 
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString() 
    },
    { 
        id: 'post_2', 
        title: 'Mẹo Nuôi Nick Facebook 2025 - Bí Quyết Tránh Checkpoint', 
        slug: 'meo-nuoi-nick-facebook-2025-bi-quyet-tranh-checkpoint', 
        content: `# 🔥 Mẹo Nuôi Nick Facebook 2025 - Bí Quyết Tránh Checkpoint

---

## 🤔 TẠI SAO PHẢI NUÔI NICK FACEBOOK?

### Lý do quan trọng:

✅ **Tăng độ tin cậy (Trust Score)**
- Facebook đánh giá tài khoản qua nhiều yếu tố
- Tài khoản mới = độ tin cậy thấp = dễ bị checkpoint
- Nuôi nick = xây dựng lịch sử hoạt động tích cực

✅ **Tránh bị khóa khi chạy quảng cáo**
- Facebook nghi ngờ tài khoản mới chạy ads
- Tài khoản đã nuôi = giảm 70% nguy cơ bị khóa

---

## 📊 CÁC LOẠI TÀI KHOẢN FACEBOOK

### 1. **VIA (Very Important Account)**

**Đặc điểm:**
\`\`\`
✅ Tài khoản thật người Việt
✅ Email Hotmail/Outlook trust
✅ Full 2FA bảo mật
✅ Có lịch sử hoạt động
\`\`\`

---

## 🔄 QUY TRÌNH NUÔI NICK CHUẨN 2025

### 📅 **TUẦN 1-2: KHỞI ĐỘNG**

#### Ngày 1-3: Thiết lập cơ bản

**Sáng (8h-10h):**
\`\`\`
✅ Login lần đầu
✅ Cập nhật avatar đẹp, chất lượng cao
✅ Cập nhật cover photo phù hợp
✅ Điền thông tin cơ bản: Học vấn, Công việc
\`\`\`

---

## 🛡️ MẸO TRÁNH CHECKPOINT 2025

### ⚠️ CÁC HÀNH VI DỄ BỊ CHECKPOINT

#### 1. **Thay đổi đột ngột**
\`\`\`
❌ Đổi tên liên tục
❌ Đổi avatar/cover quá thường xuyên
❌ Login từ nhiều IP khác nhau
\`\`\`

### 🔒 CHECKPOINT - CÁCH XỬ LÝ

#### Loại 1: Verify Identity (Xác minh danh tính)

**Yêu cầu:**
- Upload CMND/CCCD
- Ảnh selfie

**Cách pass:**
\`\`\`
✅ Dùng CMND/CCCD thật (nếu VIA Việt)
✅ Ảnh rõ mặt, đúng người
\`\`\`
`,
        authorName: 'Admin', 
        status: 'published', 
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString() 
    },
];

export const mockFaqs: Faq[] = [
    { id: 'faq_1', question: 'Làm thế nào để nạp tiền?', answer: 'Bạn vào mục Nạp tiền, chọn phương thức và làm theo hướng dẫn.', is_active: true, order: 1 },
    { id: 'faq_2', question: 'Tài khoản có được bảo hành không?', answer: 'Có, chúng tôi có chính sách bảo hành cho từng loại sản phẩm.', is_active: true, order: 2 },
];

export const mockApiKeys: AdminApiKey[] = [
    { id: 'key_1', keyPreview: 'sk_..._1234', createdAt: new Date().toISOString(), lastUsed: new Date().toISOString(), status: 'active' },
    { id: 'key_2', keyPreview: 'sk_..._5678', createdAt: new Date(Date.now() - 86400000 * 5).toISOString(), lastUsed: null, status: 'revoked' },
];

export const mockTasks: Task[] = [
    { id: 'task_1', title: 'Update document', isCompleted: false, priority: 'high' },
    { id: 'task_2', title: 'Check new API version', isCompleted: true, priority: 'medium' },
    { id: 'task_3', title: 'Reply to support tickets', isCompleted: false, priority: 'low' },
];
