import { useFetch } from '@/hooks/useFetch';

interface GeneralSettings {
    siteName: string;
    contactEmail: string;
}

const GeneralSettingsTab = () => {
    const { loading, error } = useFetch<GeneralSettings>('/v1/admin/settings/general');

    if (loading) return <div>Đang tải cài đặt chung...</div>;
    if (error) return <div>Lỗi: Không thể tải cài đặt.</div>;

    return (
        <div className="p-6">
            <h3 className="text-lg font-medium">Cài đặt chung</h3>
        </div>
    );
};

export default GeneralSettingsTab;