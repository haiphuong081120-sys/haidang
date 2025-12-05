import React, { ReactNode, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Header from '@/components/layout/Header';
// Removed EmailVerificationBanner import
import { GlobalNotificationBanner } from '@/components/GlobalNotificationBanner';

export type DashboardShellSidebarProps = {
    isCollapsed: boolean;
    isMobileOpen: boolean;
    onToggleCollapse: () => void;
    onCloseMobile: () => void;
    className?: string;
};

interface DashboardShellProps {
    renderSidebar: (props: DashboardShellSidebarProps) => ReactNode;
    children: ReactNode;
    showEmailVerificationBanner?: boolean; // Kept for prop compatibility but ignored in render
    contentMaxWidth?: number | string;
}

const MotionDiv = motion.div as any;

export const DashboardShell: React.FC<DashboardShellProps> = ({
    renderSidebar,
    children,
    contentMaxWidth = '100%',
}) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const handleToggleSidebar = () => {
        if (typeof window !== 'undefined' && window.innerWidth < 1024) {
            setMobileSidebarOpen(prev => !prev);
        } else {
            setIsSidebarCollapsed(prev => !prev);
        }
    };

    const closeMobileSidebar = () => {
        if (typeof window !== 'undefined' && window.innerWidth < 1024) {
            setMobileSidebarOpen(false);
        }
    };

    const largeSidebarWidth = useMemo(
        () => (isSidebarCollapsed ? 'lg:w-[107px]' : 'lg:w-[283px]'),
        [isSidebarCollapsed]
    );

    return (
        <div className="relative flex h-screen overflow-hidden bg-background">
            {/* Animated gradient background */}
            <MotionDiv
                className="pointer-events-none fixed inset-0 -z-10 opacity-15 dark:opacity-10"
                animate={{
                    background: [
                        "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.3) 0%, rgba(99, 102, 241, 0.3) 50%, rgba(0, 0, 0, 0) 100%)",
                        "radial-gradient(circle at 30% 70%, rgba(236, 72, 153, 0.3) 0%, rgba(139, 92, 246, 0.3) 50%, rgba(0, 0, 0, 0) 100%)",
                        "radial-gradient(circle at 70% 30%, rgba(34, 197, 94, 0.3) 0%, rgba(59, 130, 246, 0.3) 50%, rgba(0, 0, 0, 0) 100%)",
                        "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.3) 0%, rgba(99, 102, 241, 0.3) 50%, rgba(0, 0, 0, 0) 100%)",
                    ],
                }}
                transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />

            {/* Mobile sidebar overlay */}
            {isMobileSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
                    onClick={closeMobileSidebar}
                />
            )}

            {/* Mobile sidebar drawer */}
            <div
                className={cn(
                    'fixed inset-y-0 left-0 z-50 w-64 transform border-r bg-background transition-transform duration-300 ease-in-out lg:hidden rounded-r-2xl shadow-lg',
                    isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                {renderSidebar({
                    isCollapsed: false,
                    isMobileOpen: isMobileSidebarOpen,
                    onToggleCollapse: handleToggleSidebar,
                    onCloseMobile: closeMobileSidebar,
                    className: 'h-full',
                })}
            </div>

            {/* Desktop Sidebar - Fixed */}
            <aside
                className={cn(
                    'fixed left-0 top-0 z-30 hidden h-screen shrink-0 border-r bg-background transition-[width] duration-300 ease-in-out lg:block rounded-r-2xl shadow-lg',
                    largeSidebarWidth
                )}
            >
                {renderSidebar({
                    isCollapsed: isSidebarCollapsed,
                    isMobileOpen: false,
                    onToggleCollapse: handleToggleSidebar,
                    onCloseMobile: closeMobileSidebar,
                    className: 'h-full',
                })}
            </aside>

            {/* Main Content Area - Scrollable */}
            <div
                className={cn(
                    'flex flex-1 flex-col overflow-hidden transition-[margin-left] duration-300 ease-in-out',
                    isSidebarCollapsed ? 'lg:ml-[107px]' : 'lg:ml-[283px]'
                )}
            >
                {/* Header - Fixed */}
                <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur">
                    <div className="mx-auto w-full max-w-[1920px] px-3 sm:px-5 lg:px-8">
                        <Header onToggleSidebar={handleToggleSidebar} isSidebarCollapsed={isSidebarCollapsed} />
                    </div>
                </header>

                {/* Global Notification Banner - Fixed */}
                <div className="sticky top-[64px] z-10 shrink-0">
                    <GlobalNotificationBanner />
                </div>

                {/* Content Area - Scrollable */}
                <main className="flex-1 overflow-y-auto">
                <div className="mx-auto w-full max-w-[1920px] px-3 py-4 sm:px-5 sm:py-6 lg:px-8 lg:py-8">
                        <div
                            className="mx-auto w-full space-y-6"
                            style={{ maxWidth: contentMaxWidth }}
                        >
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default DashboardShell;