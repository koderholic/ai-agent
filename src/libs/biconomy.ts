import { IBundler, Bundler } from '@biconomy/bundler'
import { BiconomySmartAccount, BiconomySmartAccountConfig, DEFAULT_ENTRYPOINT_ADDRESS } from "@biconomy/account"
import {Wallet} from 'ethers'
import { ChainId, Transaction, UserOperation } from "@biconomy/core-types"
import { _getProvider, getProvider } from './providers';

const bundler: IBundler = new Bundler({
    bundlerUrl: 'https://bundler.biconomy.io/api/v2/80001/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44',     
    chainId: ChainId.POLYGON_MUMBAI,
    entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
})



const provider = getProvider()
const wallet = new Wallet(process.env.PRIVATE_KEY || "", _getProvider());

const biconomySmartAccountConfig: BiconomySmartAccountConfig = {
    signer: wallet,
    chainId: ChainId.POLYGON_MUMBAI,
    bundler: bundler
  }

  async function getAccount() {
    let biconomySmartAccount = new BiconomySmartAccount(biconomySmartAccountConfig)
    biconomySmartAccount =  await biconomySmartAccount.init({accountIndex:0, signerAddress: await wallet.getAddress()})
    console.log("biconomySmartAccount >> ", await biconomySmartAccount.getSmartAccountAddress())
    return biconomySmartAccount
  }

  export async function buildUserOperation(transactions: Transaction[]) {
    const smartAccount = await getAccount();
  
    const userOp = await smartAccount.buildUserOp(transactions)
    userOp.paymasterAndData = "0x"

    return userOp
  }

  export async function sendUserOperation(userOps: UserOperation) {
    const smartAccount = await getAccount();
    const userOpResponse = await smartAccount.sendUserOp(userOps)
  
    const transactionDetail = await userOpResponse.wait()
  
    console.log("transaction detail below")
    console.log(transactionDetail)
  }