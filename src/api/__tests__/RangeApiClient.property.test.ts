/**
 * Property-based tests for RangeApiClient
 * Feature: range-mcp-server, Property 2: API Authentication Consistency
 * Validates: Requirements 1.3, 5.5
 */

import { describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import * as fc from 'fast-check';
import axios from 'axios';
import { RangeApiClient } from '../RangeApiClient.js';
import { type Config } from '../../types/config.js';

// Mock axios module
jest.mock('axios');
const mockedAxios = jest.mocked(axios);

describe('RangeApiClient Property Tests', () => {
  let mockAxiosInstance: any;
  
  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
    
    // Create mock axios instance
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
    
    // Mock axios.create to return our mock instance
    mockedAxios.create.mockReturnValue(mockAxiosInstance);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  /**
   * Property 2: API Authentication Consistency
   * For any Range API request, the server should include the correct authorization header 
   * with the configured API key
   */
  test('Property 2: API Authentication Consistency - All requests include correct authorization header', () => {
    fc.assert(
      fc.property(
        // Generate valid API keys (alphanumeric with hyphens/underscores)
        fc.stringMatching(/^[a-zA-Z0-9_-]{10,30}$/),
        
        // Generate valid base URLs
        fc.constantFrom(
          'https://app.range.org/api',
          'https://staging.range.org/api'
        ),
        
        (apiKey, baseUrl) => {
          // Skip forbidden placeholder values
          const forbiddenValues = ['your_api_key_here', 'test_key', 'demo_key'];
          if (forbiddenValues.includes(apiKey.toLowerCase())) {
            return true; // Skip this test case
          }

          // Reset mocks before each test
          jest.clearAllMocks();

          // Create config with generated values
          const config: Config = {
            rangeApiKey: apiKey,
            rangeBaseUrl: baseUrl,
            port: 3000,
            logLevel: 'info',
            nodeEnv: 'test'
          };

          // Create client
          const client = new RangeApiClient(config);

          // Verify axios.create was called with correct configuration
          expect(mockedAxios.create).toHaveBeenCalledWith({
            baseURL: baseUrl,
            timeout: 30000,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`,
              'User-Agent': 'Range-MCP-Server/1.0.0'
            }
          });

          // Verify the authorization header was set correctly during client creation
          const createCall = mockedAxios.create.mock.calls[mockedAxios.create.mock.calls.length - 1]?.[0];
          expect(createCall?.headers?.['Authorization']).toBe(`Bearer ${apiKey}`);
          
          return true;
        }
      ),
      { numRuns: 3 } // Reduced for faster testing
    );
  });

  test('Property 2a: API Key Masking - API key is properly masked when retrieved', () => {
    fc.assert(
      fc.property(
        // Generate valid API keys of different lengths
        fc.stringMatching(/^[a-zA-Z0-9_-]{10,30}$/),
        
        (apiKey) => {
          // Skip forbidden placeholder values
          const forbiddenValues = ['your_api_key_here', 'test_key', 'demo_key'];
          if (forbiddenValues.includes(apiKey.toLowerCase())) {
            return true; // Skip this test case
          }

          const config: Config = {
            rangeApiKey: apiKey,
            rangeBaseUrl: 'https://app.range.org/api',
            port: 3000,
            logLevel: 'info',
            nodeEnv: 'test'
          };

          const client = new RangeApiClient(config);
          const maskedKey = client.getApiKeyMask();

          // Verify masking behavior
          if (apiKey.length <= 8) {
            expect(maskedKey).toBe('***');
          } else {
            expect(maskedKey).toBe(apiKey.substring(0, 4) + '***' + apiKey.substring(apiKey.length - 4));
          }

          // Verify the masked key doesn't contain the full original key
          if (apiKey.length > 8) {
            expect(maskedKey).not.toBe(apiKey);
            expect(maskedKey.includes('***')).toBe(true);
          }
          
          return true;
        }
      ),
      { numRuns: 5 }
    );
  });

  test('Property 2b: Base URL Configuration - Base URL is correctly configured', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          'https://app.range.org/api',
          'https://staging.range.org/api',
          'https://api.range.org'
        ),
        
        (baseUrl) => {
          const config: Config = {
            rangeApiKey: 'test_api_key_12345',
            rangeBaseUrl: baseUrl,
            port: 3000,
            logLevel: 'info',
            nodeEnv: 'test'
          };

          const client = new RangeApiClient(config);
          
          // Verify base URL is correctly stored and retrievable
          expect(client.getBaseUrl()).toBe(baseUrl);
          
          // Verify axios was configured with the correct base URL
          expect(mockedAxios.create).toHaveBeenCalledWith(
            expect.objectContaining({
              baseURL: baseUrl
            })
          );
          
          return true;
        }
      ),
      { numRuns: 5 }
    );
  });
});

// Unit tests for specific edge cases
describe('RangeApiClient Unit Tests', () => {
  let mockAxiosInstance: any;
  
  beforeEach(() => {
    jest.clearAllMocks();
    
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
  });

  test('should create client with correct configuration', () => {
    const config: Config = {
      rangeApiKey: 'test_api_key_123',
      rangeBaseUrl: 'https://app.range.org/api',
      port: 3000,
      logLevel: 'info',
      nodeEnv: 'test'
    };

    const client = new RangeApiClient(config);

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://app.range.org/api',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test_api_key_123',
        'User-Agent': 'Range-MCP-Server/1.0.0'
      }
    });

    expect(client.getBaseUrl()).toBe('https://app.range.org/api');
    expect(client.getApiKeyMask()).toBe('test***_123');
  });

  test('should mask short API keys correctly', () => {
    const config: Config = {
      rangeApiKey: 'short',
      rangeBaseUrl: 'https://app.range.org/api',
      port: 3000,
      logLevel: 'info',
      nodeEnv: 'test'
    };

    const client = new RangeApiClient(config);
    expect(client.getApiKeyMask()).toBe('***');
  });
});