# Technology Stack

## API Architecture
- **REST APIs**: Primary interface for all Range services
- **Authentication**: API key-based authentication via Authorization header
- **Base URL**: `app.range.org` for production API access
- **Response Format**: JSON with standardized error handling

## Supported Networks
Range supports 18+ blockchain networks including:
- **EVM chains**: Ethereum and compatible networks
- **Solana**: Native Solana blockchain support
- **Cosmos SDK**: Cosmos ecosystem chains
- **Cross-chain protocols**: IBC, CCTP for interoperability

## Key Technologies
- **IVMS101 Standard**: Travel Rule compliance for person entities
- **Machine Learning**: Risk scoring and threat detection models
- **Real-time Data**: Live blockchain monitoring and analytics
- **Transaction Simulation**: Pre-execution risk assessment

## Environment Configuration
- Use `.env` file for API key storage
- Required: `RANGE_API_KEY` environment variable
- Example configuration available in `.env.example`

## Common Commands
Since this is a documentation project, typical operations involve:
- API testing and validation
- Documentation updates and maintenance
- Integration example development
- Compliance record management

## Development Notes
- All API endpoints require proper authentication
- Rate limiting applies to API requests
- Use appropriate network slugs/aliases for chain identification
- Follow IVMS101 standards for compliance features