// This file stores web3 related constants such as addresses, token definitions, ETH currency references and ABI's

import { SUPPORTED_CHAINS, Token } from '@uniswap/sdk-core'

// Addresses

export const POOL_FACTORY_CONTRACT_ADDRESS =
  '0x1F98431c8aD98523631AE4a59f267346ea31F984'
export const SWAP_ROUTER_ADDRESS = '0xE592427A0AEce92De3Edee1F18E0157C05861564'
export const QUOTER_CONTRACT_ADDRESS =
  '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6'

// Currencies and Tokens

export const USDT_TOKEN = new Token(
  SUPPORTED_CHAINS[5],
  '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
  6
)

export const USDC_TOKEN = new Token(
  SUPPORTED_CHAINS[5],
  '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
  6
)

// ABI's

export const ERC20_ABI = [
  // Read-Only Functions
  'function balanceOf(address owner) view returns (uint256)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',

  // Authenticated Functions
  'function transfer(address to, uint amount) returns (bool)',
  'function approve(address _spender, uint256 _value) returns (bool)',

  // Events
  'event Transfer(address indexed from, address indexed to, uint amount)',
]

// Transactions

export const MAX_FEE_PER_GAS = 100000000000
export const MAX_PRIORITY_FEE_PER_GAS = 100000000000
export const TOKEN_AMOUNT_TO_APPROVE_FOR_TRANSFER = 2000