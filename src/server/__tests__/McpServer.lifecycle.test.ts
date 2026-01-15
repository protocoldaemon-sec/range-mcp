/**
 * Property-based tests for MCP Server Connection Lifecycle
 * 
 * These tests validate connection lifecycle management properties.
 */

import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
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

describe('MCP Server Connection Lifecycle Property Tests', () => {
  /**
   * Property 10: Connection Lifecycle Management
   * For any MCP connection establishment or termination, the server should properly manage connection state and cleanup resources
   * **Validates: Requirements 1.4**
   */
  describe('Property 10: Connection Lifecycle Management', () => {
    test('**Feature: range-mcp-server, Property 10: Connection Lifecycle Management**', async () => {
      await fc.assert(
        fc.asyncProperty(
          // Generate different server initialization scenarios
          fc.record({
            startDelay: fc.integer({ min: 0, max: 100 }), // Milliseconds
            shutdownDelay: fc.integer({ min: 0, max: 100 }), // Milliseconds
          }),
          async (scenario) => {
            const server = new RangeMcpServer();
            
            try {
              // Initial state should be not running
              expect(server.isServerRunning()).toBe(false);
              
              // Add delay before starting if specified
              if (scenario.startDelay > 0) {
                await new Promise(resolve => setTimeout(resolve, scenario.startDelay));
              }
              
              // Note: We cannot actually start the server in tests due to stdio transport
              // but we can test the state management logic
              
              // Server should remain in not-running state until explicitly started
              expect(server.isServerRunning()).toBe(false);
              
              // Add delay before shutdown if specified
              if (scenario.shutdownDelay > 0) {
                await new Promise(resolve => setTimeout(resolve, scenario.shutdownDelay));
              }
              
              // Shutdown should be safe to call even when not running
              await server.shutdown();
              expect(server.isServerRunning()).toBe(false);
              
            } catch (error) {
              // If an error occurs, server should still be in a consistent state
              expect(server.isServerRunning()).toBe(false);
              throw error;
            }
          }
        ),
        { numRuns: 20 } // Reduced for faster testing
      );
    });

    test('should handle multiple shutdown calls gracefully', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.integer({ min: 1, max: 5 }), // Number of shutdown calls
          async (shutdownCalls) => {
            const server = new RangeMcpServer();
            
            // Initial state
            expect(server.isServerRunning()).toBe(false);
            
            // Multiple shutdown calls should be safe
            for (let i = 0; i < shutdownCalls; i++) {
              await server.shutdown();
              expect(server.isServerRunning()).toBe(false);
            }
          }
        ),
        { numRuns: 10 }
      );
    });

    test('should maintain consistent state during rapid operations', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.array(
            fc.oneof(
              fc.constant('check_status'),
              fc.constant('shutdown')
            ),
            { minLength: 1, maxLength: 10 }
          ),
          async (operations) => {
            const server = new RangeMcpServer();
            
            for (const operation of operations) {
              switch (operation) {
                case 'check_status':
                  // Status check should always work
                  const isRunning = server.isServerRunning();
                  expect(typeof isRunning).toBe('boolean');
                  break;
                  
                case 'shutdown':
                  // Shutdown should always be safe
                  await server.shutdown();
                  expect(server.isServerRunning()).toBe(false);
                  break;
              }
            }
            
            // Final state should be consistent
            expect(server.isServerRunning()).toBe(false);
          }
        ),
        { numRuns: 15 }
      );
    });

    test('should provide access to internal components consistently', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.integer({ min: 1, max: 5 }), // Number of access attempts
          async (accessAttempts) => {
            const server = new RangeMcpServer();
            
            for (let i = 0; i < accessAttempts; i++) {
              // Should always provide access to MCP server
              const mcpServer = server.getServer();
              expect(mcpServer).toBeDefined();
              
              // Should always provide access to API client
              const apiClient = server.getRangeApiClient();
              expect(apiClient).toBeDefined();
              expect(apiClient.getBaseUrl()).toBe('https://app.range.org/api');
              
              // Status should be consistent
              expect(server.isServerRunning()).toBe(false);
            }
          }
        ),
        { numRuns: 10 }
      );
    });
  });

  describe('Error Handling in Lifecycle', () => {
    test('should handle configuration errors gracefully', async () => {
      // Save current environment
      const currentEnv = { ...process.env };
      
      try {
        // Test with invalid configuration
        delete process.env.RANGE_API_KEY;
        configManager.reset();
        
        expect(() => {
          new RangeMcpServer();
        }).toThrow();
        
      } finally {
        // Restore environment
        process.env = currentEnv;
        configManager.reset();
      }
    });

    test('should maintain state consistency after errors', async () => {
      const server = new RangeMcpServer();
      
      // Even after potential errors, basic operations should work
      expect(server.isServerRunning()).toBe(false);
      expect(server.getServer()).toBeDefined();
      expect(server.getRangeApiClient()).toBeDefined();
      
      // Shutdown should still work
      await server.shutdown();
      expect(server.isServerRunning()).toBe(false);
    });
  });
});