/**
 * Unit tests for RangeApiClient error handling
 * Tests authentication failures, network errors, timeout handling, and error response mapping
 * Requirements: 7.1, 7.3
 */

import { describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import axios from 'axios';
import { RangeApiClient, type RangeApiError } from '../RangeApiClient.js';
import { type Config } from '../../types/config.js';

// Mock axios module
jest.mock('axios');
const mockedAxios = jest.mocked(axios);

describe('RangeApiClient Error Handling Unit Tests', () => {
  let client: RangeApiClient;
  let mockAxiosInstance: any;
  let config: Config;

  beforeEach(() => {
    jest.clearAllMocks();
    
    config = {
      rangeApiKey: 'test_api_key_123',
      rangeBaseUrl: 'https://app.range.org/api',
      port: 3000,
      logLevel: 'info',
      nodeEnv: 'test'
    };

    mockAxiosInstance = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
      interceptors: {
        request: { use: jest.fn() },
        response: { use: jest.fn() }
      }
    };
    
    mockedAxios.create.mockReturnValue(mockAxiosInstance);
    client = new RangeApiClient(config);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Authentication Failures', () => {
    test('should handle 401 authentication error', async () => {
      const authError = {
        response: {
          status: 401,
          data: { message: 'Invalid API key' },
          headers: {}
        },
        config: { url: '/test' }
      };

      mockAxiosInstance.get.mockRejectedValue(authError);

      await expect(client.get('/test')).rejects.toMatchObject({
        code: 'HTTP_401',
        message: expect.stringContaining('Authentication failed'),
        timestamp: expect.any(String)
      });
    });

    test('should handle 403 forbidden error', async () => {
      const forbiddenError = {
        response: {
          status: 403,
          data: { message: 'Insufficient permissions' },
          headers: {}
        },
        config: { url: '/test' }
      };

      mockAxiosInstance.post.mockRejectedValue(forbiddenError);

      await expect(client.post('/test', {})).rejects.toMatchObject({
        code: 'HTTP_403',
        message: expect.stringContaining('Access forbidden'),
        timestamp: expect.any(String)
      });
    });
  });

  describe('Network Errors', () => {
    test('should handle network timeout', async () => {
      const networkError = {
        request: {},
        message: 'timeout of 30000ms exceeded'
      };

      mockAxiosInstance.get.mockRejectedValue(networkError);

      await expect(client.get('/test')).rejects.toMatchObject({
        code: 'NETWORK_ERROR',
        message: expect.stringContaining('Network error'),
        timestamp: expect.any(String)
      });
    });

    test('should handle connection refused', async () => {
      const connectionError = {
        request: {},
        message: 'connect ECONNREFUSED'
      };

      mockAxiosInstance.get.mockRejectedValue(connectionError);

      await expect(client.get('/test')).rejects.toMatchObject({
        code: 'NETWORK_ERROR',
        message: expect.stringContaining('Unable to reach Range API'),
        timestamp: expect.any(String)
      });
    });
  });

  describe('Rate Limiting', () => {
    test('should handle 429 rate limit error', async () => {
      const rateLimitError = {
        response: {
          status: 429,
          data: { message: 'Rate limit exceeded' },
          headers: {
            'x-ratelimit-remaining': '0',
            'x-ratelimit-reset': '1640995200'
          }
        },
        config: { url: '/test' }
      };

      mockAxiosInstance.get.mockRejectedValue(rateLimitError);

      await expect(client.get('/test')).rejects.toMatchObject({
        code: 'HTTP_429',
        message: expect.stringContaining('Rate limit exceeded'),
        timestamp: expect.any(String)
      });
    });

    test('should identify retryable errors correctly', () => {
      const retryableErrors: RangeApiError[] = [
        { code: 'NETWORK_ERROR', message: 'Network error', timestamp: '2023-01-01T00:00:00Z' },
        { code: 'HTTP_429', message: 'Rate limit', timestamp: '2023-01-01T00:00:00Z' },
        { code: 'HTTP_500', message: 'Server error', timestamp: '2023-01-01T00:00:00Z' },
        { code: 'HTTP_502', message: 'Bad gateway', timestamp: '2023-01-01T00:00:00Z' },
        { code: 'HTTP_503', message: 'Service unavailable', timestamp: '2023-01-01T00:00:00Z' },
        { code: 'HTTP_504', message: 'Gateway timeout', timestamp: '2023-01-01T00:00:00Z' }
      ];

      const nonRetryableErrors: RangeApiError[] = [
        { code: 'HTTP_400', message: 'Bad request', timestamp: '2023-01-01T00:00:00Z' },
        { code: 'HTTP_401', message: 'Unauthorized', timestamp: '2023-01-01T00:00:00Z' },
        { code: 'HTTP_403', message: 'Forbidden', timestamp: '2023-01-01T00:00:00Z' },
        { code: 'HTTP_404', message: 'Not found', timestamp: '2023-01-01T00:00:00Z' }
      ];

      retryableErrors.forEach(error => {
        expect(client.isRetryableError(error)).toBe(true);
      });

      nonRetryableErrors.forEach(error => {
        expect(client.isRetryableError(error)).toBe(false);
      });
    });
  });

  describe('Server Errors', () => {
    test('should handle 500 internal server error', async () => {
      const serverError = {
        response: {
          status: 500,
          data: { error: 'Internal server error' },
          headers: {}
        },
        config: { url: '/test' }
      };

      mockAxiosInstance.get.mockRejectedValue(serverError);

      await expect(client.get('/test')).rejects.toMatchObject({
        code: 'HTTP_500',
        message: expect.stringContaining('Range API server error'),
        timestamp: expect.any(String)
      });
    });

    test('should handle 502 bad gateway error', async () => {
      const badGatewayError = {
        response: {
          status: 502,
          data: {},
          headers: {}
        },
        config: { url: '/test' }
      };

      mockAxiosInstance.get.mockRejectedValue(badGatewayError);

      await expect(client.get('/test')).rejects.toMatchObject({
        code: 'HTTP_502',
        message: expect.stringContaining('temporarily unavailable'),
        timestamp: expect.any(String)
      });
    });

    test('should handle 503 service unavailable error', async () => {
      const serviceUnavailableError = {
        response: {
          status: 503,
          data: {},
          headers: {}
        },
        config: { url: '/test' }
      };

      mockAxiosInstance.get.mockRejectedValue(serviceUnavailableError);

      await expect(client.get('/test')).rejects.toMatchObject({
        code: 'HTTP_503',
        message: expect.stringContaining('temporarily unavailable'),
        timestamp: expect.any(String)
      });
    });
  });

  describe('Client Errors', () => {
    test('should handle 400 bad request error', async () => {
      const badRequestError = {
        response: {
          status: 400,
          data: { message: 'Invalid parameters' },
          headers: {}
        },
        config: { url: '/test' }
      };

      mockAxiosInstance.get.mockRejectedValue(badRequestError);

      await expect(client.get('/test')).rejects.toMatchObject({
        code: 'HTTP_400',
        message: 'Invalid parameters',
        timestamp: expect.any(String)
      });
    });

    test('should handle 404 not found error', async () => {
      const notFoundError = {
        response: {
          status: 404,
          data: { message: 'Endpoint not found' },
          headers: {}
        },
        config: { url: '/test' }
      };

      mockAxiosInstance.get.mockRejectedValue(notFoundError);

      await expect(client.get('/test')).rejects.toMatchObject({
        code: 'HTTP_404',
        message: expect.stringContaining('Resource not found'),
        timestamp: expect.any(String)
      });
    });
  });

  describe('Request Setup Errors', () => {
    test('should handle request configuration errors', async () => {
      const requestError = {
        message: 'Request configuration error'
      };

      mockAxiosInstance.get.mockRejectedValue(requestError);

      await expect(client.get('/test')).rejects.toMatchObject({
        code: 'REQUEST_ERROR',
        message: expect.stringContaining('Request setup error'),
        timestamp: expect.any(String)
      });
    });
  });

  describe('Retry Logic', () => {
    test('should calculate exponential backoff delays correctly', () => {
      const delays = [
        client.getRetryDelay(0), // First retry
        client.getRetryDelay(1), // Second retry
        client.getRetryDelay(2), // Third retry
        client.getRetryDelay(3), // Fourth retry
        client.getRetryDelay(4)  // Fifth retry
      ];

      // Base delays should be approximately: 1s, 2s, 4s, 8s, 16s
      expect(delays[0]).toBeGreaterThanOrEqual(1000);
      expect(delays[0]).toBeLessThan(1200); // With jitter

      expect(delays[1]).toBeGreaterThanOrEqual(2000);
      expect(delays[1]).toBeLessThan(2400);

      expect(delays[2]).toBeGreaterThanOrEqual(4000);
      expect(delays[2]).toBeLessThan(4800);

      expect(delays[3]).toBeGreaterThanOrEqual(8000);
      expect(delays[3]).toBeLessThan(9600);

      expect(delays[4]).toBeGreaterThanOrEqual(16000);
      expect(delays[4]).toBeLessThan(19200);
    });

    test('should cap retry delay at maximum', () => {
      // Test with a very high attempt number
      const delay = client.getRetryDelay(10);
      expect(delay).toBeLessThan(18000); // Max delay (16s) + max jitter (1.6s)
    });
  });

  describe('Rate Limit Extraction', () => {
    test('should extract rate limit information from response headers', async () => {
      const mockResponse = {
        data: { success: true },
        status: 200,
        headers: {
          'x-ratelimit-remaining': '99',
          'x-ratelimit-reset': '1640995200'
        },
        config: { url: '/test' }
      };

      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await client.get('/test');

      expect(result.rateLimit).toEqual({
        remaining: 99,
        resetTime: 1640995200
      });
    });

    test('should handle missing rate limit headers', async () => {
      const mockResponse = {
        data: { success: true },
        status: 200,
        headers: {},
        config: { url: '/test' }
      };

      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await client.get('/test');

      expect(result.rateLimit).toBeUndefined();
    });
  });

  describe('Error Details and Request ID', () => {
    test('should include request ID in error when available', async () => {
      const errorWithRequestId = {
        response: {
          status: 500,
          data: { error: 'Server error' },
          headers: {
            'x-request-id': 'req-12345'
          }
        },
        config: { url: '/test' }
      };

      mockAxiosInstance.get.mockRejectedValue(errorWithRequestId);

      await expect(client.get('/test')).rejects.toMatchObject({
        code: 'HTTP_500',
        requestId: 'req-12345',
        timestamp: expect.any(String)
      });
    });

    test('should include error details in structured format', async () => {
      const detailedError = {
        response: {
          status: 400,
          data: {
            error: 'Validation failed',
            details: {
              field: 'address',
              message: 'Invalid format'
            }
          },
          headers: {}
        },
        config: { url: '/test' }
      };

      mockAxiosInstance.get.mockRejectedValue(detailedError);

      await expect(client.get('/test')).rejects.toMatchObject({
        code: 'HTTP_400',
        details: {
          error: 'Validation failed',
          details: {
            field: 'address',
            message: 'Invalid format'
          }
        },
        timestamp: expect.any(String)
      });
    });
  });
});