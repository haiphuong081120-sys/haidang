import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';

import { AppRoutes } from './routes/AppRoutes';
import { UserProvider } from './services/UserContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { PageTitleProvider } from './contexts/PageTitleContext';
import { FilterProvider } from './contexts/FilterContext';
import { ImageSettingsProvider } from './contexts/ImageSettingsContext';
import { ApiLogProvider } from './contexts/ApiLogContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { TooltipProvider } from './components/ui/tooltip';

function App() {
    return (
        <BrowserRouter
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}
        >
            <ErrorBoundary>
                <ThemeProvider>
                    <LanguageProvider>
                        <UserProvider>
                            <PageTitleProvider>
                                <FilterProvider>
                                    <ImageSettingsProvider>
                                        <ApiLogProvider>
                                            <TooltipProvider>
                                                <AppRoutes />
                                                <Toaster 
                                                    richColors 
                                                    position="bottom-right" 
                                                    closeButton
                                                    toastOptions={{
                                                        classNames: {
                                                            toast: 'custom-toast border-l-4 rounded-lg shadow-lg',
                                                            title: 'text-base font-semibold',
                                                            description: 'text-sm',
                                                        },
                                                    }}
                                                />
                                            </TooltipProvider>
                                        </ApiLogProvider>
                                    </ImageSettingsProvider>
                                </FilterProvider>
                            </PageTitleProvider>
                        </UserProvider>
                    </LanguageProvider>
                </ThemeProvider>
            </ErrorBoundary>
        </BrowserRouter>
    );
}

export default App;