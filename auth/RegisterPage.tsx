import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../services/UserContext';
import { PATHS } from '../constants/paths';
import { AuthModal } from '../components/AuthModal';
import { Spinner } from '../components/ui/spinner';

/**
 * Register Page - A dedicated page for user registration with enhanced UI
 * Shows the auth modal in register mode
 */
export default function RegisterPage() {
    const { user, isLoading, setUser } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        // Wait for user status to be determined
        if (isLoading) return;

        // If user is already logged in, redirect them to home
        if (user) {
            navigate(PATHS.HOME, { replace: true });
            return;
        }
    }, [user, isLoading, navigate]);

    // Show loading spinner while checking user status
    if (isLoading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-background">
                <Spinner className="h-10 w-10" />
            </div>
        );
    }

    // If user is authenticated, don't render register form
    if (user) {
        return null;
    }

    // Render register page with enhanced background and styling
    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-1/4 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            
            <div className="w-full max-w-md relative z-10">
                {/* Header section */}
                <div className="mb-8 text-center">
                    <div className="inline-block p-3 bg-primary/10 rounded-lg mb-4">
                        <span className="text-3xl">✨</span>
                    </div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">Join Us Today</h1>
                    <p className="text-muted-foreground">Tạo tài khoản mới để bắt đầu trải nghiệm</p>
                </div>

                {/* Auth Modal in signup mode */}
                <AuthModal
                    initialMode="register"
                    onClose={() => {
                        // If user closes modal, redirect to home
                        navigate(PATHS.HOME);
                    }}
                    onLoginSuccess={(loggedInUser) => {
                        setUser(loggedInUser);
                        // After successful registration, redirect to home
                        navigate(PATHS.HOME, { replace: true });
                    }}
                    onLoginFailure={() => {
                        // Registration failed, stay on register page
                    }}
                />

                {/* Footer info */}
                <div className="mt-6 text-center text-sm text-muted-foreground">
                    <p>Đã có tài khoản? <a href="/login" className="text-primary hover:underline font-semibold">Đăng nhập ngay</a></p>
                </div>
            </div>
        </div>
    );
}