# Range MCP Server

A Model Context Protocol (MCP) server that provides blockchain intelligence capabilities through Range's APIs. This server enables AI assistants to access Range's Data API and Risk API for blockchain analytics, risk assessment, and compliance operations.

## 🔐 Security & API Key Setup

**IMPORTANT**: This server requires your own Range API key. No API keys are included in this codebase for security reasons.

### Getting Your Range API Key

1. **Create a Range Account**:
   - Visit [https://app.range.org](https://app.range.org)
   - Sign up for an account or log in if you already have one

2. **Generate API Key**:
   - Navigate to Settings → API Keys
   - Click "Generate New API Key"
   - Copy your API key securely

3. **Configure Environment**:
   - Copy `.env.example` to `.env`
   - Replace `your_range_api_key_here` with your actual API key
   - **NEVER commit your `.env` file to version control**

### Environment Configuration

```bash
# Copy the example file
cp .env.example .env

# Edit the .env file with your API key
# RANGE_API_KEY=your_actual_api_key_here
```

Required environment variables:
- `RANGE_API_KEY`: Your Range API key (required)
- `RANGE_BASE_URL`: API base URL (optional, defaults to production)
- `PORT`: Server port (optional, Railway sets automatically)
- `LOG_LEVEL`: Logging level (optional, defaults to 'info')

## 🚀 Quick Start

### Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your Range API key
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

### Railway Deployment

1. **Fork this Repository**
2. **Connect to Railway**:
   - Visit [railway.app](https://railway.app)
   - Connect your GitHub account
   - Deploy from your forked repository

3. **Set Environment Variables in Railway**:
   - Go to your Railway project dashboard
   - Navigate to Variables tab
   - Add `RANGE_API_KEY` with your API key
   - Optionally set other environment variables

## 📋 Available Scripts

- `npm run build` - Build the TypeScript project
- `npm start` - Start the production server
- `npm run dev` - Start development server with hot reload
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically

## 🔧 Development

### Project Structure

```
src/
├── index.ts          # Main entry point
├── config/           # Configuration management
├── api/              # Range API client
├── mcp/              # MCP server implementation
├── tools/            # MCP tool handlers
└── utils/            # Utility functions
```

### Testing

The project uses Jest for unit testing and fast-check for property-based testing:

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 🛡️ Security Best Practices

1. **Never commit API keys**: Always use environment variables
2. **Use your own API key**: Each deployment should use a unique API key
3. **Rotate keys regularly**: Generate new API keys periodically
4. **Monitor usage**: Check your Range dashboard for API usage
5. **Secure deployment**: Use Railway's environment variable management

## 📚 API Documentation

This server exposes Range's blockchain intelligence capabilities through MCP tools:

- **Address Intelligence**: Balance tracking, transaction history, risk scoring
- **Transaction Analysis**: Risk assessment, simulation, cross-chain monitoring
- **Network Intelligence**: Whale tracking, protocol analytics, volume data
- **Compliance Tools**: IVMS101 entities, sanctions screening, risk management

For detailed API documentation, see the Range platform documentation at [app.range.org](https://app.range.org).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This software is provided as-is. Users are responsible for:
- Obtaining and securing their own Range API keys
- Complying with Range's terms of service
- Ensuring proper security practices in their deployments
- Managing their API usage and billing

## 🆘 Support

- **Range API Issues**: Contact Range support at [app.range.org](https://app.range.org)
- **MCP Server Issues**: Open an issue in this repository
- **Documentation**: Check the Range platform documentation