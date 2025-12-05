import { toast } from 'sonner';
import { AlertTriangle } from 'lucide-react';

interface RetryToastProps {
    toastId: string | number;
    message: string;
    onRetry: () => void;
}

export const RetryToast = ({ toastId, message, onRetry }: RetryToastProps) => {
    const handleRetry = () => {
        // Thực thi hàm callback để thử lại request
        onRetry();
        // Đóng toast sau khi bấm
        toast.dismiss(toastId);
    };

    return (
        // Áp dụng các class để trông giống toast lỗi mặc định của sonner
        // - Thêm border-l-4 và border-red-500 để có viền đỏ bên trái.
        // - Các class khác giữ nguyên cấu trúc layout.
        <div className="flex w-full items-start gap-3 border-l-4 border-red-500 p-4">
            <div className="flex-shrink-0 text-red-500 pt-0.5">
                <AlertTriangle className="h-5 w-5" />
            </div>
            <div className="flex-grow">
                {/* Sử dụng các class title và description từ App.tsx để đồng bộ */}
                <p className="text-base font-semibold">{message}</p>
                <div className="mt-2 flex gap-4">
                    <button onClick={handleRetry} className="text-sm font-bold text-blue-600 hover:underline">Thử lại</button>
                    <button onClick={() => toast.dismiss(toastId)} className="text-sm text-gray-500 hover:underline">Bỏ qua</button>
                </div>
            </div>
        </div>
    );
};