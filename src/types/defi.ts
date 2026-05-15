export interface DeFiPosition {
  protocol: string;
  chain: number;
  type: 'lending' | 'borrowing' | 'lp' | 'staking' | 'yield-farm';
  token: string;
  amount: string;
  valueUsd: string;
  apy: string;
  riskScore: number;
}

export interface PortfolioSummary {
  totalValueUsd: string;
  chainBreakdown: Array<{ chainId: number; name: string; valueUsd: string; percentage: number }>;
  positions: DeFiPosition[];
  avgApy: string;
  riskScore: number;
}

export interface YieldOpportunity {
  protocol: string;
  pool: string;
  chainId: number;
  apy: string;
  tvl: string;
  riskScore: number;
  token: string;
  il_risk: string;
}

export interface RiskAnalysis {
  contractAddress: string;
  chainId: number;
  overallScore: number;
  factors: {
    auditStatus: string;
    codeComplexity: number;
    tvlTrend: string;
    exploitHistory: string;
    governanceScore: number;
    oracleRisk: number;
    timelockProtection: boolean;
  };
  recommendation: string;
}

export interface GasRecommendation {
  chainId: number;
  currentGasPrice: string;
  recommendedGasPrice: string;
  optimalWindow: string;
  estimatedSavings: string;
  confidence: number;
}

export interface BridgeRecommendation {
  fromChain: number;
  toChain: number;
  token: string;
  amount: string;
  routes: Array<{
    bridge: string;
    fee: string;
    estimatedTime: string;
    securityScore: number;
    recommended: boolean;
  }>;
}
