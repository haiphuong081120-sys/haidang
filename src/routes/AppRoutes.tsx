import { lazy, Suspense } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { PATHS } from '../constants/paths';
import { LoadingFallback } from '../components/LoadingFallback';
import { AuthGuard } from '../components/AuthGuard';
import { PublicRoute } from '../components/PublicRoute';
import AdminRoute from '../components/AdminRoute';
import { ScrollToTop } from '../components/ScrollToTop';

// Layouts
const DashboardLayout = lazy(() => import('../layouts/DashboardLayout'));
const AdminLayout = lazy(() => import('../layouts/AdminLayout'));

// Auth Pages (not lazy-loaded for faster initial auth flow)
import LoginPage from '../auth/LoginPage';
import RegisterPage from '../auth/RegisterPage';
import ForgotPasswordPage from '../auth/ForgotPasswordPage';
import ResetPasswordPage from '../auth/ResetPasswordPage';
import VerifyEmailPage from '../auth/VerifyEmailPage';

// Eager load main pages
import HomePage from '../pages/HomePage';
import PlaceholderPage from '../pages/PlaceholderPage';

// Lazy load other pages
const MuaTaiKhoanPage = lazy(() => import('../pages/MuaTaiKhoanPage'));
const CheckoutPage = lazy(() => import('../pages/CheckoutPage'));
const HistoryPage = lazy(() => import('../pages/HistoryPage'));
const LichSuMuaHangPage = lazy(() => import('../pages/LichSuMuaHangPage'));
const CongCuPage = lazy(() => import('../pages/CongCuPage'));
const Get2FAPage = lazy(() => import('../pages/Get2FAPage'));
const CheckLiveFBPage = lazy(() => import('../pages/CheckLiveFBPage'));
const MuaTaiLieuPage = lazy(() => import('../pages/MuaTaiLieuPage'));
const ApiDocsPage = lazy(() => import('../pages/ApiDocsPage'));
const LienHePage = lazy(() => import('../pages/LienHePage'));
const AffiliatePage = lazy(() => import('../pages/AffiliatePage'));
const PostListPage = lazy(() => import('../pages/PostListPage'));
const PostDetailPage = lazy(() => import('../pages/PostDetailPage'));
const FaqPage = lazy(() => import('../pages/FaqPage'));
const TasksPage = lazy(() => import('../pages/TasksPage'));
const CaiDatPage = lazy(() => import('../pages/CaiDatPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const PreferencesSettingsPage = lazy(() => import('../pages/PreferencesSettingsPage'));
const TermsPage = lazy(() => import('../pages/TermsPage'));
const PrivacyPolicyPage = lazy(() => import('../pages/PrivacyPolicyPage'));
const WarrantyPage = lazy(() => import('../pages/WarrantyPage'));
const ConditionsPage = lazy(() => import('../pages/ConditionsPage'));

const AboutPage = lazy(() => import('../pages/AboutPage')); // Import AboutPage

// Deposit pages
const NapTienPage = lazy(() => import('../pages/NapTienPage'));
const DepositDetailPage = lazy(() => import('../pages/DepositDetailPage'));
const LichSuNapTienPage = lazy(() => import('../pages/LichSuNapTienPage'));

// Lazy load Admin pages
const AdminDashboardPage = lazy(() => import('../pages/admin/AdminDashboardPage'));
const UserManagementPage = lazy(() => import('../pages/admin/UserManagementPage'));
const ProductManagementPage = lazy(() => import('../pages/admin/ProductManagementPage'));
const ProductCategoryManagementPage = lazy(() => import('../pages/admin/ProductCategoryManagementPage'));
const UploadProductsPage = lazy(() => import('../pages/admin/UploadProductsPage'));
const AccountImportPage = lazy(() => import('../pages/admin/AccountImportPage'));
const SupplierManagementPage = lazy(() => import('../pages/admin/SupplierManagementPage'));
const OrderManagementPage = lazy(() => import('../pages/admin/OrderManagementPage'));
const PostManagementPage = lazy(() => import('../pages/admin/PostManagementPage'));
const FaqManagementPage = lazy(() => import('../pages/admin/FaqManagementPage'));
const FileManagerPage = lazy(() => import('../pages/admin/FileManagerPage'));
const AdminApiPage = lazy(() => import('../pages/admin/AdminApiPage'));
const AffiliateManagementPage = lazy(() => import('../pages/admin/AffiliateManagementPage'));
const ApiLogPage = lazy(() => import('../pages/admin/ApiLogPage'));
const WebsiteSettingsPage = lazy(() => import('../pages/admin/WebsiteSettingsPage'));
const ThemeSettingsPage = lazy(() => import('../pages/admin/ThemeSettingsPage'));
const ImageSettingsPage = lazy(() => import('../pages/admin/ImageSettingsPage'));
const ServiceApiSettingsPage = lazy(() => import('../pages/admin/ServiceApiSettingsPage'));
const ToolsSettingsPage = lazy(() => import('../pages/admin/ToolsSettingsPage'));
const UserRolesSettingsPage = lazy(() => import('../pages/admin/UserRolesSettingsPage'));
const NotificationSettingsPage = lazy(() => import('../pages/admin/NotificationSettingsPage'));
const SecuritySettingsPage = lazy(() => import('../pages/admin/SecuritySettingsPage'));
const SystemToolsPage = lazy(() => import('../pages/admin/SystemToolsPage'));
const UploadTestPage = lazy(() => import('../pages/admin/UploadTestPage'));
const DepositManagementPage = lazy(() => import('../pages/admin/DepositManagementPage'));

export function AppRoutes() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <ScrollToTop />
            <Routes>
                {/* Public Auth routes - only accessible when NOT authenticated */}
                <Route element={<PublicRoute />}>
                    <Route path={PATHS.LOGIN} element={<LoginPage />} />
                    <Route path={PATHS.REGISTER} element={<RegisterPage />} />
                    <Route path={PATHS.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
                    <Route path={PATHS.RESET_PASSWORD} element={<ResetPasswordPage />} />
                    <Route path={`${PATHS.VERIFY_EMAIL}/:id/:hash`} element={<VerifyEmailPage />} />
                </Route>

                {/* Main application routes with user-facing DashboardLayout - PUBLIC ACCESS */}
                <Route path="/" element={<DashboardLayout />}>
                    <Route index element={<HomePage />} />
                    {/* Public pages - no authentication required */}
                    <Route path={PATHS.ABOUT} element={<AboutPage />} /> {/* Added About route */}
                    <Route path={PATHS.API_DOCS} element={<ApiDocsPage />} />
                    <Route path={PATHS.CONTACT} element={<LienHePage />} />
                    <Route path={PATHS.POSTS} element={<PostListPage />} />
                    <Route path={`${PATHS.POSTS}/:slug`} element={<PostDetailPage />} />
                    <Route path={PATHS.FAQ} element={<FaqPage />} />
                    <Route path={PATHS.TERMS} element={<TermsPage />} />
                    <Route path={PATHS.PRIVACY_POLICY} element={<PrivacyPolicyPage />} />
                    <Route path={PATHS.WARRANTY} element={<WarrantyPage />} />
                    <Route path={PATHS.CONDITIONS} element={<ConditionsPage />} />

                    {/* Public tools - no authentication required */}
                    <Route path={PATHS.TOOLS} element={<CongCuPage />}>
                        <Route index element={<Navigate to={PATHS.TOOLS_GET_2FA} replace />} />
                        <Route path="get-2fa" element={<Get2FAPage />} />
                        <Route path="check-live-fb" element={<CheckLiveFBPage />} />
                    </Route>

                    {/* Protected pages - require authentication */}
                    <Route element={<AuthGuard />}>
                        <Route path={PATHS.STORE} element={<MuaTaiKhoanPage />} />
                        <Route path={PATHS.CHECKOUT} element={<CheckoutPage />} />
                        <Route path={PATHS.DOCUMENTS} element={<MuaTaiLieuPage />} />

                        {/* Authenticated User Routes */}
                        <Route path="/history" element={<HistoryPage />}>
                             <Route index element={<Navigate to={PATHS.ORDERS_HISTORY} replace />} />
                             <Route path="orders" element={<LichSuMuaHangPage />} />
                        </Route>
                        
                        {/* Deposit Routes */}
                        <Route path="/nap-tien" element={<NapTienPage />} />
                        <Route path="/lich-su-nap-tien" element={<LichSuNapTienPage />} />
                        <Route path="/lich-su-nap-tien/:id" element={<DepositDetailPage />} />
                        
                        <Route path={PATHS.AFFILIATE} element={<AffiliatePage />} />
                        <Route path={PATHS.SETTINGS} element={<CaiDatPage />}>
                            <Route index element={<Navigate to={PATHS.PROFILE} replace />} />
                            <Route path="profile" element={<ProfilePage />} />
                            <Route path="tasks" element={<TasksPage />} />
                            <Route path="preferences" element={<PreferencesSettingsPage />} />
                        </Route>
                    </Route>
                    
                    {/* Fallback for any other route inside the main layout */}
                    <Route path="*" element={<PlaceholderPage />} />
                </Route>

                {/* Admin routes with dedicated AdminLayout */}
                <Route element={<AdminLayout />}>
                    <Route path={PATHS.ADMIN} element={<AdminRoute />}>
                        <Route index element={<Navigate to={PATHS.ADMIN_DASHBOARD} replace />} />
                        <Route path="dashboard" element={<AdminDashboardPage />} />
                        <Route path="users" element={<UserManagementPage />} />
                        <Route path="orders" element={<OrderManagementPage />} />
                        <Route path="deposits" element={<DepositManagementPage />} />
                        <Route path="products" element={<ProductManagementPage />} />
                        <Route path="products/upload" element={<UploadProductsPage />} />
                        <Route path="accounts/import" element={<AccountImportPage />} />
                        <Route path="product-categories" element={<ProductCategoryManagementPage />} />
                        <Route path="suppliers" element={<SupplierManagementPage />} />
                        <Route path="posts" element={<PostManagementPage />} />
                        <Route path="faq" element={<FaqManagementPage />} />
                        <Route path="files" element={<FileManagerPage />} />
                        <Route path="upload-test" element={<UploadTestPage />} />
                        <Route path="api-keys" element={<AdminApiPage />} />
                        <Route path="affiliate" element={<AffiliateManagementPage />} />
                        <Route path="api-logs" element={<ApiLogPage />} />
                        
                        {/* Admin Settings Nested Routes */}
                        <Route path="settings" element={<Outlet />}>
                            <Route index element={<Navigate to="general" replace />} />
                            <Route path="general" element={<WebsiteSettingsPage />} />
                            <Route path="branding" element={<Navigate to="general" replace />} />
                            <Route path="theme" element={<ThemeSettingsPage />} />
                            <Route path="images" element={<ImageSettingsPage />} />
                            <Route path="service-api" element={<ServiceApiSettingsPage />} />
                            <Route path="tools" element={<ToolsSettingsPage />} />
                            <Route path="roles" element={<UserRolesSettingsPage />} />
                            <Route path="notifications" element={<NotificationSettingsPage />} />
                            <Route path="security" element={<SecuritySettingsPage />} />
                            <Route path="system" element={<SystemToolsPage />} />
                        </Route>
                        
                        {/* Fallback for any other admin route */}
                        <Route path="*" element={<PlaceholderPage />} />
                    </Route>
                </Route>
            </Routes>
        </Suspense>
    );
}