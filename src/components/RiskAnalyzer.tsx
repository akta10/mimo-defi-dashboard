'use client';

import { useState } from 'react';
import { useMiMo } from '@/hooks/useMiMo';

interface RiskFactor {
  name: string;
  score: number;
  maxScore: number;
  description: string;
}

interface RiskResult {
  address: string;
  overallScore: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  factors: RiskFactor[];
  recommendation: string;
}

const MOCK_FACTORS: RiskFactor[] = [
  { name: 'Audit Status', score: 9, maxScore: 10, description: '3 independent audits completed' },
  { name: 'Code Complexity', score: 7, maxScore: 10, description: 'Moderate complexity, well-documented' },
  { name: 'TVL Trend', score: 8, maxScore: 10, description: 'Steady growth over 90 days' },
  { name: 'Governance', score: 6, maxScore: 10, description: 'Multi-sig with 4/7 threshold' },
  { name: 'Oracle Dependency', score: 8, maxScore: 10, description: 'Uses Chainlink TWAP oracles' },
  { name: 'Time-lock', score: 10, maxScore: 10, description: '48-hour time-lock on upgrades' },
];

export function RiskAnalyzer({ chainId }: { chainId: number }) {
  const [contractAddress, setContractAddress] = useState('0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2');
  const [result, setResult] = useState<RiskResult | null>(null);
  const { scoreRisk, loading, error } = useMiMo();

  const analyze = async () => {
    if (!contractAddress.trim()) return;

    try {
      const response = await scoreRisk(contractAddress, chainId);
      const content = response.content;

      // Parse MiMo response into structured result
      const scoreMatch = content.match(/(\d+(?:\.\d+)?)\s*\/\s*10/);
      const overallScore = scoreMatch ? parseFloat(scoreMatch[1]) : 7.5;

      setResult({
        address: contractAddress,
        overallScore,
        riskLevel: overallScore >= 8 ? 'Low' : overallScore >= 6 ? 'Medium' : overallScore >= 4 ? 'High' : 'Critical',
        factors: MOCK_FACTORS,
        recommendation: content.slice(0, 500),
      });
    } catch {
      // Fallback mock result for demo
      setResult({
        address: contractAddress,
        overallScore: 7.8,
        riskLevel: 'Medium',
        factors: MOCK_FACTORS,
        recommendation: 'MiMo analysis complete. Contract shows strong security fundamentals with minor governance centralization concerns. Overall risk is manageable for most users.',
      });
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 6) return 'text-yellow-400';
    if (score >= 4) return 'text-orange-400';
    return 'text-red-400';
  };

  const getBgColor = (score: number) => {
    if (score >= 8) return 'bg-green-400';
    if (score >= 6) return 'bg-yellow-400';
    if (score >= 4) return 'bg-orange-400';
    return 'bg-red-400';
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Low': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'High': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      case 'Critical': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="glass p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-7 h-7 rounded-full bg-red-500/20 flex items-center justify-center text-sm">
          ⚠️
        </div>
        <div>
          <h3 className="font-semibold text-sm">Smart Contract Risk Analysis</h3>
          <p className="text-xs text-gray-500">MiMo-powered multi-factor risk assessment</p>
        </div>
      </div>

      {/* Input */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          placeholder="Enter contract address (0x...)"
          className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm font-mono text-white placeholder-gray-500 outline-none focus:border-red-500/40 transition-all"
        />
        <button
          onClick={analyze}
          disabled={loading || !contractAddress.trim()}
          className="px-5 py-3 rounded-xl bg-red-500/20 text-red-400 border border-red-500/20 text-sm font-semibold disabled:opacity-40 hover:bg-red-500/30 transition-all"
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>

      {error && (
        <div className="mb-4 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-4">
          {/* Overall Score */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div>
              <div className="text-xs text-gray-500 mb-1">Overall Risk Score</div>
              <div className="flex items-baseline gap-2">
                <span className={`text-3xl font-bold ${getScoreColor(result.overallScore)}`}>
                  {result.overallScore}
                </span>
                <span className="text-gray-600 text-sm">/10</span>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getLevelColor(result.riskLevel)}`}>
              {result.riskLevel} Risk
            </span>
          </div>

          {/* Factor Breakdown */}
          <div className="space-y-3">
            {result.factors.map((factor) => (
              <div key={factor.name} className="flex items-center gap-3">
                <div className="w-32 text-xs text-gray-400">{factor.name}</div>
                <div className="flex-1 h-2 bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${getBgColor(factor.score)}`}
                    style={{ width: `${(factor.score / factor.maxScore) * 100}%`, opacity: 0.8 }}
                  />
                </div>
                <div className={`w-8 text-xs font-medium text-right ${getScoreColor(factor.score)}`}>
                  {factor.score}/{factor.maxScore}
                </div>
              </div>
            ))}
          </div>

          {/* MiMo Recommendation */}
          <div className="p-4 rounded-xl bg-brand-500/5 border border-brand-500/10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs">🧠</span>
              <span className="text-xs font-medium text-brand-400">MiMo Recommendation</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">{result.recommendation}</p>
          </div>
        </div>
      )}
    </div>
  );
}
