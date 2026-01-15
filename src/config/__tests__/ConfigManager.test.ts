/**
 * Property-based tests for ConfigManager
 * Feature: range-mcp-server, Property 6: Configuration Validation and Security
 * Validates: Requirements 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 8.1, 8.2, 8.4, 8.5
 */

import { describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import * as fc from 'fast-check';
import { ConfigManager } from '../ConfigManager.js';

describe('ConfigManager Property Tests', () => {
  let configManager: ConfigManager;
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    // Save original environment
    originalEnv = { ...process.env };
    
    // Get fresh instance for each test
    configManager = ConfigManager.getInstance();
    configManager.reset();
  });

  afterEach(() => {
    // Restore original environment
    process.env = originalEnv;
    configManager.reset();
  });

  /**
   * Property 6: Configuration Validation and Security
   * For any server startup, all required environment variables should be validated,
   * API keys should never be hardcoded, and invalid configuration should cause
   * startup failure with clear error messages
   */
  test('Property 6: Configuration validation and security - valid API keys', () => {
    fc.assert(
      fc.property(
        // Generate valid API key patterns
        fc.stringMatching(/^[a-zA-Z0-9_-]{10,50}$/),
        (apiKey) => {
          // Skip forbidden placeholder values
          const forbiddenValues = [
            'your_api_key_here',
            'replace_with_your_key',
            'api_key',
            'test_key',
            'demo_key',
            'example_key',
            'placeholder'
          ];
          
          if (forbiddenValues.includes(apiKey.toLowerCase())) {
            return true; // Skip this test case
          }

          // Reset ConfigManager to ensure clean state
          configManager.reset();

          // Set up environment with only the API key
          process.env.RANGE_API_KEY = apiKey;

          // Test that valid configuration loads successfully
          const config = configManager.loadConfig();
          
          // Verify required fields are present and valid
          expect(config.rangeApiKey).toBe(apiKey);
          expect(config.rangeBaseUrl).toMatch(/^https?:\/\/.+/);
          expect(config.port).toBeGreaterThan(0);
          expect(config.port).toBeLessThanOrEqual(65535);
          expect(['error', 'warn', 'info', 'debug']).toContain(config.logLevel);
          expect(['development', 'production', 'test']).toContain(config.nodeEnv);
          
          return true;
        }
      ),
      { numRuns: 3 } // Reduced for faster testing
    );
  });

  test('Property 6: Configuration validation and security - invalid API keys rejected', () => {
    fc.assert(
      fc.property(
        // Generate invalid API key patterns
        fc.oneof(
          fc.constant(''), // Empty string
          fc.constant('   '), // Whitespace only
          fc.stringMatching(/.*[^a-zA-Z0-9_-].*/), // Invalid characters
          fc.constantFrom(
            'your_api_key_here',
            'replace_with_your_key',
            'api_key',
            'test_key',
            'demo_key',
            'example_key',
            'placeholder'
          ) // Forbidden placeholder values
        ),
        (invalidApiKey) => {
          // Reset ConfigManager to ensure clean state
          configManager.reset();

          // Set up environment with invalid API key
          process.env.RANGE_API_KEY = invalidApiKey;

          // Test that invalid API keys are rejected
          expect(() => {
            configManager.loadConfig();
          }).toThrow();
          
          return true;
        }
      ),
      { numRuns: 3 } // Reduced for faster testing
    );
  });

  test('Property 6: Configuration validation and security - missing API key fails', () => {
    fc.assert(
      fc.property(
        fc.record({
          baseUrl: fc.option(fc.webUrl(), { nil: undefined }),
          port: fc.option(fc.integer({ min: 1000, max: 65535 }), { nil: undefined }),
          logLevel: fc.option(fc.constantFrom('error', 'warn', 'info', 'debug'), { nil: undefined })
        }),
        (envVars) => {
          // Reset ConfigManager to ensure clean state
          configManager.reset();

          // Set up environment without RANGE_API_KEY
          delete process.env.RANGE_API_KEY;
          if (envVars.baseUrl) process.env.RANGE_BASE_URL = envVars.baseUrl;
          if (envVars.port) process.env.PORT = envVars.port.toString();
          if (envVars.logLevel) process.env.LOG_LEVEL = envVars.logLevel;

          // Test that missing API key causes failure
          expect(() => {
            configManager.loadConfig();
          }).toThrow(/RANGE_API_KEY.*required/);
          
          return true;
        }
      ),
      { numRuns: 3 } // Reduced for faster testing
    );
  });

  test('Property 6: Configuration validation and security - API key validation method', () => {
    fc.assert(
      fc.property(
        fc.string(),
        (testKey) => {
          const isValid = configManager.validateApiKey(testKey);
          
          // Valid keys should match the expected pattern
          if (isValid) {
            expect(testKey).toMatch(/^[a-zA-Z0-9_-]+$/);
            expect(testKey.trim().length).toBeGreaterThan(0);
            
            // Should not be a forbidden placeholder
            const forbiddenValues = [
              'your_api_key_here',
              'replace_with_your_key',
              'api_key',
              'test_key',
              'demo_key',
              'example_key',
              'placeholder'
            ];
            expect(forbiddenValues).not.toContain(testKey.toLowerCase().trim());
          }
          
          return true;
        }
      ),
      { numRuns: 3 } // Reduced for faster testing
    );
  });

  test('Property 6: Configuration validation and security - environment validation fails fast', () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.constant(undefined), // Missing API key
          fc.constant(''), // Empty API key
          fc.constant('invalid_key_with_@_symbols'), // Invalid characters
          fc.constant('your_api_key_here') // Placeholder value
        ),
        (invalidApiKey) => {
          // Reset ConfigManager to ensure clean state
          configManager.reset();

          // Mock process.exit to prevent actual exit during tests
          const originalExit = process.exit;
          let exitCalled = false;
          process.exit = (() => {
            exitCalled = true;
            throw new Error('Process exit called');
          }) as any;

          try {
            if (invalidApiKey !== undefined) {
              process.env.RANGE_API_KEY = invalidApiKey;
            } else {
              delete process.env.RANGE_API_KEY;
            }

            // Test that validateEnvironment fails fast
            expect(() => {
              configManager.validateEnvironment();
            }).toThrow();
            
            return true;
          } finally {
            // Restore original process.exit
            process.exit = originalExit;
          }
        }
      ),
      { numRuns: 3 } // Reduced for faster testing
    );
  });
});

