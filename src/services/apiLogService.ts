export interface ApiLogEntry {
    id: number;
    timestamp: string;
    method: string;
    path: string;
    payload?: any;
}

type LogListener = (log: ApiLogEntry) => void;

let listeners: LogListener[] = [];
let logCounter = 0;

/**
 * Performs a shallow copy of an object, which is sufficient for logging purposes.
 * This is much faster than JSON.parse(JSON.stringify()) and avoids issues with
 * circular references, functions, and other non-serializable values.
 * @param obj The object to copy
 * @returns A shallow copy of the object
 */
const shallowCopy = (obj: any): any => {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    if (Array.isArray(obj)) {
        return [...obj];
    }
    return { ...obj };
};

/**
 * Gửi một mục log mới đến tất cả các listener đang lắng nghe.
 * Optimized: Uses shallow copy instead of expensive JSON serialization.
 * @param method Phương thức HTTP (e.g., 'GET', 'POST')
 * @param path Đường dẫn endpoint
 * @param payload Dữ liệu gửi đi (request body)
 */
export const logRequest = (method: string, path: string, payload?: any) => {
    const newLog: ApiLogEntry = {
        id: logCounter++,
        timestamp: new Date().toISOString(),
        method,
        path,
        payload: payload ? shallowCopy(payload) : undefined,
    };
    
    listeners.forEach(listener => listener(newLog));
};

/**
 * Đăng ký một listener để nhận các mục log mới.
 * @param callback Hàm sẽ được gọi mỗi khi có log mới.
 * @returns Một hàm để hủy đăng ký (unsubscribe).
 */
export const subscribe = (callback: LogListener): (() => void) => {
    listeners.push(callback);
    
    // Trả về hàm để gỡ bỏ listener
    return () => {
        listeners = listeners.filter(l => l !== callback);
    };
};
