import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '@/services/UserContext';
import { PATHS } from '@/constants/paths';

interface AdminRouteGuardProps {
    children: React.ReactNode;
}

/**
 * Component bảo vệ các route của khu vực Admin.
 * - Kiểm tra xem người dùng đã đăng nhập chưa.
 * - Kiểm tra xem người dùng có vai trò 'admin' không.
 * - Nếu không thỏa mãn, chuyển hướng người dùng.
 */
export const AdminRouteGuard = ({ children }: AdminRouteGuardProps) => {
    const { user, isLoading } = useUser();
    const location = useLocation();

    // 1. Trong khi đang kiểm tra thông tin người dùng, hiển thị màn hình chờ.
    // Điều này rất quan trọng để tránh "flicker" (chớp nhoáng) chuyển hướng.
    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <div>Đang kiểm tra quyền truy cập...</div>
            </div>
        );
    }

    // 2. Nếu không có người dùng (chưa đăng nhập), chuyển hướng về trang đăng nhập.
    // `state={{ from: location }}` giúp chúng ta có thể đưa người dùng trở lại trang họ muốn sau khi đăng nhập.
    if (!user) {
        return <Navigate to={PATHS.LOGIN} state={{ from: location }} replace />;
    }

    // 3. Nếu người dùng không có vai trò 'admin', chuyển hướng đến trang 403 Forbidden.
    if (user.role !== 'admin') {
        return <Navigate to={PATHS.FORBIDDEN} replace />;
    }

    // 4. Nếu tất cả điều kiện đều thỏa mãn, cho phép truy cập vào trang con.
    return <>{children}</>;
};