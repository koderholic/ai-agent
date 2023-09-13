import { JsonRpcProvider, Provider } from 'ethers'
import { CurrentConfig } from '../config'

// Provider Functions

export function getProvider(): Provider {
  return new JsonRpcProvider(CurrentConfig.rpc.mainnet);
}