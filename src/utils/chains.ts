// Chain configurations for multi-chain DeFi support

export interface ChainConfig {
  id: number;
  name: string;
  shortName: string;
  nativeCurrency: { name: string; symbol: string; decimals: number };
  rpcUrl: string;
  explorerUrl: string;
  color: string;
  icon: string;
  isTestnet?: boolean;
}

export const CHAINS: Record<number, ChainConfig> = {
  1: {
    id: 1,
    name: 'Ethereum',
    shortName: 'ETH',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrl: 'https://eth.llamarpc.com',
    explorerUrl: 'https://etherscan.io',
    color: '#627eea',
    icon: '⟠',
  },
  8453: {
    id: 8453,
    name: 'Base',
    shortName: 'BASE',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrl: 'https://mainnet.base.org',
    explorerUrl: 'https://basescan.org',
    color: '#0052ff',
    icon: '🔵',
  },
  42161: {
    id: 42161,
    name: 'Arbitrum',
    shortName: 'ARB',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    explorerUrl: 'https://arbiscan.io',
    color: '#28a0f0',
    icon: '🔷',
  },
  137: {
    id: 137,
    name: 'Polygon',
    shortName: 'MATIC',
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    rpcUrl: 'https://polygon-rpc.com',
    explorerUrl: 'https://polygonscan.com',
    color: '#8247e5',
    icon: '🟣',
  },
  56: {
    id: 56,
    name: 'BNB Chain',
    shortName: 'BSC',
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    rpcUrl: 'https://bsc-dataseed.binance.org',
    explorerUrl: 'https://bscscan.com',
    color: '#f0b90b',
    icon: '🟡',
  },
  10: {
    id: 10,
    name: 'Optimism',
    shortName: 'OP',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrl: 'https://mainnet.optimism.io',
    explorerUrl: 'https://optimistic.etherscan.io',
    color: '#ff0420',
    icon: '🔴',
  },
  43114: {
    id: 43114,
    name: 'Avalanche',
    shortName: 'AVAX',
    nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
    explorerUrl: 'https://snowtrace.io',
    color: '#e84142',
    icon: '🔺',
  },
  501: {
    id: 501,
    name: 'Solana',
    shortName: 'SOL',
    nativeCurrency: { name: 'SOL', symbol: 'SOL', decimals: 9 },
    rpcUrl: 'https://api.mainnet-beta.solana.com',
    explorerUrl: 'https://solscan.io',
    color: '#14f195',
    icon: '☀️',
  },
};

export const SUPPORTED_CHAIN_IDS = Object.keys(CHAINS).map(Number);

export function getChainById(id: number): ChainConfig | undefined {
  return CHAINS[id];
}

export function getChainByName(name: string): ChainConfig | undefined {
  return Object.values(CHAINS).find(
    (c) => c.name.toLowerCase() === name.toLowerCase() || c.shortName.toLowerCase() === name.toLowerCase()
  );
}

// Well-known DeFi protocol addresses per chain
export const PROTOCOL_ADDRESSES: Record<number, Record<string, string>> = {
  1: {
    'aave-v3': '0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2',
    'uniswap-v3': '0x1F98431c8aD98523631AE4a59f267346ea31F984',
    'lido': '0xae7ab96520DE3A18E5e111B5EaAb095312D7f8F6',
    'maker': '0x9759A6Ac90977291366b45324B0C632B1AF516E3',
  },
  42161: {
    'aave-v3': '0x794a61358D6845594F94dc1DB02A252b5b4814aD',
    'uniswap-v3': '0x1F98431c8aD98523631AE4a59f267346ea31F984',
    'gmx': '0x4277f8F2c384a20079FA400C1ca2693D5366Efe0',
    'pendle': '0x0c84331e39d6658Daab2164cf82d3Fb1faED6707',
  },
  8453: {
    'aave-v3': '0xA238Dd80C259a72e81d7E4664a9801593F98d725',
    'uniswap-v3': '0x03a520b35C05e34d8EDA1eC0d77cE0C97D98b98c',
    'aerodrome': '0x4200000000000000000000000000000000000011',
  },
};
