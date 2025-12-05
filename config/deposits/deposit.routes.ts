// Mô tả các tuyến API cho chức năng Nạp tiền (Deposit)
// Tương đương với file: routes/api.php

// === TUYẾN NGƯỜI DÙNG (USER ROUTES) ===
// Prefix: /api/v1
// Middleware: auth:sanctum

export const UserDepositRoutes = {
    // [GET] /deposits
    // Lấy lịch sử nạp tiền của người dùng đang đăng nhập.
    index: {
        method: 'GET',
        path: '/deposits',
        controller: 'DepositController@index',
        description: 'Lấy danh sách các giao dịch nạp tiền của người dùng, có phân trang.',
        queryParams: [
            { name: 'page', type: 'number', description: 'Số trang' },
            { name: 'limit', type: 'number', description: 'Số mục mỗi trang' },
        ]
    },
};

// === TUYẾN ADMIN (ADMIN ROUTES) ===
// Prefix: /api/v1/admin
// Middleware: auth:sanctum, role:admin

export const AdminDepositRoutes = {
     // [GET] /admin/deposits
    // Lấy toàn bộ lịch sử nạp tiền của tất cả người dùng.
    index: {
        method: 'GET',
        path: '/admin/deposits',
        controller: 'Admin/DepositController@index',
        description: 'Lấy danh sách tất cả giao dịch nạp tiền, có phân trang và tìm kiếm.',
        queryParams: [
             { name: 'search', type: 'string', description: 'Tìm kiếm theo email người dùng hoặc mã giao dịch' },
             { name: 'status', type: 'string', description: 'Lọc theo trạng thái' },
        ]
    },

    // [PUT] /admin/deposits/{id}
    // Cập nhật trạng thái một giao dịch nạp tiền (xác nhận thủ công).
    update: {
        method: 'PUT',
        path: '/admin/deposits/{id}',
        controller: 'Admin/DepositController@update',
        description: 'Cập nhật trạng thái của một giao dịch, ví dụ: từ đang chờ sang hoàn thành.',
        requestBody: {
            status: "'Hoàn thành' | 'Thất bại'",
        }
    },
};
