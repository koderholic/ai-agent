import { Token } from '@uniswap/sdk-core'
import { FeeAmount } from '@uniswap/v3-sdk'
import { USDC_TOKEN, WMATIC_TOKEN } from './libs/constants'
import { parseUnits } from 'ethers'

import * as dotenv from 'dotenv';

dotenv.config();

// Inputs that configure this example to run
export interface ExampleConfig {
  interval: number
  rpc: {
    local: string
    mainnet: string
  }
  tokens: {
    in: Token
    amountIn: number
    out: Token
    minAmountOut: BigInt
    poolFee: number
  }
}

// Example Configuration

export const CurrentConfig: ExampleConfig = {
  interval: 5000,
  rpc: {
    local: 'http://localhost:8545',
    mainnet: process.env.RPC!,
  },
  tokens: {
    in: USDC_TOKEN,
    amountIn: 1,
    out: WMATIC_TOKEN,
    minAmountOut: parseUnits("1.94",WMATIC_TOKEN.decimals),
    poolFee: FeeAmount.MEDIUM,
  },
}