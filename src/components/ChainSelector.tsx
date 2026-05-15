'use client';

import { SUPPORTED_CHAIN_IDS, getChainById } from '@/utils/chains';

interface ChainSelectorProps {
  selected: number[];
  onChange: (chains: number[]) => void;
}

export function ChainSelector({ selected, onChange }: ChainSelectorProps) {
  const toggleChain = (chainId: number) => {
    if (selected.includes(chainId)) {
      if (selected.length > 1) {
        onChange(selected.filter((id) => id !== chainId));
      }
    } else {
      onChange([...selected, chainId]);
    }
  };

  const selectAll = () => onChange([...SUPPORTED_CHAIN_IDS]);
  const selectNone = () => onChange([SUPPORTED_CHAIN_IDS[0]]);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">
          Active Chains
        </span>
        <div className="flex gap-2">
          <button
            onClick={selectAll}
            className="text-xs text-brand-400 hover:text-brand-300 transition-colors"
          >
            All
          </button>
          <span className="text-gray-600">·</span>
          <button
            onClick={selectNone}
            className="text-xs text-gray-500 hover:text-white transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {SUPPORTED_CHAIN_IDS.map((chainId) => {
          const chain = getChainById(chainId);
          if (!chain) return null;
          const isActive = selected.includes(chainId);

          return (
            <button
              key={chainId}
              onClick={() => toggleChain(chainId)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                isActive
                  ? 'bg-white/10 border-white/20 text-white'
                  : 'bg-transparent border-white/[0.06] text-gray-500 hover:text-gray-300 hover:border-white/10'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: chain.color, opacity: isActive ? 1 : 0.4 }}
              />
              <span>{chain.icon}</span>
              <span>{chain.shortName}</span>
              {isActive && chainId === selected[0] && (
                <span className="text-[10px] text-brand-400">primary</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
