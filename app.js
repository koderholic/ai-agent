const http = require('http');
 
const hostname = '127.0.0.1';
const port = 3001;
 
/*
  This AI Agent buys Ether for the user once the price is atmost the preferredBuyPrice 
  Only Uniswap protocol is used to executes purchase
  Only one purchase action happens for this task.
  tradeAmount: How much USDC to trade for Ether. 
*/
const preferredBuyPrice = 1600; 
const tradeAmount = 1;

const canBuy = () => {
    // check current price
    const currentBuyPrice = 1500;

    return currentBuyPrice <= preferredBuyPrice
};


const executeTrade = () => {
    // Call Uniswap swap 
    console.log('Uniswap has been called');
}

const interval = setInterval(() => {
    console.log('Checking whether to Buy');
    if(canBuy()) {
        console.log('....Conditions Met....');
        executeTrade();
        clearInterval(interval);
    }else{
        console.log('...Oh no! Conditions not met')
    }
}, 1000);


const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});
 
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});