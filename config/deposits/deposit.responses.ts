
export const UserGetDepositsResponse = {
    "current_page": 1,
    "data": [
        {
            "id": "dep_123xyz",
            "user_id": 1,
            "amount": 100000,
            "method": "Vietcombank",
            "transaction_code": "FT123456",
            "status": "Hoàn thành",
            "created_at": "2023-10-27T11:00:00.000000Z",
            "updated_at": "2023-10-27T11:01:00.000000Z"
        }
    ]
};

export const AdminGetDepositsResponse = {
    ...UserGetDepositsResponse,
    "data": [
        {
            "id": "dep_123xyz",
            "user_id": 1,
            "user_name": "John Doe",
            "user_email": "john.doe@example.com",
            "amount": 100000,
            "method": "Vietcombank",
            "transaction_code": "FT123456",
            "status": "Hoàn thành",
            "created_at": "2023-10-27T11:00:00.000000Z",
            "updated_at": "2023-10-27T11:01:00.000000Z"
        }
    ]
}
