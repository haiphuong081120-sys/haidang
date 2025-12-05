import { Outlet } from 'react-router-dom';
import AppSidebar from '@/components/layout/AppSidebar';
import { DashboardShell } from './DashboardShell';

export default function DashboardLayout() {
    return (
        <DashboardShell
            renderSidebar={props => <AppSidebar {...props} />}
            showEmailVerificationBanner
        >
            <Outlet />
        </DashboardShell>
    );
}