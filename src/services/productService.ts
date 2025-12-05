import apiClient from './apiClient';
import { Product } from '../types';

interface ProductFilters {
    search?: string;
    category?: string;
    country?: string;
    sortBy?: string;
    priceMin?: number;
    priceMax?: number;
    inStockOnly?: boolean;
    page?: number;
    limit?: number;
}

interface PaginatedProductsResponse {
    data: Product[];
    totalPages: number;
    totalItems: number;
    currentPage: number;
}


/**
 * Fetches products from the API based on the provided filters.
 * The backend handles the filtering, searching, and sorting logic.
 */
export const fetchProducts = async (filters: ProductFilters): Promise<PaginatedProductsResponse> => {
    try {
        const response = await apiClient.get('/products', {
            params: {
                search: filters.search || undefined,
                category: filters.category === 'all' ? undefined : filters.category,
                country: filters.country === 'all' ? undefined : filters.country,
                sortBy: filters.sortBy === 'default' ? undefined : filters.sortBy,
                price_min: filters.priceMin,
                price_max: filters.priceMax,
                in_stock: filters.inStockOnly ? true : undefined,
                page: filters.page,
                limit: filters.limit,
            }
        }); 
        return response.data;
    } catch (error) {
        console.error("Failed to fetch products:", error);
        throw error;
    }
};


/**
 * Fetches the available filter options (countries, categories) for products.
 */
export const fetchProductFilterOptions = async (): Promise<{ uniqueCountries: string[], uniqueCategories: string[] }> => {
     try {
        const response = await apiClient.get('/products/filters'); 
        return response.data;
    } catch (error) {
        console.error("Failed to fetch product filter options:", error);
        throw error;
    }
}