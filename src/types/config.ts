/**
 * Configuration types for the Range MCP Server
 */

export interface Config {
  rangeApiKey: string;
  rangeBaseUrl: string;
  port: number;
  logLevel: 'error' | 'warn' | 'info' | 'debug';
  nodeEnv: 'development' | 'production' | 'test';
}

export interface ConfigValidationError extends Error {
  code: 'VALIDATION_ERROR';
  details: string[];
}