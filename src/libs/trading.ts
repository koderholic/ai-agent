import {
    CurrencyAmount,
    Percent,
    Token,
    TradeType,
  } from '@uniswap/sdk-core'
  import {
    Pool,
    Route,
    SwapOptions,
    SwapRouter,
    Trade,
  } from '@uniswap/v3-sdk'
  import { ethers } from 'ethers6'
  import JSBI from 'jsbi'

  import { CurrentConfig } from '../config'
  import {
    ERC20_ABI,
    SWAP_ROUTER_ADDRESS,
    TOKEN_AMOUNT_TO_APPROVE_FOR_TRANSFER,
  } from './constants'
  import { MAX_FEE_PER_GAS, MAX_PRIORITY_FEE_PER_GAS } from './constants'
  import { getPoolInfo } from './pool'
  import {
    getProvider,
  } from './providers'
import { fromReadableAmount } from './conversion'
import { Transaction } from "@biconomy/core-types"
import { buildUserOperation } from './biconomy'
import axios from 'axios'
  
  export type TokenTrade = Trade<Token, Token, TradeType>
  
  // Trading Functions
  
//   export async function createTrade(): Promise<TokenTrade> {
//     const poolInfo = await getPoolInfo()
  
//     const pool = new Pool(
//       CurrentConfig.tokens.in,
//       CurrentConfig.tokens.out,
//       CurrentConfig.tokens.poolFee,
//       poolInfo.sqrtPriceX96.toString(),
//       poolInfo.liquidity.toString(),
//       poolInfo.tick
//     )
  
//     console.log("before swaRoute >> ")
//     const swapRoute = new Route(
//       [pool],
//       CurrentConfig.tokens.in,
//       CurrentConfig.tokens.out
//     )
  
  
//     console.log("after swaRoute >> ")
//     const uncheckedTrade = Trade.createUncheckedTrade({
//       route: swapRoute,
//       inputAmount: CurrencyAmount.fromRawAmount(
//         CurrentConfig.tokens.in,
//         fromReadableAmount(
//           CurrentConfig.tokens.amountIn,
//           CurrentConfig.tokens.in.decimals
//         ).toString()
//       ),
//       outputAmount: CurrencyAmount.fromRawAmount(
//         CurrentConfig.tokens.out,
//         JSBI.BigInt(CurrentConfig.tokens.minAmountOut)
//       ),
//       tradeType: TradeType.EXACT_INPUT,
//     })
  
//     return uncheckedTrade
//   }
  
  export async function executeTrade() {
    // const response = await axios.get(`https://api.1inch.dev/swap/v5.2/137/swap?src=${CurrentConfig.tokens.in.address}&dst=${CurrentConfig.tokens.out.address}&amount=${CurrentConfig.tokens.amountIn}&from=${CurrentConfig.smartAccount}&slippage=${CurrentConfig.tokens.slippage}`, {headers: {Authorization: "Bearer "+process.env.ONEINCH_API}});
    
    // const swapTx = {
    //     to: "0x1111111254eeb25477b68fb85ed929f73a960582",
    //     data: response.data.tx.data
    // }

    // console.log(response);

    // return;
    // return response.data.toAmount;
      
    const userOpTxs:Transaction[] = []

    //@todo Give approval to the router to spend the token
    const approvalTx = await getTokenTransferApproval();
    if (approvalTx) {
      userOpTxs.push(approvalTx)
    }
   
  
    // const options: SwapOptions = {
    //   slippageTolerance: new Percent(50, 10_000), // 50 bips, or 0.50%
    //   deadline: Math.floor(Date.now() / 1000) + 60 * 20, // 20 minutes from the current Unix time
    //   recipient: CurrentConfig.smartAccount,
    // }
  
    // const methodParameters = SwapRouter.swapCallParameters([trade], options)
    
    // const swapTx = {
    //   to: SWAP_ROUTER_ADDRESS,
    //   data: methodParameters.calldata
    // }

    // userOpTxs.push(swapTx)
    
    // // BuildUser
    const userOpsObj = await buildUserOperation(userOpTxs)
    console.log("userOpsObj >> ", userOpsObj)

  }
  
  /**
   * Create user operation for token approval
   * If approval exists, null is returned else the userOperation is returned
   */
  export async function getTokenTransferApproval(): Promise<any> {
    const provider = getProvider()
    
    const token = CurrentConfig.tokens.in;
    const tokenContract = new ethers.Contract(
    token.address,
    ERC20_ABI,
    provider
    )

    const approval = await tokenContract.allowance(CurrentConfig.smartAccount, SWAP_ROUTER_ADDRESS);
    if(approval > CurrentConfig.tokens.amountIn) return null;

    const transaction = await tokenContract.approve.populateTransaction(
    "0x1111111254eeb25477b68fb85ed929f73a960582", // This is One inch router
    fromReadableAmount(
        TOKEN_AMOUNT_TO_APPROVE_FOR_TRANSFER,
        token.decimals
    ).toString()
    )

    //@todo  Construct and return user operation here
    const data = transaction.data;

    return {
      to:token.address,
      data
    }

  }