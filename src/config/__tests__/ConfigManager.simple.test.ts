import { describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import { ConfigManager } from '../ConfigManager';

describe('ConfigManager Simple Test', () => {
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

  test('should validate API key format', () => {
    expect(configManager.validateApiKey('valid_key_123')).toBe(true);
    expect(configManager.validateApiKey('')).toBe(false);
    expect(configManager.validateApiKey('your_api_key_here')).toBe(false);
  });
});