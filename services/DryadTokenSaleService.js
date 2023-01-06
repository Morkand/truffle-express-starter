const truffleContract = require('@truffle/contract');
const dryadtokenSaleContract = require('../build/contracts/DryadTokenSale.json');
const web3Utils = require('../utils/web3Utils');

/**
 * Service class that interfaces with the dryadtokensale api contract
 */
class DryadTokenSaleService {

    constructor() {

        this.web3 = web3Utils.getWeb3();
        this.GAS_LIMIT = 1000000;
        this.DryadTokenSale = truffleContract(dryadtokenSaleContract);
        this.DryadTokenSale.setProvider(this.web3.currentProvider);
    }

    /**
      * Buy tokens from one account to another.
      * Retuens the transaction hash.
      * 
      * @param {*} receiver 
      * @param {*} amount 
      */
    async buyTokens(receiver, amount) {

        let transactionHash;

        try {

            const dryadtokensale = await this.DryadTokenSale.deployed();
            const accounts = await this.web3.eth.getAccounts();
            const transaction = await dryadtokensale.buyTokens(receiver, web3Utils.calcDecimals(amount), { from: accounts[0], gas: this.GAS_LIMIT });

            transactionHash = transaction.receipt.transactionHash;

        } catch (err) {

            console.log(err);
            transactionHash = err;
        }

        return transactionHash;

    }
    /**
     * Gets totalSupply.
     * Returns ICO total supply
     */
    async getICOTotalSupply(){

        let total;

        try{

            const dryadtokensale = await this.DryadTokenSale.deployed();
            total = await dryadtokensale.icoTokenSupply();

        }catch(err){

            console.log(err);
            total = err;
        }
        return web3Utils.delDecimals(total);
    }

      /**
     * Gets token supply.
     * Returns token price
     */
      async getTokenPrice(){

        let total;

        try{

            const dryadtokensale = await this.DryadTokenSale.deployed();
            total = await dryadtokensale.tokenPrice();

        }catch(err){

            console.log(err);
            total = err;
        }
        return web3Utils.delDecimals(total);
    }

     /**
     * Gets token sold.
     * Returns token sold
     */
     async getTokenSold(){

        let sold;

        try{

            const dryadtokensale = await this.DryadTokenSale.deployed();
            sold = await dryadtokensale.tokensSold();

        }catch(err){

            console.log(err);
            sold = err;
        }
        return web3Utils.delDecimals(sold);
    }

     /**
     * Gets PHASE Phase.
     * Returns ICO Phase
     */
     async getICOTokenPhase(){

        let phase;

        try{

            const dryadtokensale = await this.DryadTokenSale.deployed();
            phase = await dryadtokensale.icoTokenPhase();

        }catch(err){

            console.log(err);
            phase = err;
        }
        return phase;
    }



}

module.exports = DryadTokenSaleService;