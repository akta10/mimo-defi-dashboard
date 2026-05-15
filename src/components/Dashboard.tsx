'use client';

import { useState } from 'react';
import { ChainSelector } from './ChainSelector';
import { AIQuery } from './AIQuery';
import { RiskAnalyzer } from './RiskAnalyzer';

interface PortfolioStats {
  totalValue: string;
  dailyChange: string;
  avgApy: string;
  riskScore: string;
}

export function Dashboard() {
  const [selectedChains, setSelectedChains] = useState<number[]>([1, 42161, 8453]);
  const [walletAddress] = useState<string>('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');

  const stats: PortfolioStats = {
    totalValue: '$142,847.32',
    dailyChange: '+5.23%',
    avgApy: '12.4%',
    riskScore: 'Low (3.2)',
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          DeFi Portfolio
          <span className="gradient-text ml-3">Powered by MiMo</span>
        </h1>
        <p className="text-gray-400">
          AI-driven analytics across {selectedChains.length} chains · Wallet:{' '}
          <code className="text-sm bg-white/5 px-2 py-0.5 rounded">
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </code>
        </p>
      </div>

      {/* Chain Selector */}
      <ChainSelector
        selected={selectedChains}
        onChange={setSelectedChains}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Value', value: stats.totalValue, color: 'text-white' },
          { label: '24h Change', value: stats.dailyChange, color: 'text-green-400' },
          { label: 'Avg APY', value: stats.avgApy, color: 'text-blue-400' },
          { label: 'Risk Score', value: stats.riskScore, color: 'text-green-400' },
        ].map((stat) => (
          <div key={stat.label} className="glass p-5">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{stat.label}</div>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Portfolio Chart */}
        <div className="lg:col-span-2 glass p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Portfolio Performance</h2>
            <div className="flex gap-2 text-xs">
              {['7D', '30D', '90D', '1Y'].map((period) => (
                <button
                  key={period}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    period === '30D'
                      ? 'bg-brand-500/20 text-brand-300'
                      : 'text-gray-500 hover:text-white'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          {/* Mock chart */}
          <div className="h-64 relative">
            <svg viewBox="0 0 800 250" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,180 Q100,160 200,120 T400,80 T600,50 T800,30 L800,250 L0,250 Z"
                fill="url(#chartGrad)"
              />
              <path
                d="M0,180 Q100,160 200,120 T400,80 T600,50 T800,30"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="2"
              />
              <circle cx="800" cy="30" r="4" fill="#8b5cf6">
                <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
        </div>

        {/* AI Insights Panel */}
        <div className="glass p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs">
              🧠
            </div>
            <h2 className="text-lg font-semibold">MiMo Insights</h2>
          </div>
          <div className="space-y-3">
            {[
              {
                icon: '📈',
                title: 'Yield Alert',
                text: 'Aave USDC on Arbitrum APY increased to 8.2%. Consider rebalancing from Ethereum.',
                color: 'border-green-500/20',
              },
              {
                icon: '⚠️',
                title: 'Risk Warning',
                text: 'New token on Uniswap V3 shows high concentration. Top 10 holders own 78%.',
                color: 'border-amber-500/20',
              },
              {
                icon: '⛽',
                title: 'Gas Optimization',
                text: 'Gas prices dropping. Optimal window for swaps: next ~2 hours.',
                color: 'border-blue-500/20',
              },
              {
                icon: '🌉',
                title: 'Bridge Suggestion',
                text: 'Move $12K USDC to Base via Stargate — saves $47 vs current route.',
                color: 'border-purple-500/20',
              },
            ].map((insight, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl bg-white/[0.02] border ${insight.color} text-sm`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span>{insight.icon}</span>
                  <span className="font-medium text-xs">{insight.title}</span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">{insight.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Query Bar */}
      <AIQuery />

      {/* Risk Analyzer */}
      <div className="mt-8">
        <RiskAnalyzer chainId={1} />
      </div>
    </div>
  );
}
