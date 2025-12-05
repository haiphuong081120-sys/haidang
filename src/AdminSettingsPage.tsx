import React, { Suspense } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader } from '@/components/admin/PageHeader';

// 1. Sử dụng React.lazy để khai báo các component tab.
// Vite sẽ tự động tách code của các component này thành các file riêng.
const GeneralSettingsTab = React.lazy(() => import('./GeneralSettingsTab'));
const PaymentSettingsTab = React.lazy(() => import('./PaymentSettingsTab'));
const ThemeSettingsTab = React.lazy(() => import('./ThemeSettingsTab'));

// Component hiển thị khi tab đang được tải
const TabSkeleton = () => (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse">
        <div className="h-8 w-1/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="mt-4 h-4 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="mt-2 h-4 w-2/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
    </div>
);

export const AdminSettingsPage = () => {
    return (
        <div className="p-4 sm:p-6">
            <PageHeader title="Cài đặt hệ thống" description="Quản lý các cấu hình cho toàn bộ trang web." />

            <Tabs defaultValue="general" className="mt-6">
                <TabsList className="bg-transparent p-0 rounded-none border-b border-border w-full justify-start">
                    <TabsTrigger value="general" variant="underline">Chung</TabsTrigger>
                    <TabsTrigger value="payment" variant="underline">Thanh toán</TabsTrigger>
                    <TabsTrigger value="theme" variant="underline">Giao diện</TabsTrigger>
                </TabsList>

                <Suspense fallback={<TabSkeleton />}>
                    <TabsContent value="general"><GeneralSettingsTab /></TabsContent>
                    <TabsContent value="payment"><PaymentSettingsTab /></TabsContent>
                    <TabsContent value="theme"><ThemeSettingsTab /></TabsContent>
                </Suspense>
            </Tabs>
        </div>
    );
};