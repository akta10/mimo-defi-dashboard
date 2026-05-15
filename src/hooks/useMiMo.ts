'use client';

import { useState, useCallback } from 'react';
import type { MiMoMessage } from '@/api/mimo';

const MIMO_BASE_URL = process.env.NEXT_PUBLIC_MIMO_BASE_URL || 'https://api.mimo.ai/v1';

interface MiMoState {
  loading: boolean;
  error: string | null;
  response: string | null;
  reasoning: string | null;
}

interface MiMoResult {
  content: string;
  reasoning?: string;
  toolCalls?: Array<{ name: string; arguments: string; result?: string }>;
  usage?: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
}

async function callMiMo(
  messages: MiMoMessage[],
  options: { model?: string; temperature?: number; tools?: boolean } = {}
): Promise<MiMoResult> {
  const response = await fetch('/api/mimo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages,
      model: options.model || 'mimo-reasoning-pro',
      temperature: options.temperature ?? 0.7,
      tools: options.tools ?? true,
    }),
  });

  if (!response.ok) {
    throw new Error(`MiMo API error: ${response.statusText}`);
  }

  return response.json();
}

// ── Hook: useMiMo ──

export function useMiMo() {
  const [state, setState] = useState<MiMoState>({
    loading: false,
    error: null,
    response: null,
    reasoning: null,
  });

  const query = useCallback(async (userMessage: string, systemPrompt?: string) => {
    setState({ loading: true, error: null, response: null, reasoning: null });

    try {
      const messages: MiMoMessage[] = [];

      if (systemPrompt) {
        messages.push({ role: 'system', content: systemPrompt });
      } else {
        messages.push({
          role: 'system',
          content: `You are MiMo DeFi Analyst. Use available tools to fetch real blockchain data before answering. Be precise with numbers, include risk assessments, and provide actionable recommendations.`,
        });
      }

      messages.push({ role: 'user', content: userMessage });

      const result = await callMiMo(messages);

      setState({
        loading: false,
        error: null,
        response: result.content,
        reasoning: result.reasoning || null,
      });

      return result;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setState({ loading: false, error: errorMsg, response: null, reasoning: null });
      throw err;
    }
  }, []);

  const analyzePortfolio = useCallback(async (address: string, chainIds: number[]) => {
    return query(
      `Analyze the complete DeFi portfolio for wallet ${address} across chains ${chainIds.join(', ')}. Provide: total value breakdown, yield optimization, risk assessment, and rebalancing suggestions.`,
      `You are MiMo DeFi Analyst — a multi-chain portfolio analyst. Fetch wallet balances and positions, then analyze optimal allocations. Include specific protocol names and expected yield improvements.`
    );
  }, [query]);

  const predictYield = useCallback(async (protocol: string, pool: string, chainId: number) => {
    return query(
      `Predict yield changes for ${protocol} pool ${pool} on chain ${chainId} over the next 7 days. Include historical trends, TVL analysis, and confidence level.`,
      `You are MiMo DeFi Analyst — a yield prediction specialist. Use historical data patterns and protocol incentives to forecast APY changes.`
    );
  }, [query]);

  const scoreRisk = useCallback(async (contractAddress: string, chainId: number) => {
    return query(
      `Analyze smart contract risk for ${contractAddress} on chain ${chainId}. Evaluate audits, code complexity, TVL trends, exploit history, governance, and oracle dependencies. Provide a risk score 1-10.`,
      `You are MiMo DeFi Analyst — a smart contract risk assessor. Analyze multiple risk vectors and provide a comprehensive risk score with detailed breakdown.`
    );
  }, [query]);

  const optimizeGas = useCallback(async (chainId: number, actionType: string) => {
    return query(
      `Optimize gas for a ${actionType} on chain ${chainId}. Analyze current gas prices, historical patterns, and recommend optimal timing.`,
      `You are MiMo DeFi Analyst — a gas optimization expert. Analyze on-chain gas data and recommend the cheapest time to transact.`
    );
  }, [query]);

  const recommendBridge = useCallback(async (token: string, amount: string, fromChain: number, toChain: number) => {
    return query(
      `Find the best bridge route for ${amount} ${token} from chain ${fromChain} to ${toChain}. Compare fees, time, and security. Recommend the optimal route.`,
      `You are MiMo DeFi Analyst — a cross-chain bridge specialist. Compare all available bridge options and recommend based on cost, speed, and security.`
    );
  }, [query]);

  return {
    ...state,
    query,
    analyzePortfolio,
    predictYield,
    scoreRisk,
    optimizeGas,
    recommendBridge,
  };
}

// ── Hook: usePortfolioAnalysis (with polling) ──

export function usePortfolioAnalysis(address: string | null, chainIds: number[]) {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!address) return;
    setLoading(true);
    setError(null);
    try {
      const result = await callMiMo([
        {
          role: 'system',
          content: 'You are MiMo DeFi Analyst. Fetch and analyze portfolio data. Return structured JSON with positions, values, yields, and risk scores.',
        },
        {
          role: 'user',
          content: `Analyze portfolio for ${address} on chains ${chainIds.join(',')}. Return: { positions: [...], totalValue: string, avgYield: string, riskScore: number, recommendations: [...] }`,
        },
      ]);
      setData(result.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze portfolio');
    } finally {
      setLoading(false);
    }
  }, [address, chainIds]);

  return { data, loading, error, refresh };
}
