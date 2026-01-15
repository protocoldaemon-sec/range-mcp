#!/usr/bin/env node

/**
 * Test script for Range MCP Server
 * Tests the Solana address: HWc6U9G1Mem19x7SBhBNCDvL4MRZDqGJqvB6cjEZUxEN
 */

// Load configuration first before importing server
if (!process.env.RANGE_API_KEY) {
  console.error('❌ RANGE_API_KEY not found in environment. Please set it in .env file.');
  process.exit(1);
}
process.env.RANGE_BASE_URL = process.env.RANGE_BASE_URL || 'https://app.range.org/api';

import { configManager } from './dist/config/index.js';
import { RangeMcpServer } from './dist/server/McpServer.js';

async function testAddress() {
  try {
    console.log('🚀 Testing Range MCP Server with Solana address...');
    
    // Load configuration first
    configManager.loadConfig();
    console.log('✅ Configuration loaded');
    
    // Create server instance
    const server = new RangeMcpServer();
    console.log('✅ Server instance created');
    
    // Test address
    const testAddress = 'HWc6U9G1Mem19x7SBhBNCDvL4MRZDqGJqvB6cjEZUxEN';
    const network = 'solana';
    
    console.log(`\n📍 Testing address: ${testAddress}`);
    console.log(`🌐 Network: ${network}`);
    
    // Test 1: Get Address Info
    console.log('\n1️⃣ Testing getAddressInfo...');
    try {
      const infoResult = await server['handleGetAddressInfo']({ 
        address: testAddress, 
        network: network 
      });
      const infoData = JSON.parse(infoResult.content[0].text);
      console.log('✅ Address Info:', JSON.stringify(infoData, null, 2));
    } catch (error) {
      console.log('❌ Address Info Error:', error.message);
    }
    
    // Test 2: Get Address Balance
    console.log('\n2️⃣ Testing getAddressBalance...');
    try {
      const balanceResult = await server['handleGetAddressBalance']({ 
        address: testAddress, 
        network: network 
      });
      const balanceData = JSON.parse(balanceResult.content[0].text);
      console.log('✅ Address Balance:', JSON.stringify(balanceData, null, 2));
    } catch (error) {
      console.log('❌ Address Balance Error:', error.message);
    }
    
    // Test 3: Get Address Risk Score
    console.log('\n3️⃣ Testing getAddressRiskScore...');
    try {
      const riskResult = await server['handleGetAddressRiskScore']({ 
        address: testAddress, 
        network: network 
      });
      const riskData = JSON.parse(riskResult.content[0].text);
      console.log('✅ Address Risk Score:', JSON.stringify(riskData, null, 2));
    } catch (error) {
      console.log('❌ Address Risk Score Error:', error.message);
    }
    
    // Test 4: Get Address Transactions (limited to 3 for brevity)
    console.log('\n4️⃣ Testing getAddressTransactions...');
    try {
      const txResult = await server['handleGetAddressTransactions']({ 
        address: testAddress, 
        network: network,
        limit: 3
      });
      const txData = JSON.parse(txResult.content[0].text);
      console.log('✅ Address Transactions:', JSON.stringify(txData, null, 2));
    } catch (error) {
      console.log('❌ Address Transactions Error:', error.message);
    }
    
    // Test 5: Get Address Counterparties (limited to 3 for brevity)
    console.log('\n5️⃣ Testing getAddressCounterparties...');
    try {
      const counterpartiesResult = await server['handleGetAddressCounterparties']({ 
        address: testAddress, 
        network: network,
        limit: 3
      });
      const counterpartiesData = JSON.parse(counterpartiesResult.content[0].text);
      console.log('✅ Address Counterparties:', JSON.stringify(counterpartiesData, null, 2));
    } catch (error) {
      console.log('❌ Address Counterparties Error:', error.message);
    }
    
    console.log('\n🎉 Testing completed!');
    
  } catch (error) {
    console.error('💥 Test failed:', error);
    process.exit(1);
  }
}

// Run the test
testAddress().catch(console.error);