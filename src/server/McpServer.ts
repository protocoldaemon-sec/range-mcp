/**
 * Range MCP Server Implementation
 * 
 * This module implements the core MCP server using the Model Context Protocol SDK.
 * It provides blockchain intelligence capabilities through Range APIs.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { configManager, type Config } from '../config/index.js';
import { RangeApiClient } from '../api/index.js';

export class RangeMcpServer {
  private server: Server;
  private config: Config;
  private rangeApiClient: RangeApiClient;
  private isRunning: boolean = false;

  constructor() {
    this.config = configManager.getConfig();
    this.rangeApiClient = new RangeApiClient(this.config);
    
    this.server = new Server(
      {
        name: 'range-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    this.setupErrorHandling();
  }

  /**
   * Set up MCP tool handlers
   */
  private setupToolHandlers(): void {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'ping',
            description: 'Test connectivity to the Range MCP server',
            inputSchema: {
              type: 'object',
              properties: {},
              required: [],
            },
          },
          {
            name: 'getAddressInfo',
            description: 'Get information about a blockchain address including network and labels',
            inputSchema: {
              type: 'object',
              properties: {
                address: {
                  type: 'string',
                  description: 'The blockchain address to query'
                },
                network: {
                  type: 'string',
                  description: 'The blockchain network (e.g., ethereum, solana, cosmos)',
                  default: 'ethereum'
                }
              },
              required: ['address'],
            },
          },
          {
            name: 'getAddressBalance',
            description: 'Get current token balances for a blockchain address',
            inputSchema: {
              type: 'object',
              properties: {
                address: {
                  type: 'string',
                  description: 'The blockchain address to query'
                },
                network: {
                  type: 'string',
                  description: 'The blockchain network (e.g., ethereum, solana, cosmos)',
                  default: 'ethereum'
                }
              },
              required: ['address'],
            },
          },
          {
            name: 'getAddressTransactions',
            description: 'Get transaction history for a blockchain address',
            inputSchema: {
              type: 'object',
              properties: {
                address: {
                  type: 'string',
                  description: 'The blockchain address to query'
                },
                network: {
                  type: 'string',
                  description: 'The blockchain network (e.g., ethereum, solana, cosmos)',
                  default: 'ethereum'
                },
                limit: {
                  type: 'number',
                  description: 'Maximum number of transactions to return',
                  default: 100,
                  minimum: 1,
                  maximum: 1000
                },
                offset: {
                  type: 'number',
                  description: 'Number of transactions to skip for pagination',
                  default: 0,
                  minimum: 0
                }
              },
              required: ['address'],
            },
          },
          {
            name: 'getAddressCounterparties',
            description: 'Get addresses that the specified address has interacted with',
            inputSchema: {
              type: 'object',
              properties: {
                address: {
                  type: 'string',
                  description: 'The blockchain address to query'
                },
                network: {
                  type: 'string',
                  description: 'The blockchain network (e.g., ethereum, solana, cosmos)',
                  default: 'ethereum'
                },
                limit: {
                  type: 'number',
                  description: 'Maximum number of counterparties to return',
                  default: 100,
                  minimum: 1,
                  maximum: 1000
                }
              },
              required: ['address'],
            },
          },
          {
            name: 'getAddressRiskScore',
            description: 'Get risk score for a blockchain address using network proximity analysis, ML, and behavioral pattern recognition. Returns riskScore (1-10), riskLevel, numHops to malicious addresses, and detailed reasoning.',
            inputSchema: {
              type: 'object',
              properties: {
                address: {
                  type: 'string',
                  description: 'The blockchain address to assess'
                },
                network: {
                  type: 'string',
                  description: 'Network identifier (solana, celestia, osmosis-1, dydx-mainnet-1, cosmoshub-4, neutron-1, noble-1, stellar, eth, etc.)',
                  default: 'solana'
                }
              },
              required: ['address', 'network'],
            },
          },
          // Transaction Analysis Tools
          {
            name: 'getTransactionDetails',
            description: 'Get detailed information about a specific transaction',
            inputSchema: {
              type: 'object',
              properties: {
                hash: {
                  type: 'string',
                  description: 'The transaction hash to query'
                },
                network: {
                  type: 'string',
                  description: 'The blockchain network (e.g., ethereum, solana, cosmos)',
                  default: 'ethereum'
                }
              },
              required: ['hash'],
            },
          },
          {
            name: 'getTransactionRisk',
            description: 'Get risk assessment for a specific transaction',
            inputSchema: {
              type: 'object',
              properties: {
                hash: {
                  type: 'string',
                  description: 'The transaction hash to assess'
                },
                network: {
                  type: 'string',
                  description: 'The blockchain network (e.g., ethereum, solana, cosmos)',
                  default: 'ethereum'
                }
              },
              required: ['hash'],
            },
          },
          {
            name: 'simulateTransaction',
            description: 'Simulate a transaction before execution to assess risks and outcomes',
            inputSchema: {
              type: 'object',
              properties: {
                from: {
                  type: 'string',
                  description: 'The sender address'
                },
                to: {
                  type: 'string',
                  description: 'The recipient address'
                },
                value: {
                  type: 'string',
                  description: 'The amount to transfer (in wei for Ethereum)'
                },
                network: {
                  type: 'string',
                  description: 'The blockchain network (e.g., ethereum, solana, cosmos)',
                  default: 'ethereum'
                },
                data: {
                  type: 'string',
                  description: 'Optional transaction data (for contract calls)',
                  default: '0x'
                }
              },
              required: ['from', 'to', 'value'],
            },
          },
          {
            name: 'trackTransactionStatus',
            description: 'Track the status of a transaction across networks',
            inputSchema: {
              type: 'object',
              properties: {
                hash: {
                  type: 'string',
                  description: 'The transaction hash to track'
                },
                network: {
                  type: 'string',
                  description: 'The blockchain network (e.g., ethereum, solana, cosmos)',
                  default: 'ethereum'
                },
                quoteId: {
                  type: 'string',
                  description: 'Optional quote ID if transaction originated from Faraday quote'
                }
              },
              required: ['hash'],
            },
          },
          // Address Search & Labels Tools
          {
            name: 'searchAddresses',
            description: 'Search for addresses by network and status (malicious, blacklisted, sanctioned)',
            inputSchema: {
              type: 'object',
              properties: {
                networks: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'List of blockchain networks to filter by (e.g., ethereum, solana)'
                },
                status: {
                  type: 'array',
                  items: { type: 'string', enum: ['malicious', 'blacklisted', 'sanctioned'] },
                  description: 'List of address statuses to filter by'
                }
              },
              required: [],
            },
          },
          {
            name: 'searchAddressLabels',
            description: 'Search for address labels by networks, addresses, or search string',
            inputSchema: {
              type: 'object',
              properties: {
                networks: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'List of blockchain networks to filter by'
                },
                addresses: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'List of addresses to filter by'
                },
                searchString: {
                  type: 'string',
                  description: 'Substring to search for in addresses or labels (case insensitive)'
                },
                includeNft: {
                  type: 'boolean',
                  description: 'Include NFT addresses in results',
                  default: false
                }
              },
              required: [],
            },
          },
          {
            name: 'getAddressStats',
            description: 'Get first and last interaction dates for an address on a network',
            inputSchema: {
              type: 'object',
              properties: {
                address: {
                  type: 'string',
                  description: 'The blockchain address to query'
                },
                network: {
                  type: 'string',
                  description: 'The blockchain network'
                }
              },
              required: ['address', 'network'],
            },
          },
          {
            name: 'getAddressPayments',
            description: 'Get payment transactions for an address with filtering options',
            inputSchema: {
              type: 'object',
              properties: {
                address: {
                  type: 'string',
                  description: 'The blockchain address to query'
                },
                network: {
                  type: 'string',
                  description: 'Network of the address'
                },
                receiver: {
                  type: 'string',
                  description: 'Filter by receiver address'
                },
                receiverNetwork: {
                  type: 'string',
                  description: 'Network of the receiver address'
                },
                startTime: {
                  type: 'string',
                  description: 'Start time filter (ISO 8601)'
                },
                endTime: {
                  type: 'string',
                  description: 'End time filter (ISO 8601)'
                },
                direction: {
                  type: 'string',
                  enum: ['incoming', 'outgoing', 'both'],
                  description: 'Direction of payments',
                  default: 'both'
                },
                limit: {
                  type: 'number',
                  description: 'Number of items to return',
                  default: 50
                },
                offset: {
                  type: 'number',
                  description: 'Number of items to skip',
                  default: 0
                },
                sort: {
                  type: 'string',
                  enum: ['asc', 'desc'],
                  description: 'Sort order',
                  default: 'desc'
                }
              },
              required: ['address'],
            },
          },
          {
            name: 'getTransactionCounts',
            description: 'Get transaction counts aggregated by day for specified addresses',
            inputSchema: {
              type: 'object',
              properties: {
                addresses: {
                  type: 'string',
                  description: 'Comma-separated list of addresses'
                }
              },
              required: ['addresses'],
            },
          },
          {
            name: 'getTokenTransfers',
            description: 'Search token transfers with comprehensive filtering options',
            inputSchema: {
              type: 'object',
              properties: {
                explorer: {
                  type: 'string',
                  description: 'Explorer/network (e.g., solana)'
                },
                network: {
                  type: 'string',
                  description: 'Specific network to filter transfers'
                },
                address: {
                  type: 'string',
                  description: 'Specific address to filter transfers'
                },
                tx_hash: {
                  type: 'string',
                  description: 'Transaction hash to filter by'
                },
                source_networks: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Source networks (e.g., eth, solana)'
                },
                destination_networks: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Destination networks'
                },
                status: {
                  type: 'array',
                  items: { type: 'string', enum: ['SUCCEEDED', 'PENDING', 'ERROR_ON_DESTINATION', 'TIMEOUT'] },
                  description: 'Transfer status filter'
                },
                bridges: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Bridges used (e.g., ibc, cctp)'
                },
                token_symbols: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Token symbols (e.g., USDC, DAI)'
                },
                min_usd: {
                  type: 'number',
                  description: 'Minimum USD amount'
                },
                max_usd: {
                  type: 'number',
                  description: 'Maximum USD amount'
                },
                start_time: {
                  type: 'string',
                  description: 'Start time (ISO 8601)'
                },
                end_time: {
                  type: 'string',
                  description: 'End time (ISO 8601)'
                },
                scope: {
                  type: 'string',
                  enum: ['INTERCHAIN', 'INTRACHAIN', 'ALL'],
                  description: 'Transfer scope'
                },
                size: {
                  type: 'number',
                  description: 'Page size (1-100)',
                  default: 25
                },
                cursor: {
                  type: 'string',
                  description: 'Pagination cursor'
                }
              },
              required: [],
            },
          },
          // Cross-chain Protocol Tools
          {
            name: 'getCrossChainTransactions',
            description: 'Get cross-chain transactions with filters for protocol, address, networks, assets, and time range',
            inputSchema: {
              type: 'object',
              properties: {
                protocol: {
                  type: 'string',
                  description: 'Protocol type filter (e.g., IBC, CCTP)'
                },
                address: {
                  type: 'string',
                  description: 'Address filter'
                },
                senderNetwork: {
                  type: 'string',
                  description: 'Sender network filter (e.g., cosmoshub-4)'
                },
                receiverNetwork: {
                  type: 'string',
                  description: 'Receiver network filter (e.g., osmosis-1)'
                },
                asset: {
                  type: 'string',
                  description: 'Asset filter (e.g., uatom)'
                },
                startTime: {
                  type: 'string',
                  description: 'Start time filter (ISO 8601 string, e.g., 2023-01-01T00:00:00Z)'
                },
                endTime: {
                  type: 'string',
                  description: 'End time filter (ISO 8601 string, e.g., 2023-12-31T23:59:59Z)'
                },
                direction: {
                  type: 'string',
                  enum: ['incoming', 'outgoing'],
                  description: 'Direction filter (incoming/outgoing)'
                },
                page: {
                  type: 'number',
                  description: 'Page number offset',
                  default: 0
                },
                pageSize: {
                  type: 'number',
                  description: 'Page size',
                  default: 100
                },
                useScroll: {
                  type: 'boolean',
                  description: 'Whether to use scroll API for pagination',
                  default: false
                },
                scrollId: {
                  type: 'string',
                  description: 'Scroll ID for pagination continuation (only when useScroll=true)'
                }
              },
              required: [],
            },
          },
        ],
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'ping':
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify({
                    status: 'success',
                    message: 'Range MCP Server is running',
                    timestamp: new Date().toISOString(),
                    server: 'range-mcp-server',
                    version: '1.0.0',
                    apiEndpoint: this.rangeApiClient.getBaseUrl(),
                    apiKey: this.rangeApiClient.getApiKeyMask()
                  }, null, 2)
                }
              ]
            };

          case 'getAddressInfo':
            return await this.handleGetAddressInfo(args);

          case 'getAddressBalance':
            return await this.handleGetAddressBalance(args);

          case 'getAddressTransactions':
            return await this.handleGetAddressTransactions(args);

          case 'getAddressCounterparties':
            return await this.handleGetAddressCounterparties(args);

          case 'getAddressRiskScore':
            return await this.handleGetAddressRiskScore(args);

          case 'getTransactionDetails':
            return await this.handleGetTransactionDetails(args);

          case 'getTransactionRisk':
            return await this.handleGetTransactionRisk(args);

          case 'simulateTransaction':
            return await this.handleSimulateTransaction(args);

          case 'trackTransactionStatus':
            return await this.handleTrackTransactionStatus(args);

          case 'getCrossChainTransactions':
            return await this.handleGetCrossChainTransactions(args);

          case 'searchAddresses':
            return await this.handleSearchAddresses(args);

          case 'searchAddressLabels':
            return await this.handleSearchAddressLabels(args);

          case 'getAddressStats':
            return await this.handleGetAddressStats(args);

          case 'getAddressPayments':
            return await this.handleGetAddressPayments(args);

          case 'getTransactionCounts':
            return await this.handleGetTransactionCounts(args);

          case 'getTokenTransfers':
            return await this.handleGetTokenTransfers(args);

          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        console.error(`Error handling tool ${name}:`, error);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                error: 'Tool execution failed',
                message: error instanceof Error ? error.message : 'Unknown error occurred',
                tool: name,
                timestamp: new Date().toISOString()
              }, null, 2)
            }
          ],
          isError: true
        };
      }
    });
  }

  /**
   * Set up error handling for the MCP server
   */
  private setupErrorHandling(): void {
    this.server.onerror = (error) => {
      console.error('MCP Server error:', error);
    };

    // Handle process signals for graceful shutdown
    process.on('SIGINT', () => this.shutdown());
    process.on('SIGTERM', () => this.shutdown());
    process.on('uncaughtException', (error) => {
      console.error('Uncaught exception:', error);
      this.shutdown();
    });
    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled rejection at:', promise, 'reason:', reason);
      this.shutdown();
    });
  }

  /**
   * Validate address format for different networks
   */
  private validateAddress(address: string, network: string): void {
    if (!address || typeof address !== 'string') {
      throw new Error('Address is required and must be a string');
    }

    // Basic validation - more specific validation could be added per network
    if (address.length < 10) {
      throw new Error('Address appears to be too short to be valid');
    }

    // Network-specific basic validation
    switch (network.toLowerCase()) {
      case 'ethereum':
      case 'polygon':
      case 'arbitrum':
      case 'optimism':
        if (!address.startsWith('0x') || address.length !== 42) {
          throw new Error(`Invalid Ethereum-compatible address format for ${network}`);
        }
        break;
      case 'solana':
        if (address.length < 32 || address.length > 44) {
          throw new Error('Invalid Solana address format');
        }
        break;
      case 'cosmos':
      case 'osmosis':
        if (!address.match(/^[a-z0-9]+$/)) {
          throw new Error(`Invalid Cosmos-compatible address format for ${network}`);
        }
        break;
      default:
        // For other networks, just check it's not empty and has reasonable length
        if (address.length < 10 || address.length > 100) {
          throw new Error(`Address length seems invalid for network ${network}`);
        }
    }
  }

  /**
   * Handle getAddressInfo tool call
   */
  private async handleGetAddressInfo(args: any): Promise<any> {
    const { address, network = 'solana' } = args;
    
    this.validateAddress(address, network);

    try {
      // Range API v1 endpoint: GET /v1/address?address=X&network=Y
      const response = await this.rangeApiClient.get('/v1/address', {
        address: address,
        network: network
      });

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: true,
              data: response.data,
              address,
              network,
              timestamp: new Date().toISOString()
            }, null, 2)
          }
        ]
      };
    } catch (error: any) {
      throw new Error(`Failed to get address info: ${error.message || error}`);
    }
  }

  /**
   * Handle getAddressBalance tool call (GET /v1/address/balance)
   */
  private async handleGetAddressBalance(args: any): Promise<any> {
    const { address, network = 'solana' } = args;
    
    this.validateAddress(address, network);

    try {
      // Range API v1 endpoint: GET /v1/address/balance?address=X&network=Y
      const response = await this.rangeApiClient.get('/v1/address/balance', {
        address: address,
        network: network
      });

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: true,
              data: response.data,
              address,
              network,
              timestamp: new Date().toISOString()
            }, null, 2)
          }
        ]
      };
    } catch (error: any) {
      throw new Error(`Failed to get address balance: ${error.message || error}`);
    }
  }

  /**
   * Handle getAddressTransactions tool call
   */
  private async handleGetAddressTransactions(args: any): Promise<any> {
    const { address, network = 'solana', limit = 100, offset = 0 } = args;
    
    this.validateAddress(address, network);

    if (limit < 1 || limit > 1000) {
      throw new Error('Limit must be between 1 and 1000');
    }

    if (offset < 0) {
      throw new Error('Offset must be non-negative');
    }

    try {
      // Range API v1 endpoint: GET /v1/address/transactions?address=X&network=Y
      const response = await this.rangeApiClient.get('/v1/address/transactions', {
        address: address,
        network: network,
        limit: limit,
        offset: offset
      });

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: true,
              data: response.data,
              address,
              network,
              pagination: { limit, offset },
              timestamp: new Date().toISOString()
            }, null, 2)
          }
        ]
      };
    } catch (error: any) {
      throw new Error(`Failed to get address transactions: ${error.message || error}`);
    }
  }

  /**
   * Handle getAddressCounterparties tool call
   */
  private async handleGetAddressCounterparties(args: any): Promise<any> {
    const { address, network = 'ethereum', limit = 100 } = args;
    
    this.validateAddress(address, network);

    if (limit < 1 || limit > 1000) {
      throw new Error('Limit must be between 1 and 1000');
    }

    try {
      const response = await this.rangeApiClient.get(`/address/${address}/counterparties`, {
        network: network,
        limit: limit
      });

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: true,
              data: response.data,
              address,
              network,
              limit,
              timestamp: new Date().toISOString()
            }, null, 2)
          }
        ]
      };
    } catch (error: any) {
      throw new Error(`Failed to get address counterparties: ${error.message || error}`);
    }
  }

  /**
   * Handle getAddressRiskScore tool call (GET /v1/risk/address)
   */
  private async handleGetAddressRiskScore(args: any): Promise<any> {
    const { address, network = 'solana' } = args;
    
    this.validateAddress(address, network);

    try {
      // Range API v1 endpoint: GET /v1/risk/address?address=X&network=Y
      const response = await this.rangeApiClient.get('/v1/risk/address', {
        address: address,
        network: network
      });

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: true,
              data: response.data,
              address,
              network,
              timestamp: new Date().toISOString()
            }, null, 2)
          }
        ]
      };
    } catch (error: any) {
      throw new Error(`Failed to get address risk score: ${error.message || error}`);
    }
  }

  /**
   * Handle getTransactionDetails tool call (GET /v1/address/transaction)
   */
  private async handleGetTransactionDetails(args: any): Promise<any> {
    const { hash, network = 'ethereum' } = args;
    
    if (!hash || typeof hash !== 'string') {
      throw new Error('Transaction hash is required and must be a string');
    }

    try {
      const response = await this.rangeApiClient.get('/v1/address/transaction', {
        hash: hash,
        network: network
      });

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: true,
              data: response.data,
              hash,
              network,
              timestamp: new Date().toISOString()
            }, null, 2)
          }
        ]
      };
    } catch (error: any) {
      throw new Error(`Failed to get transaction details: ${error.message || error}`);
    }
  }

  /**
   * Handle getTransactionRisk tool call
   */
  private async handleGetTransactionRisk(args: any): Promise<any> {
    const { hash, network = 'ethereum' } = args;
    
    if (!hash || typeof hash !== 'string') {
      throw new Error('Transaction hash is required and must be a string');
    }

    try {
      const response = await this.rangeApiClient.get(`/risk/transaction/${hash}`, {
        network: network
      });

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: true,
              data: response.data,
              hash,
              network,
              timestamp: new Date().toISOString()
            }, null, 2)
          }
        ]
      };
    } catch (error: any) {
      throw new Error(`Failed to get transaction risk: ${error.message || error}`);
    }
  }

  /**
   * Handle simulateTransaction tool call
   */
  private async handleSimulateTransaction(args: any): Promise<any> {
    const { from, to, value, network = 'ethereum', data = '0x' } = args;
    
    // Validate addresses
    this.validateAddress(from, network);
    this.validateAddress(to, network);

    if (!value || typeof value !== 'string') {
      throw new Error('Value is required and must be a string');
    }

    try {
      const response = await this.rangeApiClient.post(`/simulate/transaction`, {
        from,
        to,
        value,
        network,
        data
      });

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: true,
              data: response.data,
              simulation: {
                from,
                to,
                value,
                network,
                data
              },
              timestamp: new Date().toISOString()
            }, null, 2)
          }
        ]
      };
    } catch (error: any) {
      throw new Error(`Failed to simulate transaction: ${error.message || error}`);
    }
  }

  /**
   * Handle trackTransactionStatus tool call
   */
  private async handleTrackTransactionStatus(args: any): Promise<any> {
    const { hash, network = 'ethereum', quoteId } = args;
    
    if (!hash || typeof hash !== 'string') {
      throw new Error('Transaction hash is required and must be a string');
    }

    try {
      const params: any = { network };
      if (quoteId) {
        params.quote_id = quoteId;
      }

      const response = await this.rangeApiClient.get(`/transaction/${hash}/status`, params);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: true,
              data: response.data,
              hash,
              network,
              quoteId,
              timestamp: new Date().toISOString()
            }, null, 2)
          }
        ]
      };
    } catch (error: any) {
      throw new Error(`Failed to track transaction status: ${error.message || error}`);
    }
  }

  /**
   * Handle getCrossChainTransactions tool call
   */
  private async handleGetCrossChainTransactions(args: any): Promise<any> {
    const {
      protocol,
      address,
      senderNetwork,
      receiverNetwork,
      asset,
      startTime,
      endTime,
      direction,
      page = 0,
      pageSize = 100,
      useScroll = false,
      scrollId
    } = args;

    // Validate direction if provided
    if (direction && !['incoming', 'outgoing'].includes(direction)) {
      throw new Error('Direction must be either "incoming" or "outgoing"');
    }

    // Validate time format if provided
    if (startTime && isNaN(Date.parse(startTime))) {
      throw new Error('startTime must be a valid ISO 8601 date string');
    }
    if (endTime && isNaN(Date.parse(endTime))) {
      throw new Error('endTime must be a valid ISO 8601 date string');
    }

    try {
      // Build query parameters
      const queryParams: Record<string, any> = {};
      if (protocol) queryParams['protocol'] = protocol;
      if (address) queryParams['address'] = address;
      if (senderNetwork) queryParams['senderNetwork'] = senderNetwork;
      if (receiverNetwork) queryParams['receiverNetwork'] = receiverNetwork;
      if (asset) queryParams['asset'] = asset;
      if (startTime) queryParams['startTime'] = startTime;
      if (endTime) queryParams['endTime'] = endTime;
      if (direction) queryParams['direction'] = direction;
      queryParams['page'] = page.toString();
      queryParams['pageSize'] = pageSize.toString();
      if (useScroll) queryParams['useScroll'] = 'true';

      // Build request body for scroll pagination
      const requestBody: Record<string, any> = {};
      if (scrollId) requestBody['scrollId'] = scrollId;

      const response = await this.rangeApiClient.post('/v1/protocols/transactions', requestBody, queryParams);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: true,
              data: response.data,
              filters: {
                protocol,
                address,
                senderNetwork,
                receiverNetwork,
                asset,
                startTime,
                endTime,
                direction
              },
              pagination: {
                page,
                pageSize,
                useScroll,
                scrollId: (response.data as any)?.scrollId,
                hasMore: (response.data as any)?.hasMore
              },
              timestamp: new Date().toISOString()
            }, null, 2)
          }
        ]
      };
    } catch (error: any) {
      throw new Error(`Failed to get cross-chain transactions: ${error.message || error}`);
    }
  }

  /**
   * Handle searchAddresses tool call (GET /v2/addresses)
   */
  private async handleSearchAddresses(args: any): Promise<any> {
    const { networks, status } = args;

    try {
      const queryParams: Record<string, any> = {};
      if (networks && networks.length > 0) queryParams['networks'] = networks.join(',');
      if (status && status.length > 0) queryParams['status'] = status.join(',');

      const response = await this.rangeApiClient.get('/v2/addresses', queryParams);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: true,
              data: response.data,
              filters: { networks, status },
              timestamp: new Date().toISOString()
            }, null, 2)
          }
        ]
      };
    } catch (error: any) {
      throw new Error(`Failed to search addresses: ${error.message || error}`);
    }
  }

  /**
   * Handle searchAddressLabels tool call (GET /v1/address/labels/search)
   */
  private async handleSearchAddressLabels(args: any): Promise<any> {
    const { networks, addresses, searchString, includeNft = false } = args;

    try {
      const queryParams: Record<string, any> = { validateSearch: 'true' };
      if (networks && networks.length > 0) queryParams['networks'] = networks.join(',');
      if (addresses && addresses.length > 0) queryParams['addresses'] = addresses.join(',');
      if (searchString) queryParams['searchString'] = searchString;
      if (includeNft) queryParams['includeNft'] = 'true';

      const response = await this.rangeApiClient.get('/v1/address/labels/search', queryParams);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: true,
              data: response.data,
              filters: { networks, addresses, searchString, includeNft },
              timestamp: new Date().toISOString()
            }, null, 2)
          }
        ]
      };
    } catch (error: any) {
      throw new Error(`Failed to search address labels: ${error.message || error}`);
    }
  }

  /**
   * Handle getAddressStats tool call (GET /v1/address/stats)
   */
  private async handleGetAddressStats(args: any): Promise<any> {
    const { address, network } = args;

    if (!address || !network) {
      throw new Error('Both address and network are required');
    }

    try {
      const response = await this.rangeApiClient.get('/v1/address/stats', { address, network });

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: true,
              data: response.data,
              address,
              network,
              timestamp: new Date().toISOString()
            }, null, 2)
          }
        ]
      };
    } catch (error: any) {
      throw new Error(`Failed to get address stats: ${error.message || error}`);
    }
  }

  /**
   * Handle getAddressPayments tool call (GET /v1/address/payments)
   */
  private async handleGetAddressPayments(args: any): Promise<any> {
    const {
      address,
      network,
      receiver,
      receiverNetwork,
      startTime,
      endTime,
      direction = 'both',
      limit = 50,
      offset = 0,
      sort = 'desc'
    } = args;

    if (!address) {
      throw new Error('Address is required');
    }

    try {
      const queryParams: Record<string, any> = { address };
      if (network) queryParams['network'] = network;
      if (receiver) queryParams['receiver'] = receiver;
      if (receiverNetwork) queryParams['receiverNetwork'] = receiverNetwork;
      if (startTime) queryParams['startTime'] = startTime;
      if (endTime) queryParams['endTime'] = endTime;
      queryParams['direction'] = direction;
      queryParams['limit'] = limit;
      queryParams['offset'] = offset;
      queryParams['sort'] = sort;

      const response = await this.rangeApiClient.get('/v1/address/payments', queryParams);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: true,
              data: response.data,
              address,
              filters: { network, receiver, receiverNetwork, startTime, endTime, direction },
              pagination: { limit, offset, sort },
              timestamp: new Date().toISOString()
            }, null, 2)
          }
        ]
      };
    } catch (error: any) {
      throw new Error(`Failed to get address payments: ${error.message || error}`);
    }
  }

  /**
   * Handle getTransactionCounts tool call (GET /v1/address/transactions/counts)
   */
  private async handleGetTransactionCounts(args: any): Promise<any> {
    const { addresses } = args;

    if (!addresses) {
      throw new Error('Addresses parameter is required');
    }

    try {
      const response = await this.rangeApiClient.get('/v1/address/transactions/counts', { addresses });

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: true,
              data: response.data,
              addresses,
              timestamp: new Date().toISOString()
            }, null, 2)
          }
        ]
      };
    } catch (error: any) {
      throw new Error(`Failed to get transaction counts: ${error.message || error}`);
    }
  }

  /**
   * Handle getTokenTransfers tool call (GET /v2/transfers)
   */
  private async handleGetTokenTransfers(args: any): Promise<any> {
    const {
      explorer,
      network,
      address,
      tx_hash,
      source_networks,
      destination_networks,
      status,
      bridges,
      token_symbols,
      min_usd,
      max_usd,
      start_time,
      end_time,
      scope,
      size = 25,
      cursor
    } = args;

    try {
      const queryParams: Record<string, any> = {};
      if (explorer) queryParams['explorer'] = explorer;
      if (network) queryParams['network'] = network;
      if (address) queryParams['address'] = address;
      if (tx_hash) queryParams['tx_hash'] = tx_hash;
      if (source_networks && source_networks.length > 0) queryParams['source_networks'] = source_networks.join(',');
      if (destination_networks && destination_networks.length > 0) queryParams['destination_networks'] = destination_networks.join(',');
      if (status && status.length > 0) queryParams['status'] = status.join(',');
      if (bridges && bridges.length > 0) queryParams['bridges'] = bridges.join(',');
      if (token_symbols && token_symbols.length > 0) queryParams['token_symbols'] = token_symbols.join(',');
      if (min_usd !== undefined) queryParams['min_usd'] = min_usd;
      if (max_usd !== undefined) queryParams['max_usd'] = max_usd;
      if (start_time) queryParams['start_time'] = start_time;
      if (end_time) queryParams['end_time'] = end_time;
      if (scope) queryParams['scope'] = scope;
      queryParams['size'] = size;
      if (cursor) queryParams['cursor'] = cursor;

      const response = await this.rangeApiClient.get('/v2/transfers', queryParams);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: true,
              data: response.data,
              filters: {
                explorer, network, address, tx_hash,
                source_networks, destination_networks,
                status, bridges, token_symbols,
                min_usd, max_usd, start_time, end_time, scope
              },
              pagination: { size, cursor },
              timestamp: new Date().toISOString()
            }, null, 2)
          }
        ]
      };
    } catch (error: any) {
      throw new Error(`Failed to get token transfers: ${error.message || error}`);
    }
  }

  /**
   * Start the MCP server with connection lifecycle management
   */
  public async start(): Promise<void> {
    if (this.isRunning) {
      throw new Error('Server is already running');
    }

    try {
      console.log('Starting Range MCP Server...');
      console.log(`API Endpoint: ${this.rangeApiClient.getBaseUrl()}`);
      console.log(`API Key: ${this.rangeApiClient.getApiKeyMask()}`);
      
      // Create transport (using stdio for MCP protocol)
      const transport = new StdioServerTransport();
      
      // Connect server to transport
      await this.server.connect(transport);
      
      this.isRunning = true;
      console.log('✅ Range MCP Server started successfully');
      
    } catch (error) {
      console.error('❌ Failed to start Range MCP Server:', error);
      throw error;
    }
  }

  /**
   * Graceful shutdown handling
   */
  public async shutdown(): Promise<void> {
    if (!this.isRunning) {
      return;
    }

    try {
      console.log('Shutting down Range MCP Server...');
      
      // Close server connections
      await this.server.close();
      
      this.isRunning = false;
      console.log('✅ Range MCP Server shut down gracefully');
      
    } catch (error) {
      console.error('❌ Error during server shutdown:', error);
    } finally {
      process.exit(0);
    }
  }

  /**
   * Check if server is running
   */
  public isServerRunning(): boolean {
    return this.isRunning;
  }

  /**
   * Get server instance (for testing)
   */
  public getServer(): Server {
    return this.server;
  }

  /**
   * Get Range API client (for testing)
   */
  public getRangeApiClient(): RangeApiClient {
    return this.rangeApiClient;
  }
}

// Export singleton instance
export const rangeMcpServer = new RangeMcpServer();