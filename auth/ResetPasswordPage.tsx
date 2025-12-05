import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { formatErrorMessage, extractValidationErrors } from '../services/errorHandler';
import { validatePassword } from '../utils/validators';
import { Button } from '@/components/ui/button';
import { PasswordInput } from '../components/PasswordInput';
import { PasswordStrengthIndicator } from '../components/PasswordStrengthIndicator';
import { PATHS } from '../constants/paths';
import { ApiError } from '../types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import * as authService from '../services/authService';

export default function ResetPasswordPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (!token || !email) {
        return (
            <div className="flex items-center justify-center min-h-full p-4">
                <Card className="w-full max-w-md text-center">
                    <CardHeader><CardTitle>Lỗi</CardTitle></CardHeader>
                    <CardContent>
                        <p>Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.</p>
                        <Button asChild className="mt-4">
                            <Link to={PATHS.FORGOT_PASSWORD}>Yêu cầu liên kết mới</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        if (password !== passwordConfirmation) {
            toast.error('Mật khẩu xác nhận không khớp.');
            setIsLoading(false);
            return;
        }

        const passwordValidation = validatePassword(password);
        if (!passwordValidation.isValid) {
            toast.error(passwordValidation.message);
            setIsLoading(false);
            return;
        }

        try {
            await authService.resetPassword({
                token,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });
            toast.success('Đặt lại mật khẩu thành công!');
            setIsSuccess(true);
            setTimeout(() => navigate(PATHS.LOGIN, { replace: true }), 3000);
        } catch (error) {
            const validationErrors = extractValidationErrors(error as ApiError);
            if (validationErrors) {
                setErrors(validationErrors);
            } else {
                toast.error(formatErrorMessage(error as ApiError));
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
         return (
            <div className="flex items-center justify-center min-h-full p-4">
                <Card className="w-full max-w-md text-center">
                    <CardHeader><CardTitle>Thành công</CardTitle></CardHeader>
                    <CardContent>
                        <p>Mật khẩu của bạn đã được đặt lại. Bạn sẽ được chuyển hướng đến trang đăng nhập.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }
    
    return (
        <div className="flex items-center justify-center min-h-full p-4">
            <Card className="w-full max-w-md">
                <CardHeader><CardTitle>Đặt lại mật khẩu</CardTitle></CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <input type="hidden" value={email ?? ''} />
                        <input type="hidden" value={token ?? ''} />
                        <div className="space-y-2">
                            <Label htmlFor="password">Mật khẩu mới</Label>
                            <PasswordInput id="password" value={password} onChange={e => setPassword(e.target.value)} required aria-invalid={!!errors.password} />
                            {errors.password && <small className="text-destructive text-sm">{errors.password}</small>}
                            <PasswordStrengthIndicator password={password} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password-confirmation">Xác nhận mật khẩu mới</Label>
                            <PasswordInput id="password-confirmation" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} required />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={isLoading} className="w-full">
                            {isLoading && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
                            Đặt lại mật khẩu
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}