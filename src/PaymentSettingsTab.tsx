import { useFetch } from '@/hooks/useFetch';

interface PaymentGateway {
    id: string;
    name: string;
    isActive: boolean;
}

const PaymentSettingsTab = () => {
    const { loading, error } = useFetch<PaymentGateway[]>('/v1/admin/settings/payment');

    if (loading) return <div>Đang tải cài đặt thanh toán...</div>;
    if (error) return <div>Lỗi: Không thể tải cài đặt.</div>;

    return (
        <div className="p-6">
            <h3 className="text-lg font-medium">Cổng thanh toán</h3>
            {/* Danh sách các gateway để bật/tắt */}
        </div>
    );
};

export default PaymentSettingsTab;