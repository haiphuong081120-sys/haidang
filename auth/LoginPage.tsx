import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../services/UserContext';
import { PATHS } from '../constants/paths';
import { AuthModal } from '../components/AuthModal';
import { Spinner } from '../components/ui/spinner';

/**
 * Login Page - Displays login form with enhanced UI
 * Redirects to intended page after successful login
 */
export default function LoginPage() {
    const { user, isLoading, setUser } = useUser();
    const navigate = useNavigate();
    const location = useLocation();

    // Get the page user was trying to access before login
    const from = (location.state as { from?: Location })?.from?.pathname || PATHS.HOME;

    useEffect(() => {
        // Wait for user status to be determined
        if (isLoading) return;

        // If user is already logged in, redirect them to intended page or home
        if (user) {
            navigate(from, { replace: true });
            return;
        }
    }, [user, isLoading, navigate, from]);

    // Show loading spinner while checking user status
    if (isLoading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-background">
                <Spinner className="h-10 w-10" />
            </div>
        );
    }

    // If user is authenticated, don't render login form (will redirect)
    if (user) {
        return null;
    }

    // Render login page with enhanced background and styling
    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            
            <div className="w-full max-w-md relative z-10">
                {/* Header section */}
                <div className="mb-8 text-center">
                    <div className="inline-block p-3 bg-primary/10 rounded-lg mb-4">
                        <span className="text-3xl">🔐</span>
                    </div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
                    <p className="text-muted-foreground">Đăng nhập vào tài khoản của bạn để tiếp tục</p>
                </div>

                {/* Auth Modal */}
                <AuthModal
                    initialMode="login"
                    onClose={() => {
                        // If user closes modal, redirect to home
                        navigate(PATHS.HOME);
                    }}
                    onLoginSuccess={(loggedInUser) => {
                        // Set user in context first
                        setUser(loggedInUser);
                        // Then redirect to intended page
                        navigate(from, { replace: true });
                    }}
                    onLoginFailure={() => {
                        // Login failed, stay on login page
                    }}
                />

                {/* Footer info */}
                <div className="mt-6 text-center text-sm text-muted-foreground">
                    <p>Không có tài khoản? <a href="/register" className="text-primary hover:underline font-semibold">Đăng ký ngay</a></p>
                </div>
            </div>
        </div>
    );
}