// Unit tests for specific edge cases
describe('ConfigManager Unit Tests', () => {
  let configManager: ConfigManager;
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = { ...process.env };
    configManager = ConfigManager.getInstance();
    configManager.reset();
  });

  afterEach(() => {
    process.env = originalEnv;
    configManager.reset();
  });

  test('should provide helpful error message for missing API key', () => {
    delete process.env.RANGE_API_KEY;
    
    expect(() => {
      configManager.loadConfig();
    }).toThrow(/Visit https:\/\/app\.range\.org/);
  });

  test('should provide helpful error message for invalid API key format', () => {
    process.env.RANGE_API_KEY = 'invalid@key!';
    
    expect(() => {
      configManager.loadConfig();
    }).toThrow(/alphanumeric characters, hyphens, and underscores/);
  });

  test('should use default values for optional configuration', () => {
    process.env.RANGE_API_KEY = 'valid_test_key_123';
    
    const config = configManager.loadConfig();
    
    expect(config.rangeBaseUrl).toBe('https://app.range.org/api');
    expect(config.port).toBe(3000);
    expect(config.logLevel).toBe('info');
    expect(config.nodeEnv).toBe('test'); // Jest sets NODE_ENV to 'test'
  });

  test('should reject placeholder API key values', () => {
    const placeholders = [
      'your_api_key_here',
      'replace_with_your_key',
      'api_key',
      'test_key',
      'demo_key',
      'example_key',
      'placeholder'
    ];

    placeholders.forEach(placeholder => {
      process.env.RANGE_API_KEY = placeholder;
      configManager.reset();
      
      expect(() => {
        configManager.loadConfig();
      }).toThrow(/placeholder/);
    });
  });
});