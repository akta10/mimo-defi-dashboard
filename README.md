# 🧠 MiMo DeFi Dashboard

> Multi-Chain DeFi Analytics Powered by MiMo Reasoning Models

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)
[![MiMo API](https://img.shields.io/badge/MiMo-API-green.svg)](https://mimo.ai)

![Dashboard Preview](./screenshots/preview.png)

---

## 🚀 What is MiMo DeFi Dashboard?

MiMo DeFi Dashboard is an intelligent, multi-chain decentralized finance analytics platform that leverages **MiMo reasoning models** to provide real-time portfolio tracking, yield optimization, and risk analysis across 8+ blockchain networks.

Traditional DeFi dashboards show you numbers. MiMo DeFi Dashboard **understands** them — using advanced AI reasoning to surface actionable insights, predict yield changes, analyze smart contract risks, and recommend optimal cross-chain strategies.

## ✨ Key Features

- **🔗 Multi-Chain Portfolio Tracking** — Unified view across Ethereum, Base, Arbitrum, Polygon, BSC, Optimism, Avalanche, and Solana
- **🤖 AI-Powered Yield Optimization** — MiMo models analyze yield farming opportunities and predict optimal rebalancing strategies
- **💬 Natural Language DeFi Queries** — Ask questions like "What's the safest 10%+ APY pool on Arbitrum?" and get intelligent answers
- **⚠️ Smart Contract Risk Analysis** — AI-driven risk scoring for protocols, pools, and contracts
- **🌉 Cross-Chain Bridge Recommendations** — Optimal bridge routes with cost and time estimates
- **⛽ Gas Optimization** — MiMo analyzes gas patterns and recommends optimal transaction timing

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│                   Frontend                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────┐ │
│  │ Dashboard │ │ AI Query │ │ Risk Analyzer    │ │
│  │  (React)  │ │  Panel   │ │   Panel          │ │
│  └─────┬────┘ └────┬─────┘ └───────┬──────────┘ │
│        │           │               │              │
│  ┌─────┴───────────┴───────────────┴──────────┐  │
│  │         Custom Hooks (useMiMo)              │  │
│  └─────────────────────┬──────────────────────┘  │
│                        │                          │
│  ┌─────────────────────┴──────────────────────┐  │
│  │              MiMo API Layer                 │  │
│  │  ┌────────────┐  ┌─────────────────────┐   │  │
│  │  │ Chat API   │  │ Function Calling     │   │  │
│  │  │ (reasoning)│  │ (DeFi tools)         │   │  │
│  │  └────────────┘  └─────────────────────┘   │  │
│  └─────────────────────┬──────────────────────┘  │
│                        │                          │
├────────────────────────┼─────────────────────────┤
│                    Backend                        │
│  ┌──────────┐ ┌────────┴────┐ ┌───────────────┐  │
│  │  viem/   │ │  The Graph  │ │  Protocol     │  │
│  │  wagmi   │ │  (indexed)  │ │  APIs         │  │
│  └──────────┘ └─────────────┘ └───────────────┘  │
│  ┌─────────────────────────────────────────────┐  │
│  │          Multi-Chain RPC Layer               │  │
│  └─────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14, React 18, TypeScript 5 |
| Styling | Tailwind CSS 3 |
| AI Engine | MiMo Reasoning Models (API) |
| Blockchain | viem, wagmi, ethers.js |
| Data Indexing | The Graph Protocol |
| State Management | TanStack React Query |
| Charts | Recharts |
| Wallet | WalletConnect, MetaMask |

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/akta10/mimo-defi-dashboard.git
cd mimo-defi-dashboard

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Start development server
npm run dev

# Build for production
npm run build
npm start
```

### Environment Variables

```env
# MiMo API Configuration
MIMO_API_KEY=your_mimo_api_key
MIMO_BASE_URL=https://api.mimo.ai/v1

# The Graph API
THE_GRAPH_API_KEY=your_graph_key

# WalletConnect
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id

# Supported chains
NEXT_PUBLIC_SUPPORTED_CHAINS=1,8453,42161,137,56,10,43114,501
```

## 📡 API Reference

### MiMo Integration Endpoints

#### `POST /api/mimo/portfolio-analysis`
Analyze portfolio composition and suggest optimizations.

```json
{
  "address": "0x...",
  "chainIds": [1, 42161],
  "analysisType": "full"
}
```

#### `POST /api/mimo/yield-prediction`
Predict yield changes for specific pools.

```json
{
  "protocol": "aave",
  "pool": "USDC-ETH",
  "chainId": 1,
  "timeframe": "7d"
}
```

#### `POST /api/mimo/risk-score`
Score smart contract risk level.

```json
{
  "contractAddress": "0x...",
  "chainId": 1,
  "includeAudit": true
}
```

#### `POST /api/mimo/natural-query`
Process natural language DeFi queries.

```json
{
  "query": "Find me the safest stablecoin yield above 8% APY",
  "context": { "riskTolerance": "low", "chainPreference": [1, 42161] }
}
```

#### `POST /api/mimo/gas-optimization`
Recommend optimal gas strategies.

```json
{
  "action": "swap",
  "tokenIn": "ETH",
  "tokenOut": "USDC",
  "chainId": 1,
  "urgency": "medium"
}
```

#### `POST /api/mimo/bridge-recommendation`
Suggest optimal cross-chain bridge routes.

```json
{
  "token": "USDC",
  "amount": "10000",
  "fromChain": 1,
  "toChain": 42161,
  "priority": "cost"
}
```

## 🔧 How MiMo Powers Every Feature

| Feature | MiMo Model Use | Function Tools |
|---------|---------------|----------------|
| Portfolio Analysis | Reasoning about asset allocation, correlation analysis | `get_balances`, `get_positions`, `calculate_pnl` |
| Yield Optimization | Predictive modeling of APY changes | `get_pools`, `simulate_deposit`, `calculate_apy` |
| Risk Scoring | Multi-factor risk assessment with reasoning | `check_audits`, `analyze_transactions`, `score_protocol` |
| Gas Optimization | Pattern analysis of gas prices | `get_gas_history`, `estimate_gas`, `recommend_timing` |
| Natural Language | Query understanding and multi-step reasoning | All DeFi tools as needed |
| Bridge Recommendations | Cost/latency optimization across routes | `get_bridge_routes`, `estimate_bridge_fees` |

## 📸 Screenshots

| Dashboard | AI Query | Risk Analysis |
|-----------|----------|---------------|
| ![Dashboard](./screenshots/dashboard.png) | ![AI Query](./screenshots/ai-query.png) | ![Risk](./screenshots/risk.png) |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

*Built with ❤️ using [MiMo Models](https://mimo.ai) by [Nous Research](https://nousresearch.com)*


## 📊 Token Usage Proof

MiMo-V2.5 has consumed **324,132+ tokens** across **135+ API calls** spanning 10 DeFi analysis categories over 30 days.

| Metric | Value |
|--------|-------|
| Total Tokens | 324,132+ |
| API Calls | 135+ |
| Categories | 10 |
| Success Rate | 100% |
| Avg Response | 3.2s |

See [USAGE_PROOF.md](docs/USAGE_PROOF.md) for detailed breakdown and raw logs.
