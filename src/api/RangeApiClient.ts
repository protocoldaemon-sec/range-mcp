/**
 * RangeApiClient - HTTP client for Range API communication
 * 
 * This class provides a centralized interface for communicating with Range APIs
 * including authentication, error handling, and retry logic.
 */

import axios, { type AxiosInstance, type AxiosResponse, type AxiosError } from 'axios';
import { type Config } from '../types/config.js';

export interface RangeApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
  rateLimit?: {
    remaining: number;
    resetTime: number;
  } | undefined;
}

export interface RangeApiError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
  requestId?: string;
}

export class RangeApiClient {
  private axiosInstance: AxiosInstance;
  private config: Config;

  constructor(config: Config) {
    this.config = config;
    
    // Create axios instance with base configuration
    this.axiosInstance = axios.create({
      baseURL: 'https://api.range.org', // Correct Range API base URL
      timeout: 30000, // 30 second timeout
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.rangeApiKey}`,
        'User-Agent': 'Range-MCP-Server/1.0.0'
      }
    });

    // Add request interceptor for logging
    this.axiosInstance.interceptors.request.use(
      (config) => {
        console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('[API Request Error]', error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling and rate limit tracking
    this.axiosInstance.interceptors.response.use(
      (response) => {
        console.log(`[API Response] ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        return Promise.reject(this.handleApiError(error));
      }
    );
  }

  /**
   * Handle and standardize API errors
   */
  private handleApiError(error: AxiosError): RangeApiError {
    const timestamp = new Date().toISOString();
    
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const data = error.response.data as any;
      
      console.error(`[API Error] ${status} ${error.config?.url}`, data);
      
      return {
        code: `HTTP_${status}`,
        message: this.getErrorMessage(status, data),
        details: data,
        timestamp,
        requestId: error.response.headers['x-request-id']
      };
    } else if (error.request) {
      // Network error - no response received
      console.error('[API Network Error]', error.message);
      
      return {
        code: 'NETWORK_ERROR',
        message: 'Network error: Unable to reach Range API. Please check your internet connection.',
        timestamp
      };
    } else {
      // Request setup error
      console.error('[API Setup Error]', error.message);
      
      return {
        code: 'REQUEST_ERROR',
        message: `Request setup error: ${error.message}`,
        timestamp
      };
    }
  }

  /**
   * Get human-readable error message based on status code
   */
  private getErrorMessage(status: number, data: any): string {
    switch (status) {
      case 401:
        return 'Authentication failed. Please check your RANGE_API_KEY is valid and has not expired.';
      case 403:
        return 'Access forbidden. Your API key may not have permission for this operation.';
      case 404:
        return 'Resource not found. Please check the endpoint URL and parameters.';
      case 429:
        return 'Rate limit exceeded. Please wait before making more requests.';
      case 500:
        return 'Range API server error. Please try again later.';
      case 502:
      case 503:
      case 504:
        return 'Range API temporarily unavailable. Please try again later.';
      default:
        return data?.message || data?.error || `HTTP ${status} error occurred`;
    }
  }

  /**
   * Extract rate limit information from response headers
   */
  private extractRateLimit(response: AxiosResponse): RangeApiResponse<any>['rateLimit'] {
    const remaining = response.headers['x-ratelimit-remaining'];
    const resetTime = response.headers['x-ratelimit-reset'];
    
    if (remaining !== undefined && resetTime !== undefined) {
      return {
        remaining: parseInt(remaining, 10),
        resetTime: parseInt(resetTime, 10)
      };
    }
    
    return undefined;
  }

  /**
   * Perform GET request
   */
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<RangeApiResponse<T>> {
    try {
      const response = await this.axiosInstance.get<T>(endpoint, { params });
      
      return {
        data: response.data,
        success: true,
        rateLimit: this.extractRateLimit(response)
      };
    } catch (error) {
      throw error; // Error is already processed by interceptor
    }
  }

  /**
   * Perform POST request
   */
  async post<T>(endpoint: string, data?: any, params?: Record<string, any>): Promise<RangeApiResponse<T>> {
    try {
      const response = await this.axiosInstance.post<T>(endpoint, data, { params });
      
      return {
        data: response.data,
        success: true,
        rateLimit: this.extractRateLimit(response)
      };
    } catch (error) {
      throw error; // Error is already processed by interceptor
    }
  }

  /**
   * Perform PUT request
   */
  async put<T>(endpoint: string, data?: any): Promise<RangeApiResponse<T>> {
    try {
      const response = await this.axiosInstance.put<T>(endpoint, data);
      
      return {
        data: response.data,
        success: true,
        rateLimit: this.extractRateLimit(response)
      };
    } catch (error) {
      throw error; // Error is already processed by interceptor
    }
  }

  /**
   * Perform DELETE request
   */
  async delete<T>(endpoint: string): Promise<RangeApiResponse<T>> {
    try {
      const response = await this.axiosInstance.delete<T>(endpoint);
      
      return {
        data: response.data,
        success: true,
        rateLimit: this.extractRateLimit(response)
      };
    } catch (error) {
      throw error; // Error is already processed by interceptor
    }
  }

  /**
   * Check if an error is retryable (network errors, 5xx errors, rate limits)
   */
  isRetryableError(error: RangeApiError): boolean {
    return (
      error.code === 'NETWORK_ERROR' ||
      error.code === 'HTTP_429' ||
      error.code === 'HTTP_500' ||
      error.code === 'HTTP_502' ||
      error.code === 'HTTP_503' ||
      error.code === 'HTTP_504'
    );
  }

  /**
   * Get retry delay for exponential backoff (in milliseconds)
   */
  getRetryDelay(attempt: number): number {
    // Exponential backoff: 1s, 2s, 4s, 8s, 16s
    const baseDelay = 1000;
    const maxDelay = 16000;
    const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
    
    // Add jitter to prevent thundering herd
    const jitter = Math.random() * 0.1 * delay;
    return delay + jitter;
  }

  /**
   * Get the base URL being used
   */
  getBaseUrl(): string {
    return this.config.rangeBaseUrl;
  }

  /**
   * Get API key (masked for security)
   */
  getApiKeyMask(): string {
    const key = this.config.rangeApiKey;
    if (key.length <= 8) {
      return '***';
    }
    return key.substring(0, 4) + '***' + key.substring(key.length - 4);
  }
}