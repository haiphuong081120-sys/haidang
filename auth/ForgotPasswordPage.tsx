import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../services/UserContext';
import { PATHS } from '../constants/paths';

/**
 * This page component now acts as a trigger to open the authentication modal in forgot-password mode.
 */
export default function ForgotPasswordPage() {
    const { user, isLoading, openAuthModal } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoading) return;

        if (user) {
            navigate(PATHS.HOME, { replace: true });
            return;
        }
        
        openAuthModal(undefined, 'forgot-password');
        navigate(PATHS.HOME, { replace: true });
        
    }, [user, isLoading, openAuthModal, navigate]);

    return null;
}