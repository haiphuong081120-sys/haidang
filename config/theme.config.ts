/**
 * Theme Configuration
 * Color palette, typography, and design tokens
 */

export const THEME_CONFIG = {
  // Colors - HSL values for CSS variables
  colors: {
    light: {
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      card: '0 0% 100%',
      cardForeground: '222.2 84% 4.9%',
      popover: '0 0% 100%',
      popoverForeground: '222.2 84% 4.9%',
      primary: '221.2 83.2% 53.3%',
      primaryForeground: '210 40% 98%',
      secondary: '210 40% 96.1%',
      secondaryForeground: '222.2 47.4% 11.2%',
      muted: '210 40% 96.1%',
      mutedForeground: '215.4 16.3% 46.9%',
      accent: '210 40% 96.1%',
      accentForeground: '222.2 47.4% 11.2%',
      destructive: '0 84.2% 60.2%',
      destructiveForeground: '210 40% 98%',
      border: '214.3 31.8% 85%', // Enhanced for better visibility
      input: '214.3 31.8% 85%',
      ring: '222.2 84% 4.9%',
    },
    dark: {
      background: '222 47% 11%',
      foreground: '210 40% 98%',
      card: '222 47% 11%',
      cardForeground: '210 40% 98%',
      popover: '222 47% 11%',
      popoverForeground: '210 40% 98%',
      primary: '217.2 91.2% 59.8%',
      primaryForeground: '222.2 47.4% 11.2%',
      secondary: '217.2 32.6% 17.5%',
      secondaryForeground: '210 40% 98%',
      muted: '217.2 32.6% 17.5%',
      mutedForeground: '215 20.2% 70%',
      accent: '217.2 32.6% 17.5%',
      accentForeground: '210 40% 98%',
      destructive: '0 62.8% 30.6%',
      destructiveForeground: '210 40% 98%',
      border: '217.2 32.6% 17.5%',
      input: '217.2 32.6% 17.5%',
      ring: '217.2 91.2% 59.8%',
    },
  },
  
  // Border Radius
  radius: {
    sm: '0.25rem',   // 4px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    '2xl': '1.5rem', // 24px
    full: '9999px',
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  },
  
  // Typography
  typography: {
    fontFamily: {
      sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      mono: "'Fira Code', 'Courier New', monospace",
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem',// 30px
      '4xl': '2.25rem', // 36px
    },
  },
  
  // Spacing (for reference, Tailwind handles this)
  spacing: {
    xs: '0.25rem',  // 4px
    sm: '0.5rem',   // 8px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem',     // 32px
    '2xl': '3rem',  // 48px
  },
  
  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const;
