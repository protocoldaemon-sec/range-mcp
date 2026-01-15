# Project Structure

## Root Directory
```
├── .env                 # API key configuration (not committed)
├── .env.example         # Template for environment variables
├── range-llms.txt       # Comprehensive API documentation index
├── LICENSE              # MIT License
├── .git/                # Git repository metadata
└── .kiro/               # Kiro AI assistant configuration
    └── steering/        # AI guidance documents
```

## Documentation Organization
The main documentation is consolidated in `range-llms.txt` which contains:

### API Reference Sections
- **Address Information**: Balance tracking, counterparties, transactions
- **Network Information**: Cross-chain data, volume analytics, whale tracking
- **Protocols**: Cross-chain transaction monitoring
- **Tokens**: Supported token listings and network-specific tokens
- **Transactions**: Quote generation, transaction creation, status tracking
- **Risk Assessment**: Address scoring, payment risk, sanctions screening
- **Compliance**: IVMS101 person entity management
- **Simulation**: Transaction preview and risk analysis

### Integration Guides
- Getting started tutorials
- Authentication setup
- Test environment configuration
- Chain-specific transaction examples (Solana, EVM)

## File Conventions
- **Environment files**: Use `.env` for local configuration, never commit secrets
- **Documentation**: Maintain comprehensive API endpoint listings in `range-llms.txt`
- **Licensing**: MIT License for open-source components
- **Configuration**: Store AI assistant rules in `.kiro/steering/` directory

## Development Workflow
1. Reference `range-llms.txt` for API endpoint documentation
2. Configure environment using `.env.example` as template
3. Follow steering rules for consistent development practices
4. Maintain documentation updates in the main reference file