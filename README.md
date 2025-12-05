# Hải Đăng Meta - Facebook Account Store

**Frontend:**
- React 19.2.0
- TypeScript 5.5.3
- Tailwind CSS 3.4.3
- shadcn/ui (Radix UI components)
- React Router 6.24.1
- Axios (API client)
- Sonner (Toast notifications)
- Framer Motion (Animations)

**Backend:**
- Laravel 11
- Sanctum (Authentication)
- MySQL (Database)

**Build Tools:**
- Vite 7.2.2
- ESLint
- PostCSS

## 📦 Installation

**Prerequisites:** Node.js 18+, PHP 8.2+, Composer

### Development Setup

1. Clone the repository:
```bash
git clone https://github.com/haidangmeta-ops/frontend-react-spa.git
cd frontend-react-spa
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd backend
composer install
```

4. Configure environment:

**Frontend (.env.development):**
```env
VITE_API_BASE_URL=http://localhost:8000
```

**Backend (backend/.env):**
```env
APP_URL=http://localhost:8000
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
SANCTUM_STATEFUL_DOMAINS=localhost:3000
SESSION_DOMAIN=localhost
```

5. Run database migrations:
```bash
cd backend
php artisan migrate
php artisan db:seed
```

6. Start development servers:

**Terminal 1 - Frontend:**
```bash
npm run dev
```
Frontend will run at `http://localhost:3000`

**Terminal 2 - Backend:**
```bash
cd backend
php artisan serve
```
Backend will run at `http://localhost:8000`

### Production Build

1. Build the React app:
```bash
npm run build
```
This builds the React app into `backend/public/`

2. Deploy the `backend/` directory to your server

3. Configure your web server to point to `backend/public/`

4. Set up production environment variables

See [LARAVEL_INTEGRATION.md](./LARAVEL_INTEGRATION.md) for detailed deployment instructions.

## 🔧 Development

### Available Scripts

- `npm run dev` - Start Vite dev server (port 3000)
- `npm run build` - Build for production (outputs to backend/public)
- `npm run build:prod` - Build with production mode
- `npm run build:dev` - Build with development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run laravel:build` - Build and copy assets to Laravel

### Code Organization

**Adding a new API endpoint:**

1. Add endpoint to `src/config/endpoints.config.ts`:
```typescript
export const API_ENDPOINTS = {
  orders: {
    list: '/orders',
    detail: (id: string) => `/orders/${id}`,
  }
}
```

2. Create API service `src/api/orders.api.ts`:
```typescript
import apiClient from '../services/apiClient';
import { API_ENDPOINTS } from '../config';

export const ordersApi = {
  async getOrders(params?: any) {
    const response = await apiClient.get(API_ENDPOINTS.orders.list, { params });
    return response.data;
  }
}
```

3. Use in components with `useApi` hook:
```typescript
import { useApi } from '../hooks/useApi';
import { ordersApi } from '../api/orders.api';

const { data, isLoading, execute } = useApi(ordersApi.getOrders);
```

## 🌐 Environment Variables

### Frontend

| Variable | Description | Development | Production |
|----------|-------------|-------------|------------|
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:8000` | Empty (relative URLs) |

### Backend

| Variable | Description |
|----------|-------------|
| `APP_URL` | Application URL |
| `SANCTUM_STATEFUL_DOMAINS` | Domains for Sanctum cookies |
| `SESSION_DOMAIN` | Session cookie domain |

## 📝 Documentation

**Quick Start Guides:**
- [LARAVEL_INTEGRATION.md](./LARAVEL_INTEGRATION.md) - Laravel + React integration guide ⭐ **START HERE**
- [API_SETUP_GUIDE.md](./API_SETUP_GUIDE.md) - **NEW** - Complete API key configuration guide
- [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) - **NEW** - Production deployment checklist

**Troubleshooting & Maintenance:**
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - **NEW** - Common issues and solutions
- [ARCHITECTURE.md](./ARCHITECTURE.md) - **NEW** - Complete system architecture overview

**Technical Documentation:**
- [PERFORMANCE_NOTES.md](./PERFORMANCE_NOTES.md) - Performance optimizations details
- [PERFORMANCE_SUMMARY.md](./PERFORMANCE_SUMMARY.md) - Performance improvements summary
- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - Frontend architecture & organization
- [NOTIFICATION_AND_RATE_LIMITING.md](./NOTIFICATION_AND_RATE_LIMITING.md) - Notification system & rate limiting
- [INTEGRATION_TESTING_GUIDE.md](./INTEGRATION_TESTING_GUIDE.md) - Testing scenarios & procedures
- [DEVELOPMENT_SETUP.md](./DEVELOPMENT_SETUP.md) - Local development setup
- [BACKEND_SETUP_GUIDE.md](./BACKEND_SETUP_GUIDE.md) - Backend configuration

## 🚀 Deployment

1. Build the React app:
```bash
npm run build
```

2. Deploy the `backend/` directory to your server

3. Point web server to `backend/public/`

4. Ensure `.htaccess` is configured for Laravel routing

5. Set production environment variables

For detailed deployment instructions, see [LARAVEL_INTEGRATION.md](./LARAVEL_INTEGRATION.md).

## 🔒 API Routes

- `/` - React SPA (all routes except `/api` and `/sanctum`)
- `/api/v1/*` - Laravel API endpoints
- `/api/health` - API health check
- `/sanctum/csrf-cookie` - CSRF token endpoint

## ⚡ Performance

The application includes several performance optimizations:

- Memoized currency formatters (~10x faster)
- Optimized array operations (6x reduction in iterations)
- Cached markdown parsing (near-instant for repeated content)
- Debounced localStorage writes
- Code splitting and lazy loading
- Optimized animations with capped delays

**Build Size:**
- Main bundle: 73.55 KB (21.06 KB gzipped)
- Vendor bundle: 2.45 MB (745.22 KB gzipped)
- Total: ~2.5 MB uncompressed, ~766 KB gzipped

## 📝 License

MIT License - see [LICENSE](LICENSE) for details

## 👥 Contributors

- Hải Đăng Meta Team

## 🔗 Links

- Live Site: [https://haidangmeta.com](https://haidangmeta.com)
- API Health: [https://haidangmeta.com/api/v1/health](https://haidangmeta.com/api/v1/health)
- Documentation: [LARAVEL_INTEGRATION.md](./LARAVEL_INTEGRATION.md)
