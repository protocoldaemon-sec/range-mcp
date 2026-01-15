#!/usr/bin/env node

/**
 * Test script for all Range API endpoints from endpoint.md
 */

import axios from 'axios';

const API_KEY = process.env.RANGE_API_KEY;
if (!API_KEY) {
  console.error('❌ RANGE_API_KEY not found in environment. Please set it in .env file.');
  process.exit(1);
}
const BASE_URL = 'https://api.range.org';

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  },
  timeout: 30000
});

async function test(name, fn) {
  console.log(`\n🧪 ${name}...`);
  try {
    const result = await fn();
    console.log('✅ Success:', JSON.stringify(result.data, null, 2).substring(0, 500));
    return true;
  } catch (error) {
    console.log('❌ Error:', error.response?.status, error.response?.data || error.message);
    return false;
  }
}

async function runTests() {
  console.log('🚀 Testing All Range API Endpoints');
  console.log(`🔑 API Key: ${API_KEY.substring(0, 10)}...`);
  console.log(`🌐 Base URL: ${BASE_URL}`);

  const results = [];

  // 1. GET /v2/addresses - Search Address Details
  results.push(await test('GET /v2/addresses (Search Addresses)', () =>
    client.get('/v2/addresses', { params: { networks: 'solana', status: 'malicious' } })
  ));

  // 2. GET /v1/address/labels/search - Search Address Labels
  results.push(await test('GET /v1/address/labels/search', () =>
    client.get('/v1/address/labels/search', { params: { searchString: 'binance', validateSearch: true } })
  ));

  // 3. GET /v1/address/stats - Get Address Statistics
  const testAddress = 'HWc6U9G1Mem19x7SBhBNCDvL4MRZDqGJqvB6cjEZUxEN';
  results.push(await test('GET /v1/address/stats', () =>
    client.get('/v1/address/stats', { params: { address: testAddress, network: 'solana' } })
  ));

  // 4. GET /v1/address/transaction - Get Transaction Details
  results.push(await test('GET /v1/address/transaction', () =>
    client.get('/v1/address/transaction', { params: { hash: '5eykt4UsFv8P8NJdTREpY1vzqKqZKvdpKuc147dw2N9d' } })
  ));

  // 5. GET /v1/address/payments - Get Address Payments
  results.push(await test('GET /v1/address/payments', () =>
    client.get('/v1/address/payments', { params: { address: testAddress, network: 'solana', limit: 5 } })
  ));

  // 6. GET /v1/address/transactions/counts - Get Transaction Counts
  results.push(await test('GET /v1/address/transactions/counts', () =>
    client.get('/v1/address/transactions/counts', { params: { addresses: testAddress } })
  ));

  // 7. GET /v1/address/balance - Get Current Token Balances
  results.push(await test('GET /v1/address/balance', () =>
    client.get('/v1/address/balance', { params: { address: testAddress, network: 'solana' } })
  ));

  // 8. POST /v1/protocols/transactions - Get Cross-Chain Transactions
  results.push(await test('POST /v1/protocols/transactions', () =>
    client.post('/v1/protocols/transactions', {}, { params: { pageSize: '3' } })
  ));

  // 9. GET /v2/transfers - Get Token Transfers
  results.push(await test('GET /v2/transfers', () =>
    client.get('/v2/transfers', { params: { size: 3, status: 'SUCCEEDED' } })
  ));

  // 10. GET /v1/risk/address - Get Address Risk Score
  results.push(await test('GET /v1/risk/address', () =>
    client.get('/v1/risk/address', { params: { address: testAddress, network: 'solana' } })
  ));

  // Summary
  const passed = results.filter(r => r).length;
  const total = results.length;
  console.log(`\n📊 Results: ${passed}/${total} tests passed`);
}

runTests().catch(console.error);
