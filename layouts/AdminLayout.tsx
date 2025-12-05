import { Outlet } from 'react-router-dom';
import AdminSideNav from '@/components/layout/AdminSideNav';
import { DashboardShell } from './DashboardShell';

export default function AdminLayout() {
    return (
        <DashboardShell
            renderSidebar={props => <AdminSideNav {...props} />}
        >
            <Outlet />
        </DashboardShell>
    );
}