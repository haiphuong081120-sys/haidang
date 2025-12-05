// Định nghĩa cấu trúc dữ liệu cho một Giao dịch Nạp tiền (Deposit)
// Tương đương với file: app/Models/Deposit.php trong Laravel

export interface Deposit {
    id: string;                      // Ví dụ: 'dep_123xyz'
    user_id: number;                 // Khóa ngoại tới bảng users
    amount: number;                  // Số tiền nạp
    method: string;                  // Phương thức thanh toán (ví dụ: 'Vietcombank', 'Momo')
    transaction_code?: string | null;// Mã giao dịch từ ngân hàng/ví
    status: 'Hoàn thành' | 'Đang chờ' | 'Thất bại'; // Trạng thái giao dịch
    created_at: string;              // ISO 8601 datetime string
    updated_at: string;              // ISO 8601 datetime string
}
