// This file stores web3 related constants such as addresses, token definitions, ETH currency references and ABI's

import { SUPPORTED_CHAINS, Token } from '@uniswap/sdk-core'

// Addresses

export const POOL_FACTORY_CONTRACT_ADDRESS =
  '0x1F98431c8aD98523631AE4a59f267346ea31F984'
export const QUOTER_CONTRACT_ADDRESS =
  '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6'

// Currencies and Tokens

export const WMATIC_TOKEN = new Token(
  SUPPORTED_CHAINS[5],
  '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
  18
)

export const USDC_TOKEN = new Token(
  SUPPORTED_CHAINS[5],
  '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
  6
)