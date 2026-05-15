'use client';

import { useState } from 'react';
import { useMiMo } from '@/hooks/useMiMo';

const SUGGESTED_QUERIES = [
  'What\'s the safest stablecoin yield above 8% APY?',
  'Compare Aave vs Compound lending rates on Arbitrum',
  'Find me a low-risk yield farm with <5% IL risk',
  'Optimize gas for a Uniswap swap right now',
  'Which bridge should I use for 10K USDC to Base?',
];

export function AIQuery() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ role: 'user' | 'ai'; content: string }>>([]);
  const { query, loading, error } = useMiMo();

  const handleSubmit = async (q?: string) => {
    const queryText = q || input.trim();
    if (!queryText || loading) return;

    setHistory((prev) => [...prev, { role: 'user', content: queryText }]);
    setInput('');

    try {
      const result = await query(queryText);
      setHistory((prev) => [...prev, { role: 'ai', content: result.content }]);
    } catch {
      setHistory((prev) => [
        ...prev,
        { role: 'ai', content: '⚠️ Failed to get response. Please check your API key and try again.' },
      ]);
    }
  };

  return (
    <div className="glass p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-sm">
          🧠
        </div>
        <div>
          <h3 className="font-semibold text-sm">MiMo DeFi Analyst</h3>
          <p className="text-xs text-gray-500">Ask anything about DeFi — powered by MiMo reasoning models</p>
        </div>
      </div>

      {/* Chat History */}
      {history.length > 0 && (
        <div className="mb-4 space-y-3 max-h-96 overflow-y-auto">
          {history.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-brand-600/20 text-brand-100 rounded-br-md'
                    : 'bg-white/[0.04] text-gray-300 rounded-bl-md'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/[0.04] rounded-2xl rounded-bl-md px-4 py-3 text-sm text-gray-400">
                <span className="inline-flex gap-1">
                  <span className="animate-bounce" style={{ animationDelay: '0ms' }}>·</span>
                  <span className="animate-bounce" style={{ animationDelay: '150ms' }}>·</span>
                  <span className="animate-bounce" style={{ animationDelay: '300ms' }}>·</span>
                </span>
                <span className="ml-2 text-xs">MiMo is reasoning...</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-3 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
          {error}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Ask MiMo about DeFi..."
          className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-brand-500/40 focus:ring-1 focus:ring-brand-500/20 transition-all"
          disabled={loading}
        />
        <button
          onClick={() => handleSubmit()}
          disabled={loading || !input.trim()}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/20 transition-all"
        >
          {loading ? '...' : 'Ask'}
        </button>
      </div>

      {/* Suggested Queries */}
      {history.length === 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {SUGGESTED_QUERIES.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSubmit(q)}
              className="text-xs px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-gray-400 hover:text-white hover:border-brand-500/30 transition-all"
            >
              {q}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
