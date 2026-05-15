// MiMo API Integration — DeFi-specific chat completions and function calling

const MIMO_BASE_URL = process.env.MIMO_BASE_URL || 'https://api.mimo.ai/v1';

export interface MiMoMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
  tool_call_id?: string;
  tool_calls?: MiMoToolCall[];
}

export interface MiMoToolCall {
  id: string;
  type: 'function';
  function: { name: string; arguments: string };
}

export interface MiMoTool {
  type: 'function';
  function: {
    name: string;
    description: string;
    parameters: Record<string, unknown>;
  };
}

export interface MiMoChatCompletionRequest {
  model: string;
  messages: MiMoMessage[];
  tools?: MiMoTool[];
  tool_choice?: 'auto' | 'none' | { type: 'function'; function: { name: string } };
  temperature?: number;
  max_tokens?: number;
}

export interface MiMoChatCompletionResponse {
  id: string;
  choices: Array<{
    index: number;
    message: MiMoMessage;
    finish_reason: string;
  }>;
  usage: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
}

// ── DeFi-specific tool definitions for MiMo function calling ──

export const DEFI_TOOLS: MiMoTool[] = [
  {
    type: 'function',
    function: {
      name: 'get_wallet_balances',
      description: 'Fetch token balances across all supported chains for a given wallet address',
      parameters: {
        type: 'object',
        properties: {
          address: { type: 'string', description: 'Wallet address (0x...)' },
          chain_ids: { type: 'array', items: { type: 'number' }, description: 'Chain IDs to query' },
        },
        required: ['address'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_defi_positions',
      description: 'Get all DeFi positions (LP, lending, staking) for a wallet',
      parameters: {
        type: 'object',
        properties: {
          address: { type: 'string', description: 'Wallet address' },
          protocol: { type: 'string', description: 'Specific protocol filter (optional)' },
        },
        required: ['address'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_yield_opportunities',
      description: 'Find yield farming opportunities across protocols',
      parameters: {
        type: 'object',
        properties: {
          chain_id: { type: 'number', description: 'Target chain' },
          min_apy: { type: 'number', description: 'Minimum APY threshold' },
          max_risk: { type: 'string', enum: ['low', 'medium', 'high'], description: 'Risk tolerance' },
          token: { type: 'string', description: 'Preferred token to farm with' },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'analyze_contract_risk',
      description: 'Analyze smart contract risk factors and generate a risk score',
      parameters: {
        type: 'object',
        properties: {
          contract_address: { type: 'string', description: 'Contract to analyze' },
          chain_id: { type: 'number', description: 'Chain where contract is deployed' },
          include_audit_data: { type: 'boolean', description: 'Include audit information' },
        },
        required: ['contract_address', 'chain_id'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_gas_optimization',
      description: 'Analyze current gas prices and recommend optimal transaction timing',
      parameters: {
        type: 'object',
        properties: {
          chain_id: { type: 'number', description: 'Target chain' },
          action_type: { type: 'string', description: 'Transaction type (swap, bridge, stake)' },
          urgency: { type: 'string', enum: ['low', 'medium', 'high'], description: 'How urgent is the transaction' },
        },
        required: ['chain_id'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'recommend_bridge',
      description: 'Find optimal cross-chain bridge routes with fee and time estimates',
      parameters: {
        type: 'object',
        properties: {
          token: { type: 'string', description: 'Token symbol to bridge' },
          amount: { type: 'string', description: 'Amount to bridge' },
          from_chain: { type: 'number', description: 'Source chain ID' },
          to_chain: { type: 'number', description: 'Destination chain ID' },
          priority: { type: 'string', enum: ['cost', 'speed', 'security'], description: 'Optimization priority' },
        },
        required: ['token', 'amount', 'from_chain', 'to_chain'],
      },
    },
  },
];

// ── Core API functions ──

export async function chatCompletion(
  messages: MiMoMessage[],
  options: { model?: string; tools?: boolean; temperature?: number } = {}
): Promise<MiMoChatCompletionResponse> {
  const response = await fetch(`${MIMO_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.MIMO_API_KEY}`,
    },
    body: JSON.stringify({
      model: options.model || 'mimo-reasoning-pro',
      messages,
      tools: options.tools !== false ? DEFI_TOOLS : undefined,
      tool_choice: options.tools !== false ? 'auto' : undefined,
      temperature: options.temperature ?? 0.7,
      max_tokens: 4096,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`MiMo API error (${response.status}): ${error}`);
  }

  return response.json();
}

// ── High-level DeFi functions ──

const SYSTEM_PROMPT = `You are MiMo DeFi Analyst, an expert AI assistant for decentralized finance.
You analyze multi-chain portfolios, predict yields, assess risks, and optimize gas usage.
Always provide structured, actionable insights. When recommending actions, include:
- Specific protocol/pool names and addresses
- Risk assessment (1-10 scale)
- Expected APY/yield
- Gas cost estimates
- Time horizon recommendations
Be precise with numbers. Use current market data from tool calls.`;

export async function analyzePortfolio(address: string, chainIds: number[]) {
  return chatCompletion([
    { role: 'system', content: SYSTEM_PROMPT },
    {
      role: 'user',
      content: `Analyze the complete DeFi portfolio for wallet ${address} across chains ${chainIds.join(', ')}. Provide:
1. Total value breakdown by chain and protocol
2. Yield optimization recommendations (what to keep, what to move)
3. Risk assessment for each position
4. Rebalancing suggestions with expected yield improvement`,
    },
  ]);
}

export async function predictYield(protocol: string, pool: string, chainId: number, timeframe: string) {
  return chatCompletion([
    { role: 'system', content: SYSTEM_PROMPT },
    {
      role: 'user',
      content: `Predict yield changes for ${protocol} pool ${pool} on chain ${chainId} over the next ${timeframe}.
Analyze: historical APY trends, TVL changes, token price correlations, protocol token incentives.
Provide: current APY, predicted APY range, confidence level, recommended action (enter/hold/exit).`,
    },
  ]);
}

export async function scoreRisk(contractAddress: string, chainId: number) {
  return chatCompletion([
    { role: 'system', content: SYSTEM_PROMPT },
    {
      role: 'user',
      content: `Perform a comprehensive risk analysis for contract ${contractAddress} on chain ${chainId}.
Evaluate: audit status, code complexity, TVL trends, exploit history, governance centralization, oracle dependencies, time-lock protections.
Output: risk score (1-10), detailed breakdown by category, specific vulnerabilities identified, recommendations.`,
    },
  ]);
}

export async function optimizeGas(chainId: number, actionType: string, urgency: string) {
  return chatCompletion([
    { role: 'system', content: SYSTEM_PROMPT },
    {
      role: 'user',
      content: `Optimize gas for a ${actionType} on chain ${chainId}. Urgency level: ${urgency}.
Analyze current gas prices, historical patterns, pending mempool transactions.
Provide: recommended gas price, optimal submission time, estimated savings vs standard timing.`,
    },
  ]);
}

export async function processNaturalQuery(query: string, context?: Record<string, unknown>) {
  const contextStr = context ? `\nUser context: ${JSON.stringify(context)}` : '';
  return chatCompletion([
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: `${query}${contextStr}\n\nUse available tools to fetch real data before answering. Provide specific, actionable recommendations.` },
  ]);
}
