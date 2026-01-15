#!/usr/bin/env node

/**
 * Test script for Range API cross-chain transactions endpoint
 * POST /v1/protocols/transactions
 */

import axios from 'axios';

const API_KEY = process.env.RANGE_API_KEY;
if (!API_KEY) {
  console.error('❌ RANGE_API_KEY not found in environment. Please set it in .env file.');
  process.exit(1);
}
const BASE_URL = 'https://api.range.org';

async function testCrossChainTransactions() {
  try {
    console.log('🚀 Testing Range API Cross-Chain Transactions...');
    console.log(`🔑 API Key: ${API_KEY.substring(0, 10)}...`);
    console.log(`🌐 Base URL: ${BASE_URL}\n`);
    
    const client = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 30000
    });
    
    // Test 1: Basic request - get recent cross-chain transactions
    console.log('1️⃣ Testing POST /v1/protocols/transactions (Basic)...');
    try {
      const response = await client.post('/v1/protocols/transactions', {}, {
        params: { pageSize: '5' }
      });
      console.log('✅ Success:', JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.log('❌ Error:', error.response?.status, error.response?.data || error.message);
    }
    
    // Test 2: Filter by protocol (IBC)
    console.log('\n2️⃣ Testing with protocol filter (IBC)...');
    try {
      const response = await client.post('/v1/protocols/transactions', {}, {
        params: { 
          protocol: 'IBC',
          pageSize: '3'
        }
      });
      console.log('✅ Success:', JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.log('❌ Error:', error.response?.status, error.response?.data || error.message);
    }
    
    // Test 3: Filter by sender network
    console.log('\n3️⃣ Testing with senderNetwork filter (cosmoshub-4)...');
    try {
      const response = await client.post('/v1/protocols/transactions', {}, {
        params: { 
          senderNetwork: 'cosmoshub-4',
          pageSize: '3'
        }
      });
      console.log('✅ Success:', JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.log('❌ Error:', error.response?.status, error.response?.data || error.message);
    }
    
    // Test 4: Filter by time range
    console.log('\n4️⃣ Testing with time range filter...');
    try {
      const response = await client.post('/v1/protocols/transactions', {}, {
        params: { 
          startTime: '2025-01-01T00:00:00Z',
          endTime: '2025-01-15T23:59:59Z',
          pageSize: '3'
        }
      });
      console.log('✅ Success:', JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.log('❌ Error:', error.response?.status, error.response?.data || error.message);
    }
    
    // Test 5: Filter by direction
    console.log('\n5️⃣ Testing with direction filter (incoming)...');
    try {
      const response = await client.post('/v1/protocols/transactions', {}, {
        params: { 
          direction: 'incoming',
          pageSize: '3'
        }
      });
      console.log('✅ Success:', JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.log('❌ Error:', error.response?.status, error.response?.data || error.message);
    }
    
    // Test 6: Test scroll pagination
    console.log('\n6️⃣ Testing scroll pagination...');
    try {
      const response = await client.post('/v1/protocols/transactions', {}, {
        params: { 
          useScroll: 'true',
          scrollBatchSize: '2'
        }
      });
      console.log('✅ Success:', JSON.stringify(response.data, null, 2));
      
      // If we got a scrollId, try to continue
      if (response.data.scrollId && response.data.hasMore) {
        console.log('\n   📜 Continuing with scrollId...');
        const nextResponse = await client.post('/v1/protocols/transactions', 
          { scrollId: response.data.scrollId },
          { params: { useScroll: 'true', scrollBatchSize: '2' } }
        );
        console.log('✅ Next page:', JSON.stringify(nextResponse.data, null, 2));
      }
    } catch (error) {
      console.log('❌ Error:', error.response?.status, error.response?.data || error.message);
    }
    
    console.log('\n🎉 Cross-chain transactions testing completed!');
    
  } catch (error) {
    console.error('💥 Test failed:', error.message);
    process.exit(1);
  }
}

// Run the test
testCrossChainTransactions().catch(console.error);
