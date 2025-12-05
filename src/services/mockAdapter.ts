import MockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from 'axios';
import { mockUser } from './mockData';

export const setupMocks = (apiClient: AxiosInstance) => {
    const mock = new MockAdapter(apiClient, { delayResponse: 500 });
    const API_PREFIX = '/api/v1';

    mock.onGet(`${API_PREFIX}/me`).reply(200, { user: mockUser });

    // Mock generation of API key
    mock.onPost(`${API_PREFIX}/me/api-key`).reply(200, {
        apiKey: 'sk_test_' + Math.random().toString(36).substr(2, 18) + Math.random().toString(36).substr(2, 18),
        message: 'API Key generated successfully'
    });

    // Default pass-through
    mock.onAny().passThrough();
};