/**
 * Unit tests for Range MCP Server
 */

import { describe, test, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
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

describe('Range MCP Server Unit Tests', () => {
  let server: RangeMcpServer;

  beforeEach(() => {
    server = new RangeMcpServer();
  });

  test('should create server instance', () => {
    expect(server).toBeInstanceOf(RangeMcpServer);
    expect(server.isServerRunning()).toBe(false);
  });

  test('should have access to MCP server instance', () => {
    const mcpServer = server.getServer();
    expect(mcpServer).toBeDefined();
  });

  test('should have access to Range API client', () => {
    const apiClient = server.getRangeApiClient();
    expect(apiClient).toBeDefined();
    expect(apiClient.getBaseUrl()).toBe('https://app.range.org/api');
    expect(apiClient.getApiKeyMask()).toContain('***');
  });
});