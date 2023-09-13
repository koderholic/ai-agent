import http from 'http';
import { quote } from './libs/quote';
import { executeTrade } from './libs/trading';
import { getProvider } from './libs/providers';
import { CurrentConfig } from './config';
import { toBigInt } from 'ethers6';
 
const hostname = '127.0.0.1';
const port = 3001;
 
/*
  This AI Agent swaps USDC for WMATIC for the user once the users buy condition(see config) is met
  Only Uniswap protocol is used to executes purchase
  Only one purchase action happens for this task.
*/


const canBuy = async () => {
    // check current price

    const quoteAmountOut = await quote();
    console.log('Current quote => ', quoteAmountOut)
    console.log('Minimum expected => ', CurrentConfig.tokens.minAmountOut);
    return quoteAmountOut >= CurrentConfig.tokens.minAmountOut
};


// const executeTrade = () => {
//     // Call Uniswap swap 
    
//     console.log('Uniswap has been called');
// }

const interval = setInterval(async () => {
    console.log('Checking whether to Buy');
    if(await canBuy()) {
        console.log('....Conditions Met....');
        executeTrade();
        clearInterval(interval);
    }else{
        console.log('...Oh no! Conditions not met')
    }
}, CurrentConfig.interval);


const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});
 
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});