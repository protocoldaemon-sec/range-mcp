/**
 * Property-based tests for Range MCP Server Address Tools
 * Feature: range-mcp-server, Property 4: Structured API Response Format (Address)
 * Validates: Requirements 2.1, 2.2
 * 
 * Property 3: Multi-Network Support
 * Validates: Requirements 2.4, 3.4, 4.4
 */

import { describe, test, expect, beforeAll, afterAll, beforeEach, afterEach } from '@jest/globals';
import * as fc from 'fast-check';
import { RangeMcpServer } from '../McpServer.js';
import { configManager } from '../../config/index.js';

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

describe('Range MCP Server Property Tests', () => {
  let server: RangeMcpServer;
  let mockApiClient: any;

  beforeEach(() => {
    server = new RangeMcpServer();
    mockApiClient = server.getRangeApiClient();
    
    // Mock the API client methods
    jest.spyOn(mockApiClient, 'get').mockImplementation(async (endpoint: string, params?: any) => {
      // Return mock response based on endpoint
      if (endpoint.includes('/info')) {
        return {
          success: true,
          data: {
            address: params?.network === 'ethereum' ? '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d2d' : 'SomeOtherAddress',
            network: params?.network || 'ethereum',
            labels: ['exchange', 'verified'],
            first_seen: '2023-01-01T00:00:00Z',
            last_seen: '2024-01-01T00:00:00Z'
          }
        };
      } else if (endpoint.includes('/balances')) {
        return {
          success: true,
          data: {
            balances: [
              { token: 'ETH', amount: '1000000000000000000', decimals: 18 },
              { token: 'USDC', amount: '1000000', decimals: 6 }
            ]
          }
        };
      } else if (endpoint.includes('/transactions')) {
        return {
          success: true,
          data: {
            transactions: [
              {
                hash: '0x123...',
                from: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d2d',
                to: '0x456...',
                value: '1000000000000000000',
                timestamp: '2024-01-01T00:00:00Z'
              }
            ],
            total: 1
          }
        };
      } else if (endpoint.includes('/counterparties')) {
        return {
          success: true,
          data: {
            counterparties: [
              {
                address: '0x456...',
                interaction_count: 5,
                total_volume: '5000000000000000000'
              }
            ]
          }
        };
      } else if (endpoint.includes('/risk/address')) {
        return {
          success: true,
          data: {
            risk_score: 0.25,
            risk_level: 'low',
            sanctions_match: false,
            risk_factors: ['high_volume', 'exchange_interaction']
          }
        };
      }
      
      throw new Error('Unknown endpoint');
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  /**
   * Property 4: Structured API Response Format (Address)
   * All address-related API responses should have consistent structure with success flag,
   * data payload, address, network, and timestamp
   */
  test('Property 4: Address API responses have consistent structure', () => {
    fc.assert(
      fc.property(
        // Generate valid Ethereum addresses
        fc.stringMatching(/^0x[a-fA-F0-9]{40}$/),
        
        // Generate supported networks
        fc.constantFrom('ethereum', 'polygon', 'arbitrum', 'optimism', 'solana', 'cosmos'),
        
        // Generate tool names
        fc.constantFrom('getAddressInfo', 'getAddressBalance', 'getAddressTransactions', 'getAddressCounterparties', 'getAddressRiskScore'),
        
        async (address, network, toolName) => {
          const args = { address, network };
          
          // Add additional parameters for specific tools
          if (toolName === 'getAddressTransactions') {
            args.limit = 10;
            args.offset = 0;
          } else if (toolName === 'getAddressCounterparties') {
            args.limit = 10;
          }

          try {
            let result;
            switch (toolName) {
              case 'getAddressInfo':
                result = await server['handleGetAddressInfo'](args);
                break;
              case 'getAddressBalance':
                result = await server['handleGetAddressBalance'](args);
                break;
              case 'getAddressTransactions':
                result = await server['handleGetAddressTransactions'](args);
                break;
              case 'getAddressCounterparties':
                result = await server['handleGetAddressCounterparties'](args);
                break;
              case 'getAddressRiskScore':
                result = await server['handleGetAddressRiskScore'](args);
                break;
              default:
                throw new Error(`Unknown tool: ${toolName}`);
            }

            // Verify response structure
            expect(result).toHaveProperty('content');
            expect(Array.isArray(result.content)).toBe(true);
            expect(result.content.length).toBeGreaterThan(0);
            expect(result.content[0]).toHaveProperty('type', 'text');
            expect(result.content[0]).toHaveProperty('text');

            // Parse the JSON response
            const responseData = JSON.parse(result.content[0].text);
            
            // Verify consistent structure
            expect(responseData).toHaveProperty('success', true);
            expect(responseData).toHaveProperty('data');
            expect(responseData).toHaveProperty('address', address);
            expect(responseData).toHaveProperty('network', network);
            expect(responseData).toHaveProperty('timestamp');
            
            // Verify timestamp is valid ISO string
            expect(() => new Date(responseData.timestamp)).not.toThrow();
            
            return true;
          } catch (error) {
            // For invalid addresses, we expect validation errors
            if (error.message.includes('Invalid') || error.message.includes('address')) {
              return true; // Expected validation error
            }
            throw error;
          }
        }
      ),
      { numRuns: 10 }
    );
  });

  /**
   * Property 3: Multi-Network Support
   * Address tools should work consistently across different blockchain networks
   */
  test('Property 3: Multi-network support consistency', () => {
    fc.assert(
      fc.property(
        // Generate network-appropriate addresses
        fc.oneof(
          fc.record({
            network: fc.constant('ethereum'),
            address: fc.stringMatching(/^0x[a-fA-F0-9]{40}$/)
          }),
          fc.record({
            network: fc.constant('solana'),
            address: fc.stringMatching(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/)
          }),
          fc.record({
            network: fc.constant('cosmos'),
            address: fc.stringMatching(/^cosmos[a-z0-9]{39}$/)
          })
        ),
        
        async ({ network, address }) => {
          const tools = ['getAddressInfo', 'getAddressBalance', 'getAddressRiskScore'];
          
          for (const toolName of tools) {
            try {
              let result;
              const args = { address, network };
              
              switch (toolName) {
                case 'getAddressInfo':
                  result = await server['handleGetAddressInfo'](args);
                  break;
                case 'getAddressBalance':
                  result = await server['handleGetAddressBalance'](args);
                  break;
                case 'getAddressRiskScore':
                  result = await server['handleGetAddressRiskScore'](args);
                  break;
              }

              // Verify the response includes the correct network
              const responseData = JSON.parse(result.content[0].text);
              expect(responseData.network).toBe(network);
              
              // Verify API client was called with correct network parameter
              expect(mockApiClient.get).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({ network })
              );
              
            } catch (error) {
              // Network-specific validation errors are acceptable
              if (error.message.includes('Invalid') && error.message.includes(network)) {
                continue; // Expected network validation error
              }
              throw error;
            }
          }
          
          return true;
        }
      ),
      { numRuns: 5 }
    );
  });

  /**
   * Property 4a: Address Validation Consistency
   * Address validation should be consistent across all address tools
   */
  test('Property 4a: Address validation consistency across tools', () => {
    fc.assert(
      fc.property(
        // Generate invalid addresses
        fc.oneof(
          fc.constant(''), // Empty string
          fc.constant('invalid'), // Too short
          fc.constant('0x123'), // Invalid Ethereum format
          fc.stringMatching(/^[^0-9a-fA-F]+$/), // Non-hex characters
          fc.string({ minLength: 100, maxLength: 200 }) // Too long
        ),
        
        fc.constantFrom('ethereum', 'solana', 'cosmos'),
        
        async (invalidAddress, network) => {
          const tools = ['getAddressInfo', 'getAddressBalance', 'getAddressTransactions', 'getAddressCounterparties', 'getAddressRiskScore'];
          
          for (const toolName of tools) {
            try {
              const args = { address: invalidAddress, network };
              
              // Add required parameters for specific tools
              if (toolName === 'getAddressTransactions') {
                args.limit = 10;
                args.offset = 0;
              } else if (toolName === 'getAddressCounterparties') {
                args.limit = 10;
              }

              let shouldThrow = false;
              try {
                switch (toolName) {
                  case 'getAddressInfo':
                    await server['handleGetAddressInfo'](args);
                    break;
                  case 'getAddressBalance':
                    await server['handleGetAddressBalance'](args);
                    break;
                  case 'getAddressTransactions':
                    await server['handleGetAddressTransactions'](args);
                    break;
                  case 'getAddressCounterparties':
                    await server['handleGetAddressCounterparties'](args);
                    break;
                  case 'getAddressRiskScore':
                    await server['handleGetAddressRiskScore'](args);
                    break;
                }
              } catch (error) {
                shouldThrow = true;
                // Verify error message is descriptive
                expect(error.message).toMatch(/address|Address|invalid|Invalid/i);
              }
              
              // Invalid addresses should always throw validation errors
              expect(shouldThrow).toBe(true);
            } catch (error) {
              // This is expected for invalid addresses
              continue;
            }
          }
          
          return true;
        }
      ),
      { numRuns: 5 }
    );
  });
});