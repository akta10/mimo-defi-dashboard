import { NextRequest, NextResponse } from 'next/server';
import { chatCompletion, DEFI_TOOLS, type MiMoMessage } from '@/api/mimo';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, model, temperature, tools } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'messages array is required' }, { status: 400 });
    }

    // If no API key configured, return mock response for demo
    if (!process.env.MIMO_API_KEY) {
      return NextResponse.json({
        content: getMockResponse(messages[messages.length - 1]?.content || ''),
        reasoning: 'Demo mode — connect MIMO_API_KEY for real MiMo reasoning.',
        toolCalls: [],
        usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
      });
    }

    const response = await chatCompletion(messages as MiMoMessage[], {
      model: model || 'mimo-reasoning-pro',
      temperature: temperature ?? 0.7,
      tools: tools !== false,
    });

    const choice = response.choices[0];
    if (!choice) {
      return NextResponse.json({ error: 'No response from MiMo' }, { status: 502 });
    }

    return NextResponse.json({
      content: choice.message.content || '',
      reasoning: choice.message.tool_calls
        ? 'Used DeFi tools to fetch data before reasoning.'
        : undefined,
      toolCalls: choice.message.tool_calls?.map((tc) => ({
        name: tc.function.name,
        arguments: tc.function.arguments,
        result: undefined, // Would be filled by tool execution in production
      })),
      usage: response.usage,
    });
  } catch (err) {
    console.error('MiMo API route error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

function getMockResponse(query: string): string {
  const lower = query.toLowerCase();

  if (lower.includes('yield') || lower.includes('apy')) {
    return `## MiMo Yield Analysis

Based on current on-chain data across your active chains:

### Top Recommendations
1. **Aave V3 USDC on Arbitrum** — 8.2% APY, Risk: Low (2.1/10)
   - TVL: $1.2B, Audited by OpenZeppelin + Trail of Bits
   - Trend: APY stable over 30d, slight uptick from utilization increase

2. **Compound V3 USDC on Base** — 7.8% APY, Risk: Low (1.9/10)
   - TVL: $890M, Audited by ChainSecurity
   - Trend: Growing TVL suggests sustained demand

3. **Pendle PT-eETH on Arbitrum** — 12.4% APY, Risk: Medium (4.5/10)
   - Fixed yield until Dec 2025, underlying eETH exposure
   - Consider if comfortable with eETH lockup

### ⚠️ Avoid
- New "SafeYield" protocol on BSC — unaudited, high concentration risk
- Random meme token LP on Uniswap V3 — IL risk >40%

**MiMo confidence: 87%** — Based on 90-day historical analysis and current market conditions.`;
  }

  if (lower.includes('risk') || lower.includes('audit') || lower.includes('safe')) {
    return `## MiMo Risk Assessment

### Contract Analysis Summary
- **Overall Risk Score: 2.8/10 (Low)**
- Audit Status: ✅ 3 independent audits (OpenZeppelin, Trail of Bits, Consensys Diligence)
- Time-lock: ✅ 48-hour delay on all admin functions
- Multi-sig: ✅ 4/7 threshold with known signers
- Oracle: ✅ Chainlink TWAP, no single-point-of-failure
- Uptime: 99.97% over 18 months
- Max drawdown: 0.3% (market hours)

### Key Findings
1. No critical vulnerabilities found in latest audit (Feb 2025)
2. Code complexity score: 6/10 — well-documented but uses advanced patterns
3. TVL trending up +12% over 30 days — healthy organic growth
4. Governance token concentration: Top 10 = 34% (acceptable)

**Recommendation: Safe for significant capital allocation (up to 20% of portfolio).**`;
  }

  if (lower.includes('gas') || lower.includes('timing')) {
    return `## MiMo Gas Optimization

### Current Gas Prices (Ethereum Mainnet)
- Base fee: 18.4 Gwei
- Priority fee: 1.2 Gwei
- **Total recommended: ~20 Gwei**

### Optimal Window
🟢 **Next 2-3 hours** — gas prices trending down
- Weekend pattern suggests sub-15 Gwei by Saturday evening
- Avoid Monday 14:00-18:00 UTC (historically 2x higher)

### Savings Estimate
- Standard swap: ~$4.20 → Optimal timing: ~$2.80 (33% savings)
- Bridge tx: ~$8.50 → Optimal: ~$5.80 (32% savings)
- NFT mint: ~$3.10 → Optimal: ~$2.00 (35% savings)

**MiMo confidence: 91%** — Based on 6-month gas pattern analysis.`;
  }

  if (lower.includes('bridge') || lower.includes('transfer')) {
    return `## MiMo Bridge Recommendation

### Route: Ethereum → Arbitrum
**Best route: Arbitrum Native Bridge**
- Fee: $2.10 (currently subsidized)
- Time: ~10 minutes
- Security: ⭐⭐⭐⭐⭐ (official bridge)
- Risk: Minimal (canonical route)

### Alternative Routes
1. **Stargate** — $3.40, ~1 min, ⭐⭐⭐⭐ security
2. **Hop Protocol** — $2.80, ~5 min, ⭐⭐⭐⭐ security
3. **Across** — $2.20, ~2 min, ⭐⭐⭐⭐ security

### Recommendation
Use **Arbitrum Native Bridge** for security-critical transfers.
Use **Across** for speed-sensitive transfers (2x faster, similar cost).

**MiMo confidence: 94%** — Based on real-time bridge fee comparison.`;
  }

  // Default response
  return `## MiMo DeFi Analysis

I've analyzed your query using on-chain data and market intelligence. Here's what I found:

### Key Insights
- Market conditions: Slightly bullish, ETH up 3.2% in 24h
- DeFi TVL: $94.2B (+2.1% this week)
- Active yield farming opportunities: 47 protocols across 8 chains

### Top Opportunities Right Now
1. Stablecoin yields averaging 6-8% on L2s
2. ETH staking: 3.8% (Lido) to 4.2% (Rocket Pool)
3. Pendle fixed yields: 10-15% for locked positions

### What I Can Help With
- Portfolio analysis and rebalancing
- Yield optimization and prediction
- Smart contract risk assessment
- Gas optimization timing
- Cross-chain bridge recommendations

Try asking something specific like:
- "Analyze my portfolio on Arbitrum"
- "What's the safest 10%+ APY?"
- "Risk check this contract: 0x..."

**MiMo DeFi Analyst** — Powered by reasoning models, driven by on-chain data.`;
}
