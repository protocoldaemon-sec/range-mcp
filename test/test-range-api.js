#!/usr/bin/env node

/**
 * Direct Range API test
 * Tests the Solana address: HWc6U9G1Mem19x7SBhBNCDvL4MRZDqGJqvB6cjEZUxEN
 */

import axios from 'axios';

const API_KEY = process.env.RANGE_API_KEY;
if (!API_KEY) {
  console.error('❌ RANGE_API_KEY not found in environment. Please set it in .env file.');
  process.exit(1);
}
const BASE_URL = 'https://api.range.org';

async function testAddress() {
  try {
    console.log('🚀 Testing Range API with Solana address...');
    console.log(`🔑 API Key: ${API_KEY.substring(0, 10)}...`);
    console.log(`🌐 Base URL: ${BASE_URL}`);
    
    const testAddress = 'HWc6U9G1Mem19x7SBhBNCDvL4MRZDqGJqvB6cjEZUxEN';
    const network = 'solana';
    
    console.log(`\n📍 Testing address: ${testAddress}`);
    console.log(`🌐 Network: ${network}\n`);
    
    const client = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 30000
    });
    
    // Test 1: Get Address Info (v1/address with query params)
    console.log('1️⃣ Testing GET /v1/address (Address Info)...');
    try {
      const response = await client.get('/v1/address', {
        params: { address: testAddress, network }
      });
      console.log('✅ Success:', JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.log('❌ Error:', error.response?.status, error.response?.data || error.message);
    }
    
    // Test 2: Get Address Risk Score (v1/risk/address with query params)
    console.log('\n2️⃣ Testing GET /v1/risk/address (Risk Score)...');
    try {
      const response = await client.get('/v1/risk/address', {
        params: { address: testAddress, network }
      });
      console.log('✅ Success:', JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.log('❌ Error:', error.response?.status, error.response?.data || error.message);
    }
    
    // Test 3: Get Sanctions/Blacklist Check (v1/risk/sanctions/{address})
    console.log('\n3️⃣ Testing GET /v1/risk/sanctions/{address} (Sanctions Check)...');
    try {
      const response = await client.get(`/v1/risk/sanctions/${testAddress}`);
      console.log('✅ Success:', JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.log('❌ Error:', error.response?.status, error.response?.data || error.message);
    }
    
    // Test 4: Get Address Statistics
    console.log('\n4️⃣ Testing GET /v1/address/stats (Statistics)...');
    try {
      const response = await client.get('/v1/address/stats', {
        params: { address: testAddress, network }
      });
      console.log('✅ Success:', JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.log('❌ Error:', error.response?.status, error.response?.data || error.message);
    }
    
    // Test 5: Get Address Connections/Counterparties
    console.log('\n5️⃣ Testing GET /v1/address/connections (Counterparties)...');
    try {
      const response = await client.get('/v1/address/connections', {
        params: { address: testAddress, network, limit: 5 }
      });
      console.log('✅ Success:', JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.log('❌ Error:', error.response?.status, error.response?.data || error.message);
    }
    
    console.log('\n🎉 Testing completed!');
    
  } catch (error) {
    console.error('💥 Test failed:', error.message);
    process.exit(1);
  }
}

// Run the test
testAddress().catch(console.error);