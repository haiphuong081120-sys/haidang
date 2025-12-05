// Memoize formatters to avoid recreating them on every call
const currencyFormatters = new Map<string, Intl.NumberFormat>();

// Import API_CONFIG
import { API_CONFIG } from './config/api.config';
// Import error handling functions
import { formatErrorMessage } from './services/errorHandler';

// Re-export for backward compatibility and to provide a consistent naming scheme
export { extractValidationErrors as getApiValidationErrors } from './services/errorHandler';

const getCurrencyFormatter = (currency: string): Intl.NumberFormat => {
    if (!currencyFormatters.has(currency)) {
        currencyFormatters.set(
            currency,
            new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: currency,
            })
        );
    }
    return currencyFormatters.get(currency)!;
};

/**
 * Formats a number as Vietnamese Dong (VND).
 * Optimized: Reuses Intl.NumberFormat instances instead of creating new ones.
 * @param amount The number to format.
 * @param currency The currency code.
 * @returns A formatted currency string.
 */
export const formatCurrency = (amount: number, currency = 'VND'): string => {
    return getCurrencyFormatter(currency).format(amount);
};

// Re-export formatApiErrorForToast as a wrapper around formatErrorMessage
// Ideally, components should import directly from errorHandler.ts
export const formatApiErrorForToast = (error: any, defaultMessage = 'Đã có lỗi xảy ra.'): string => {
    return formatErrorMessage(error, defaultMessage);
};

/**
 * Converts a hex color string to an HSL color string for CSS variables.
 * @param hex The hex color string (e.g., '#RRGGBB').
 * @returns The HSL string (e.g., '240 6% 90%').
 */
export const hexToHSL = (hex: string): string => {
  if (!hex || typeof hex !== 'string') return '';
  
  // Remove '#'
  let H = hex.replace('#', '');
  if (H.length === 3) {
    H = H.split('').map(c => c + c).join('');
  }
  
  if (H.length !== 6) {
    return '';
  }

  const r = parseInt(H.substring(0, 2), 16) / 255;
  const g = parseInt(H.substring(2, 4), 16) / 255;
  const b = parseInt(H.substring(4, 6), 16) / 255;

  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;
  let h = 0;
  let s = 0;
  let l = 0;

  if (delta === 0) h = 0;
  else if (cmax === r) h = ((g - b) / delta) % 6;
  else if (cmax === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);
  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return `${h} ${s}% ${l}%`;
};

/**
 * Converts a string into a URL-friendly slug.
 * @param text The string to slugify.
 * @returns A slugified string.
 */
export const slugify = (text: string): string => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD') // separate accent from letter
    .replace(/[\u0300-\u036f]/g, '') // remove all separated accents
    .replace(/đ/g, 'd') // convert đ to d
    .trim()
    .replace(/\s+/g, '-') // replace spaces with -
    .replace(/[^\w-]+/g, '') // remove all non-word chars except hyphens
    .replace(/--+/g, '-'); // replace multiple hyphens with a single one
};


/**
 * Creates a meta description from markdown content.
 * It strips markdown formatting and truncates the text.
 * @param markdown The markdown content.
 * @param length The desired max length of the description.
 * @returns A plain text string for the meta description.
 */
export const createMetaDescription = (markdown: string, length = 160): string => {
  if (!markdown) return '';
  
  const plainText = markdown
    .replace(/!\[.*?\]\(.*?\)/g, '') // remove images
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // replace links with their text
    .replace(/^#+\s/gm, '') // remove headings
    .replace(/^>\s/gm, '') // remove blockquotes
    .replace(/^[-*+]\s/gm, '') // remove list items
    .replace(/(\*\*|__)(.*?)\1/g, '$2') // remove bold
    .replace(/(\*|_)(.*?)\1/g, '$2') // remove italic
    .replace(/`{1,3}(.*?)`{1,3}/g, '$1') // remove code
    .replace(/(\r\n|\n|\r)/gm, ' ') // replace newlines with spaces
    .replace(/\s+/g, ' ') // collapse whitespace
    .trim();

  if (plainText.length <= length) {
    return plainText;
  }
  
  const truncated = plainText.substring(0, length);
  // find last space to avoid cutting words
  const lastSpace = truncated.lastIndexOf(' ');
  return (lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated).trim() + '...';
};

/**
 * Chuyển đổi đường dẫn file từ backend thành URL hiển thị được trên frontend.
 * Tận dụng symlink 'storage' trong public_html.
 */
export const getFileUrl = (pathOrUrl?: string | null): string => {
    if (!pathOrUrl) return '';
    
    // Nếu là URL đầy đủ (http/https), trả về nguyên vẹn (ví dụ ảnh từ Google, Facebook)
    if (pathOrUrl.startsWith('http')) {
        return pathOrUrl;
    }

    // Nếu đường dẫn đã bắt đầu bằng /storage, trả về nguyên vẹn
    if (pathOrUrl.startsWith('/storage')) {
        return pathOrUrl;
    }

    // Nếu là đường dẫn tương đối (ví dụ: uploads/file.jpg), thêm prefix /storage/
    // API_CONFIG.storageURL là chuỗi rỗng '' trong setup này
    const baseUrl = API_CONFIG.storageURL !== undefined ? API_CONFIG.storageURL : '';
    
    // Xử lý dấu gạch chéo
    const cleanPath = pathOrUrl.startsWith('/') ? pathOrUrl.slice(1) : pathOrUrl;
    
    return `${baseUrl}/storage/${cleanPath}`;
};