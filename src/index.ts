/**
 * Range MCP Server Entry Point
 * 
 * This is the main entry point for the Range MCP Server.
 * It initializes the MCP server with Express transport and handles the application lifecycle.
 */

import { configManager } from './config/index.js';
import { rangeMcpServer } from './server/index.js';

async function main(): Promise<void> {
  try {
    // Validate environment on startup
    configManager.validateEnvironment();
    console.log('✅ Range MCP Server - Configuration validated successfully');

    // Start the MCP server
    await rangeMcpServer.start();
    
    // Keep the process running
    console.log('🚀 Range MCP Server is ready to accept connections');
    
  } catch (error) {
    console.error('❌ Failed to start Range MCP Server:', error);
    process.exit(1);
  }
}

// Start the server
main().catch((error) => {
  console.error('❌ Unhandled error in main:', error);
  process.exit(1);
});

export {};