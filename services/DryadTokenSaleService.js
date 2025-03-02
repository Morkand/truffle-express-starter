const truffleContract = require('@truffle/contract');
const dryadtokenSaleContract = require('../build/contracts/DryadTokenSale.json');
const web3Utils = require('../utils/web3Utils');
const mongoUtils = require('../utils/mongoUtils');
const { mongo } = require('mongoose');

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
     * @param {*} amount 
     */
    async addTokenIcoSupply(amount) {
        try {
            console.log("amount: "+amount);
            const dryadtokensale = await this.DryadTokenSale.deployed();
            const accounts = await this.web3.eth.getAccounts();
            let supply = await dryadtokensale.addIcoTokenSupply(web3Utils.calcDecimals(amount),{ from: accounts[0], gas: this.GAS_LIMIT });
            return supply;
        } catch (err) {
            console.log(err);
            return err;
        }
    }
    /**
      * Buy tokens from one account to another.
      * Retuens the transaction hash.
      * 
      * @param {*} receiver 
      * @param {*} amount 
      */
    async buyTokens({
        account,
        amount,
        firstName,
        lastName,
        email,
        dryadQuantity,
        paymentMethod,
    }) {

        let transactionHash;
        console.log("account: "+account);
        try {
            const dryadtokensale = await this.DryadTokenSale.deployed();
            const accounts = await this.web3.eth.getAccounts();
            const transaction = await dryadtokensale.buyTokens(account, web3Utils.calcDecimals(amount), { from: accounts[0], gas: this.GAS_LIMIT });
            transactionHash = transaction.receipt.transactionHash;
            let transactionInfo = {
                firstName: firstName,
                lastName: lastName,
                address: account,
                email: email,
                dryadQuantity: dryadQuantity,
                amount: amount,
                paymentMethod: paymentMethod,
                details: JSON.stringify(transactionHash)
            }
            let mongo = await mongoUtils.getMongo();
            await mongo.collection("clients").insertOne(transactionInfo, function (err, res) {
                console.log(err);
                if (err) throw err;
                console.log(res);
                mongo.close();
            });

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
    async getICOTotalSupply() {

        let total;

        try {

            const dryadtokensale = await this.DryadTokenSale.deployed();
            total = await dryadtokensale.icoTokenSupply();
            console.log(total);
        } catch (err) {

            console.log(err);
            total = err;
        }
        return web3Utils.delDecimals(total);
    }

    /**
   * Gets token supply.
   * Returns token price
   */
    async getTokenPrice() {

        let total;

        try {

            const dryadtokensale = await this.DryadTokenSale.deployed();
            total = await dryadtokensale.tokenPrice();

        } catch (err) {

            console.log(err);
            total = err;
        }
        return web3Utils.delDecimals(total);
    }

    /**
    * Gets token sold.
    * Returns token sold
    */
    async getTokenSold() {

        let sold;

        try {

            const dryadtokensale = await this.DryadTokenSale.deployed();
            sold = await dryadtokensale.tokensSold();

        } catch (err) {

            console.log(err);
            sold = err;
        }
        return web3Utils.delDecimals(sold);
    }

    /**
    * Gets PHASE Phase.
    * Returns ICO Phase
    */
    async getICOTokenPhase() {

        let phase;

        try {

            const dryadtokensale = await this.DryadTokenSale.deployed();
            phase = await dryadtokensale.icoTokenPhase();

        } catch (err) {

            console.log(err);
            phase = err;
        }
        return phase;
    }
    async getClients() {
        let mongo = await mongoUtils.getMongo();
        let clients = await mongo.collection("clients");
        clients = await clients.find({}).toArray();
        console.log({ cliente: clients });
        return clients;
    };
}

module.exports = DryadTokenSaleService;