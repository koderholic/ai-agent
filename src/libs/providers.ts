import { JsonRpcProvider, Provider } from 'ethers'
import { CurrentConfig } from '../config'

// Provider Functions

export function getProvider(): Provider {
  console.log(CurrentConfig.rpc.mainnet);
  return new JsonRpcProvider(CurrentConfig.rpc.mainnet);
}