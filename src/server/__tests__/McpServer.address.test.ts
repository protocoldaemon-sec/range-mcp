/**
 * Unit tests for Range MCP Server Address Tools Error Handling
 * Validates: Requirements 2.3, 2.5 - Address tool error handling and sanctions checking
 */

import { describe, test, expect, beforeAll, afterAll, beforeEach, afterEach } from '@jest/globals';
import { RangeMcpServer } from '../McpServer.js';
import { configManager } from '../../config/index.js';
import { RangeApiError } from '../../api/RangeApiClient.js';

// Mock environment variables for testing
const originalEnv = process.env;

beforeAll(() => {
  // Set up test environment
  process.env = {
    ...originalEnv,
    RANGE_API_KEY: 'test_api_key_12345',
    RANGE_BASE_URL: 'https://app.range.org/api',
    PORT: '3000',
    LOG_LEVEL: 'info',
    NODE_ENV: 'test'
  };
  
  // Load config with test environment
  configManager.loadConfig();
});

afterAll(() => {
  // Restore original environment
  process.env = originalEnv;
  configManager.reset();
});

describe('Range MCP Server Address Tools Error Handling', () => {
  let server: RangeMcpServer;
  let mockApiClient: any;

  beforeEach(() => {
    server = new RangeMcpServer();
    mockApiClient = server.getRangeApiClient();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Address Format Validation', () => {
    test('should reject empty address', async () => {
      await expect(server['handleGetAddressInfo']({ address: '', network: 'ethereum' }))
        .rejects.toThrow('Address is required and must be a string');
    });

    test('should reject null address', async () => {
      await expect(server['handleGetAddressInfo']({ address: null, network: 'ethereum' }))
        .rejects.toThrow('Address is required and must be a string');
    });

    test('should reject too short address', async () => {
      await expect(server['handleGetAddressInfo']({ address: '0x123', network: 'ethereum' }))
        .rejects.toThrow('Address appears to be too short to be valid');
    });

    test('should reject invalid Ethereum address format', async () => {
      await expect(server['handleGetAddressInfo']({ address: '0x12345', network: 'ethereum' }))
        .rejects.toThrow('Invalid Ethereum-compatible address format for ethereum');
    });

    test('should reject invalid Ethereum address without 0x prefix', async () => {
      await expect(server['handleGetAddressInfo']({ address: '742d35Cc6634C0532925a3b8D4C9db96C4b4d2d0', network: 'ethereum' }))
        .rejects.toThrow('Invalid Ethereum-compatible address format for ethereum');
    });

    test('should reject invalid Solana address format', async () => {
      await expect(server['handleGetAddressInfo']({ address: 'invalid_solana_address', network: 'solana' }))
        .rejects.toThrow('Invalid Solana address format');
    });

    test('should reject invalid Cosmos address format', async () => {
      await expect(server['handleGetAddressInfo']({ address: 'invalid-cosmos-address', network: 'cosmos' }))
        .rejects.toThrow('Invalid Cosmos-compatible address format for cosmos');
    });
  });

  describe('Parameter Validation', () => {
    test('should reject invalid limit in getAddressTransactions', async () => {
      await expect(server['handleGetAddressTransactions']({
        address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d2d0',
        network: 'ethereum',
        limit: 0
      })).rejects.toThrow('Limit must be between 1 and 1000');

      await expect(server['handleGetAddressTransactions']({
        address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d2d0',
        network: 'ethereum',
        limit: 1001
      })).rejects.toThrow('Limit must be between 1 and 1000');
    });

    test('should reject negative offset in getAddressTransactions', async () => {
      await expect(server['handleGetAddressTransactions']({
        address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d2d0',
        network: 'ethereum',
        limit: 10,
        offset: -1
      })).rejects.toThrow('Offset must be non-negative');
    });

    test('should reject invalid limit in getAddressCounterparties', async () => {
      await expect(server['handleGetAddressCounterparties']({
        address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d2d0',
        network: 'ethereum',
        limit: 0
      })).rejects.toThrow('Limit must be between 1 and 1000');

      await expect(server['handleGetAddressCounterparties']({
        address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d2d0',
        network: 'ethereum',
        limit: 1001
      })).rejects.toThrow('Limit must be between 1 and 1000');
    });
  });

  describe('API Error Handling', () => {
    test('should handle authentication errors', async () => {
      const authError: RangeApiError = {
        code: 'HTTP_401',
        message: 'Authentication failed. Please check your RANGE_API_KEY is valid and has not expired.',
        timestamp: new Date().toISOString()
      };

      jest.spyOn(mockApiClient, 'get').mockRejectedValue(authError);

      await expect(server['handleGetAddressInfo']({
        address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d2d0',
        network: 'ethereum'
      })).rejects.toThrow('Failed to get address info: Authentication failed. Please check your RANGE_API_KEY is valid and has not expired.');
    });

    test('should handle rate limit errors', async () => {
      const rateLimitError: RangeApiError = {
        code: 'HTTP_429',
        message: 'Rate limit exceeded. Please wait before making more requests.',
        timestamp: new Date().toISOString()
      };

      jest.spyOn(mockApiClient, 'get').mockRejectedValue(rateLimitError);

      await expect(server['handleGetAddressBalance']({
        address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d2d0',
        network: 'ethereum'
      })).rejects.toThrow('Failed to get address balance: Rate limit exceeded. Please wait before making more requests.');
    });

    test('should handle network errors', async () => {
      const networkError: RangeApiError = {
        code: 'NETWORK_ERROR',
        message: 'Network error: Unable to reach Range API. Please check your internet connection.',
        timestamp: new Date().toISOString()
      };

      jest.spyOn(mockApiClient, 'get').mockRejectedValue(networkError);

      await expect(server['handleGetAddressTransactions']({
        address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d2d0',
        network: 'ethereum',
        limit: 10,
        offset: 0
      })).rejects.toThrow('Failed to get address transactions: Network error: Unable to reach Range API. Please check your internet connection.');
    });

    test('should handle server errors', async () => {
      const serverError: RangeApiError = {
        code: 'HTTP_500',
        message: 'Range API server error. Please try again later.',
        timestamp: new Date().toISOString()
      };

      jest.spyOn(mockApiClient, 'get').mockRejectedValue(serverError);

      await expect(server['handleGetAddressCounterparties']({
        address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d2d0',
        network: 'ethereum',
        limit: 10
      })).rejects.toThrow('Failed to get address counterparties: Range API server error. Please try again later.');
    });

    test('should handle not found errors', async () => {
      const notFoundError: RangeApiError = {
        code: 'HTTP_404',
        message: 'Resource not found. Please check the endpoint URL and parameters.',
        timestamp: new Date().toISOString()
      };

      jest.spyOn(mockApiClient, 'get').mockRejectedValue(notFoundError);

      await expect(server['handleGetAddressRiskScore']({
        address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d2d0',
        network: 'ethereum'
      })).rejects.toThrow('Failed to get address risk score: Resource not found. Please check the endpoint URL and parameters.');
    });
  });

  describe('Sanctions Checking and Risk Assessment', () => {
    test('should handle high-risk address response', async () => {
      const highRiskResponse = {
        success: true,
        data: {
          risk_score: 0.95,
          risk_level: 'high',
          sanctions_match: true,
          risk_factors: ['sanctions_list', 'darknet_market', 'mixer'],
          details: {
            sanctions_lists: ['OFAC', 'EU'],
            confidence: 0.98
          }
        }
      };

      jest.spyOn(mockApiClient, 'get').mockResolvedValue(highRiskResponse);

      const result = await server['handleGetAddressRiskScore']({
        address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d2d0',
        network: 'ethereum'
      });

      const responseData = JSON.parse(result.content[0].text);
      expect(responseData.success).toBe(true);
      expect(responseData.data.risk_score).toBe(0.95);
      expect(responseData.data.sanctions_match).toBe(true);
      expect(responseData.data.risk_factors).toContain('sanctions_list');
    });

    test('should handle low-risk address response', async () => {
      const lowRiskResponse = {
        success: true,
        data: {
          risk_score: 0.05,
          risk_level: 'low',
          sanctions_match: false,
          risk_factors: ['exchange_interaction'],
          details: {
            confidence: 0.92
          }
        }
      };

      jest.spyOn(mockApiClient, 'get').mockResolvedValue(lowRiskResponse);

      const result = await server['handleGetAddressRiskScore']({
        address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d2d0',
        network: 'ethereum'
      });

      const responseData = JSON.parse(result.content[0].text);
      expect(responseData.success).toBe(true);
      expect(responseData.data.risk_score).toBe(0.05);
      expect(responseData.data.sanctions_match).toBe(false);
      expect(responseData.data.risk_level).toBe('low');
    });
  });

  describe('Edge Cases', () => {
    test('should handle empty API response', async () => {
      jest.spyOn(mockApiClient, 'get').mockResolvedValue({
        success: true,
        data: null
      });

      const result = await server['handleGetAddressInfo']({
        address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d2d0',
        network: 'ethereum'
      });

      const responseData = JSON.parse(result.content[0].text);
      expect(responseData.success).toBe(true);
      expect(responseData.data).toBeNull();
    });

    test('should handle malformed API response', async () => {
      jest.spyOn(mockApiClient, 'get').mockResolvedValue({
        success: true,
        data: 'invalid_json_structure'
      });

      const result = await server['handleGetAddressBalance']({
        address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d2d0',
        network: 'ethereum'
      });

      const responseData = JSON.parse(result.content[0].text);
      expect(responseData.success).toBe(true);
      expect(responseData.data).toBe('invalid_json_structure');
    });

    test('should handle default network parameter', async () => {
      jest.spyOn(mockApiClient, 'get').mockResolvedValue({
        success: true,
        data: { address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d2d0', network: 'ethereum' }
      });

      const result = await server['handleGetAddressInfo']({
        address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d2d0'
        // network parameter omitted - should default to 'ethereum'
      });

      const responseData = JSON.parse(result.content[0].text);
      expect(responseData.network).toBe('ethereum');
      
      // Verify API was called with default network
      expect(mockApiClient.get).toHaveBeenCalledWith(
        expect.stringContaining('/info'),
        expect.objectContaining({ network: 'ethereum' })
      );
    });
  });
});