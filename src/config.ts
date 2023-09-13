import { Token } from '@uniswap/sdk-core'
import { FeeAmount } from '@uniswap/v3-sdk'
import { USDC_TOKEN, USDT_TOKEN } from './libs/constants'
import { parseUnits } from 'ethers6'

import * as dotenv from 'dotenv';

dotenv.config();

// Inputs that configure this example to run
export interface ExampleConfig {
  smartAccount: string
  interval: number
  rpc: {
    local: string
    mainnet: string
  }
  tokens: {
    in: Token
    amountIn: string
    out: Token
    minAmountOut: BigInt
    poolFee: number,
    slippage: number
  }
}

// Example Configuration

export const CurrentConfig: ExampleConfig = {
  interval: 5000,
  smartAccount: "",
  rpc: {
    local: 'http://localhost:8545',
    mainnet: process.env.RPC!,
  },
  tokens: {
    in: USDC_TOKEN,
    amountIn: parseUnits("0.8", USDC_TOKEN.decimals).toString(),
    out: USDT_TOKEN,
    minAmountOut: parseUnits("0.9",USDT_TOKEN.decimals),
    poolFee: FeeAmount.MEDIUM,
    slippage: 0.5
  },
}