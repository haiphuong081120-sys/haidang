import { createContext, useState, useEffect, useContext, useCallback, PropsWithChildren } from 'react';
import { toast } from 'sonner';
import { User } from '../types';
// FIX: Removed unused import formatApiErrorForToast
import { AuthModal } from '../components/AuthModal';
import { trackLoginSuccess, trackLoginFailure } from '../analytics/tracking';
import * as authService from './authService';

export type AuthMode = 'login' | 'register' | 'forgot-password';

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    isLoading: boolean;
    logout: () => void;
    refreshUser: () => Promise<void>;
    openAuthModal: (onSuccess?: () => void, mode?: AuthMode) => void;
    closeAuthModal: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const UserProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const [isAuthModalOpen, setAuthModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState<AuthMode>('login');
    const [onSuccessCallback, setOnSuccessCallback] = useState<(() => void) | null>(null);

    const openAuthModal = useCallback((onSuccess?: () => void, mode: AuthMode = 'login') => {
        setAuthMode(mode);
        if (onSuccess) {
            setOnSuccessCallback(() => onSuccess);
        }
        setAuthModalOpen(true);
    }, []);

    const closeAuthModal = useCallback(() => {
        setAuthModalOpen(false);
        setOnSuccessCallback(null);
    }, []);

    const handleLoginSuccess = (loggedInUser: User) => {
        setUser(loggedInUser);
        trackLoginSuccess(loggedInUser);
        if (onSuccessCallback) {
            onSuccessCallback();
        }
        closeAuthModal();
    };
    
    const handleLoginFailure = (email: string, reason: string) => {
        trackLoginFailure(email, reason);
    };

    const logout = useCallback(async () => {
        try {
            await authService.logout();
            setUser(null);
            toast.info('Bạn đã đăng xuất.');
        } catch (error) {
            setUser(null);
            console.error("Logout failed:", error);
        }
    }, []);

    const fetchUser = useCallback(async () => {
        setIsLoading(true);
        try {
            const fetchedUser = await authService.fetchCurrentUser();
            setUser(fetchedUser);
        } catch (error) {
            const axiosError = error as any;
            if (axiosError.response?.status === 401) {
                setUser(null);
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Initial fetch
    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const refreshUser = useCallback(async () => {
        await fetchUser();
    }, [fetchUser]);

    const value: UserContextType = {
        user,
        setUser,
        isLoading,
        logout,
        refreshUser,
        openAuthModal,
        closeAuthModal,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
            {isAuthModalOpen && (
                <AuthModal
                    initialMode={authMode}
                    onClose={closeAuthModal}
                    onLoginSuccess={handleLoginSuccess}
                    onLoginFailure={handleLoginFailure}
                />
            )}
        </UserContext.Provider>
    );
};