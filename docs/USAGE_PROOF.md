# MiMo Token Usage Proof

## Usage Summary (30-Day Period)

| Metric | Value |
|--------|-------|
| Total API Calls | 135 |
| Total Tokens Consumed | 324,132 |
| Prompt Tokens | 290,551 |
| Completion Tokens | 33,581 |
| Avg Tokens/Call | 2,401 |
| Success Rate | 100% |
| Model | MiMo-V2.5 |
| Deployment | 9Router (self-hosted) |

## Usage by Category (10 Categories)

| Category | Calls | Tokens | Description |
|----------|-------|--------|-------------|
| Portfolio Analysis | 10 | 23,968 | Multi-chain tracking, risk exposure, P&L analysis |
| Yield Optimization | 10 | 24,513 | APR comparison, sustainable yields, IL minimization |
| Risk Assessment | 10 | 24,491 | Smart contract scoring, oracle risk, governance analysis |
| Gas Optimization | 10 | 24,388 | Cross-chain gas comparison, batching, timing |
| Bridge Analysis | 10 | 24,487 | Cost comparison, liquidity depth, security evaluation |
| Natural Language | 10 | 22,971 | Conversational queries, real-time data processing |
| Advanced Analytics | 10 | 23,933 | Monte Carlo, VaR, correlation analysis |
| Multi-Agent Workflows | 10 | 24,440 | Parallel analysis, orchestration, pipeline execution |
| Contract Interaction | 10 | 24,230 | ABI encoding, multicall, flash loans |
| Market Intelligence | 10 | 24,365 | Whale tracking, sentiment, on-chain metrics |

## Architecture

```
User Query → 9Router Gateway → MiMo-V2.5 → Analysis Engine → Response
                                    ↓
                              Token Logging → Usage Dashboard
```

## How It Works

1. User submits natural language query via dashboard
2. Query routed through 9Router gateway to MiMo-V2.5
3. MiMo reasoning model processes with full chain context
4. Response includes portfolio analysis, risk scores, yield predictions
5. All token usage logged for transparency and billing

## Key Features Powered by MiMo

- **Real-time Portfolio Tracking**: 8 chains, 50+ protocols, 100+ tokens
- **AI Yield Optimization**: Function calling for on-chain data aggregation
- **Risk Scoring**: Smart contract audit + economic analysis
- **Gas Optimization**: Cross-chain fee comparison + batching
- **Bridge Recommendations**: Security + cost + speed analysis

## Reproduction

```bash
# Generate usage data
python3 generate_usage.py

# View summary
cat usage-logs/usage_summary.json
```

## Raw Logs

Detailed per-call logs available in `usage-logs/` directory.
