import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { formatErrorMessage } from '../services/errorHandler';
import { PATHS } from '../constants/paths';
import { Spinner } from '@/components/ui/spinner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ApiError } from '../types';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import apiClient from '@/services/apiClient';

export default function VerifyEmailPage() {
    const [status, setStatus] = useState<'verifying' | 'success' | 'failed'>('verifying');
    const [message, setMessage] = useState('Đang xác thực email của bạn...');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const verify = async () => {
            const url = `${location.pathname}${location.search}`;
            if (!location.search) {
                setStatus('failed');
                setMessage('Link xác thực không hợp lệ.');
                return;
            }
            try {
                await apiClient.get(url); 
                setStatus('success');
                setMessage('Xác thực email thành công! Bạn sẽ được chuyển hướng.');
                toast.success('Xác thực email thành công!');
                setTimeout(() => navigate(PATHS.HOME, { replace: true }), 3000);
            } catch (error) {
                console.error(error);
                setStatus('failed');
                setMessage(formatErrorMessage(error as ApiError, 'Xác thực thất bại.'));
            }
        };
        verify();
    }, [location, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-background">
            <Card className="w-full max-w-md text-center rounded-3xl shadow-xl">
                <CardHeader>
                    <CardTitle>{status === 'success' ? 'Thành công' : 'Xác thực'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 py-6">
                    {status === 'verifying' && <Spinner className="h-12 w-12 text-primary mx-auto" />}
                    {status === 'success' && <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />}
                    {status === 'failed' && <XCircle className="h-16 w-16 text-red-500 mx-auto" />}
                    <p className="text-muted-foreground">{message}</p>
                    {status !== 'verifying' && (
                         <Button asChild className="rounded-2xl"><Link to={PATHS.HOME}>Về trang chủ</Link></Button>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}