import { JsonRpcProvider, Provider } from 'ethers6'
import { providers } from 'ethers'
import { CurrentConfig } from '../config'

// Provider Functions

export function getProvider(): Provider {
  return new JsonRpcProvider(CurrentConfig.rpc.mainnet);
}
export function _getProvider(): providers.Provider {
  return new providers.JsonRpcProvider(CurrentConfig.rpc.mainnet);
}