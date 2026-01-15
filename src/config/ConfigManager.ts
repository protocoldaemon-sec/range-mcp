/**
 * ConfigManager - Secure environment variable handling and validation
 * 
 * This class manages configuration loading and validation with security checks.
 * It ensures no hardcoded API keys and provides clear error messages for missing configuration.
 */

import { z } from 'zod';

// Configuration schema with validation rules
const ConfigSchema = z.object({
  rangeApiKey: z.string()
    .min(1, 'RANGE_API_KEY is required and cannot be empty')
    .regex(/^[a-zA-Z0-9_-]+$/, 'RANGE_API_KEY must contain only alphanumeric characters, hyphens, and underscores'),
  rangeBaseUrl: z.string()
    .url('RANGE_BASE_URL must be a valid URL')
    .default('https://app.range.org/api'),
  port: z.number()
    .int()
    .min(1)
    .max(65535)
    .default(3000),
  logLevel: z.enum(['error', 'warn', 'info', 'debug'])
    .default('info'),
  nodeEnv: z.enum(['development', 'production', 'test'])
    .default('development')
});

export type Config = z.infer<typeof ConfigSchema>;

export class ConfigManager {
  private static instance: ConfigManager;
  private config: Config | null = null;

  private constructor() {}

  /**
   * Get singleton instance of ConfigManager
   */
  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  /**
   * Validate API key format and security requirements
   */
  public validateApiKey(key: string): boolean {
    if (!key || key.trim().length === 0) {
      return false;
    }

    // Check for common hardcoded placeholder values
    const forbiddenValues = [
      'your_api_key_here',
      'replace_with_your_key',
      'api_key',
      'test_key',
      'demo_key',
      'example_key',
      'placeholder'
    ];

    const normalizedKey = key.toLowerCase().trim();
    if (forbiddenValues.includes(normalizedKey)) {
      return false;
    }

    // Validate format - should be alphanumeric with hyphens/underscores
    const apiKeyRegex = /^[a-zA-Z0-9_-]+$/;
    return apiKeyRegex.test(key);
  }

  /**
   * Load and validate configuration from environment variables
   */
  public loadConfig(): Config {
    if (this.config) {
      return this.config;
    }

    try {
      // Read environment variables
      const rawConfig = {
        rangeApiKey: process.env['RANGE_API_KEY'],
        rangeBaseUrl: process.env['RANGE_BASE_URL'],
        port: process.env['PORT'] ? parseInt(process.env['PORT'], 10) : undefined,
        logLevel: process.env['LOG_LEVEL'],
        nodeEnv: process.env['NODE_ENV']
      };

      // Validate RANGE_API_KEY is provided
      if (!rawConfig.rangeApiKey) {
        throw new Error(
          'RANGE_API_KEY environment variable is required.\n' +
          'Please set your Range API key:\n' +
          '1. Visit https://app.range.org to obtain your API key\n' +
          '2. Set the environment variable: export RANGE_API_KEY=your_actual_api_key\n' +
          '3. For Railway deployment, add RANGE_API_KEY in the environment variables section'
        );
      }

      // Validate API key format and security
      if (!this.validateApiKey(rawConfig.rangeApiKey)) {
        throw new Error(
          'Invalid RANGE_API_KEY format.\n' +
          'API key must:\n' +
          '- Contain only alphanumeric characters, hyphens, and underscores\n' +
          '- Not be a placeholder value (e.g., "your_api_key_here")\n' +
          '- Be obtained from https://app.range.org\n' +
          'Current value appears to be invalid or a placeholder.'
        );
      }

      // Parse and validate configuration
      this.config = ConfigSchema.parse(rawConfig);
      return this.config;

    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map(err => 
          `${err.path.join('.')}: ${err.message}`
        ).join('\n');
        
        throw new Error(
          'Configuration validation failed:\n' + errorMessages + '\n\n' +
          'Please check your environment variables and ensure:\n' +
          '- RANGE_API_KEY is set with a valid API key from https://app.range.org\n' +
          '- RANGE_BASE_URL is a valid URL (optional, defaults to https://app.range.org/api)\n' +
          '- PORT is a valid port number (optional, defaults to 3000)\n' +
          '- LOG_LEVEL is one of: error, warn, info, debug (optional, defaults to info)'
        );
      }
      throw error;
    }
  }

  /**
   * Validate environment on startup with fail-fast behavior
   */
  public validateEnvironment(): void {
    try {
      this.loadConfig();
      console.log('✅ Configuration validation successful');
    } catch (error) {
      console.error('❌ Configuration validation failed:');
      console.error((error as Error).message);
      process.exit(1);
    }
  }

  /**
   * Get current configuration (must call loadConfig first)
   */
  public getConfig(): Config {
    if (!this.config) {
      throw new Error('Configuration not loaded. Call loadConfig() first.');
    }
    return this.config;
  }

  /**
   * Reset configuration (mainly for testing)
   */
  public reset(): void {
    this.config = null;
  }
}

// Export singleton instance
export const configManager = ConfigManager.getInstance();