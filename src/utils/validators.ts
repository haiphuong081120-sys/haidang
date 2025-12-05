export const validateEmail = (email: string): { isValid: boolean; message: string } => {
    if (!email) {
        return { isValid: false, message: 'Vui lòng nhập email.' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { isValid: false, message: 'Địa chỉ email không hợp lệ.' };
    }
    return { isValid: true, message: '' };
};

export const validatePassword = (password: string): { isValid: boolean; message: string; } => {
    const messages = [];
    if (password.length < 8) {
        messages.push('phải có ít nhất 8 ký tự.');
    }
    if (!/[a-z]/.test(password)) {
        messages.push('phải chứa chữ thường.');
    }
    if (!/[A-Z]/.test(password)) {
        messages.push('phải chứa chữ hoa.');
    }
    if (!/[0-9]/.test(password)) {
        messages.push('phải chứa chữ số.');
    }

    return {
        isValid: messages.length === 0,
        message: messages.length > 0 ? `Mật khẩu yếu: ${messages.join(' ')}` : '',
    };
};
