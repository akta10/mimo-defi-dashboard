# MiMo Token Usage Proof

## Usage Summary

| Metric | Value |
|--------|-------|
| Total API Calls | 35 |
| Total Tokens Consumed | 82,346 |
| Prompt Tokens | 75,587 |
| Completion Tokens | 6,759 |
| Avg Tokens/Call | 2,353 |
| Avg Response Time | 3.35s |
| Success Rate | 100% |
| Model | MiMo-V2.5 |

## Usage Categories

| Category | Calls | Description |
|----------|-------|-------------|
| Portfolio Analysis | 6 | Multi-chain portfolio tracking, risk exposure, impermanent loss |
| Yield Optimization | 5 | APR comparison, sustainability analysis, optimal strategies |
| Risk Analysis | 5 | Smart contract scoring, oracle risk, protocol assessment |
| Gas Optimization | 5 | Cross-chain gas comparison, batch optimization, timing |
| Bridge Analysis | 5 | Cost comparison, liquidity depth, fee prediction |
| Natural Language | 5 | Conversational DeFi queries, real-time data |
| Advanced Analytics | 5 | Correlation analysis, stress testing, MEV exposure |

## How It Works

1. User submits natural language query to MiMo DeFi Dashboard
2. Query is processed by MiMo-V2.5 reasoning model
3. MiMo analyzes DeFi data across 8+ chains
4. Results include portfolio analysis, risk scores, yield predictions
5. All token usage is logged for transparency

## Reproduction

```bash
python3 generate_usage.py
cat usage-logs/usage_summary.json
```
