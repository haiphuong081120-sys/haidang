import { toast } from 'sonner';
import { type ExternalToast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { TOptions } from 'i18next';

/**
 * Các tùy chọn mặc định cho tất cả các toast.
 * Bạn có thể tùy chỉnh thêm ở đây.
 */
const defaultToastOptions: ExternalToast = {
    // Ví dụ: duration: 5000,
};

/**
 * Hook tùy chỉnh để chuẩn hóa việc gọi toast trong toàn bộ ứng dụng.
 * Cung cấp các phương thức tiện ích như success, error, và promise.
 * 
 * @returns Một object chứa các hàm để hiển thị các loại toast khác nhau.
 */
export const useAppToast = () => {
    const { t } = useTranslation();

    /**
     * Hiển thị một thông báo thành công.
     * @param messageKey - Key của chuỗi dịch thuật.
     * @param tOptions - Object chứa các biến để truyền vào chuỗi dịch.
     * @param toastOptions - Các tùy chọn bổ sung từ Sonner.
     */
    const success = (messageKey: string, tOptions?: TOptions, toastOptions?: ExternalToast) => {
        toast.success(t(messageKey, tOptions), { ...defaultToastOptions, ...toastOptions });
    };

    /**
     * Hiển thị một thông báo lỗi.
     * @param messageKey - Key của chuỗi dịch thuật.
     * @param tOptions - Object chứa các biến để truyền vào chuỗi dịch.
     * @param toastOptions - Các tùy chọn bổ sung từ Sonner.
     */
    const error = (messageKey: string, tOptions?: TOptions, toastOptions?: ExternalToast) => {
        toast.error(t(messageKey, tOptions), { ...defaultToastOptions, ...toastOptions });
    };

    /**
     * Hiển thị một thông báo lỗi không tự động đóng lại.
     * Yêu cầu người dùng phải tự tay bấm nút đóng.
     * @param messageKey - Key của chuỗi dịch thuật.
     * @param tOptions - Object chứa các biến để truyền vào chuỗi dịch.
     * @param toastOptions - Các tùy chọn bổ sung từ Sonner.
     */
    const persistentError = (messageKey: string, tOptions?: TOptions, toastOptions?: ExternalToast) => {
        toast.error(t(messageKey, tOptions), {
            ...defaultToastOptions,
            duration: Infinity, // <-- Ngăn toast tự động đóng
            ...toastOptions,
        });
    };

    /**
     * Hiển thị thông báo dựa trên trạng thái của một Promise.
     * @param promise - Promise cần theo dõi.
     * @param messages - Các thông báo cho trạng thái loading, success, và error.
     * @param options - Các tùy chọn bổ sung từ Sonner.
     */
    const promise = <T>(
        promise: Promise<T>,
        messages: {
            loading: string;
            success: string | ((data: T) => string | { key: string; options?: TOptions });
            error: string | ((err: any) => string | { key: string; options?: TOptions });
        },
        options?: ExternalToast
    ) => {
        // Dịch các thông báo trước khi truyền vào toast.promise
        const translatedMessages = {
            loading: t(messages.loading),
            success: (data: T) => {
                const result = typeof messages.success === 'function' ? messages.success(data) : messages.success;
                if (typeof result === 'object') {
                    return t(result.key, result.options);
                }
                return t(result);
            },
            error: (err: any) => {
                const result = typeof messages.error === 'function' ? messages.error(err) : messages.error;
                if (typeof result === 'object') {
                    return t(result.key, result.options);
                }
                return t(result);
            },
        };
        toast.promise(promise, { ...translatedMessages, ...defaultToastOptions, ...options });
    };

    return { success, error, persistentError, promise, custom: toast.custom, dismiss: toast.dismiss };
};