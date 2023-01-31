const truffleContract = require('@truffle/contract');
const dryadtokenContract = require('../build/contracts/DryadToken.json');
const web3Utils = require('../utils/web3Utils');

/**
 * Service class that interfaces with the dryadtoken api contract
 */
class DryadTokenService{

    constructor(){

        this.web3 = web3Utils.getWeb3();
        this.GAS_LIMIT = 1000000;
        this.DryadToken = truffleContract(dryadtokenContract);
        this.DryadToken.setProvider(this.web3.currentProvider);
    }
    
    /**
     * Get all available accounts
     */
    async getAccounts(){

        let accts;

        try{
            accts = await this.web3.eth.getAccounts();
        }catch(err){
            console.log(err);
        }
        
        if(!accts || accts.length ==0){
            console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        }

        return accts;

    }

    /**
     * Get account balance 
     * 
     * @param {*} account 
     */
    async getBalance(account){

        
        try{
            let balance;
            const dryadtoken = await this.DryadToken.deployed();
            balance = await dryadtoken.balanceOf(account);
            return web3Utils.delDecimals(balance);

        }catch(err){
            console.log(err);
            return err;
        }

     
    }

    /**
     * Get account approve 
     * @param {*} account 
     * @param {*} amount  
     */
    async getApprove(account,amount){

        let approve;

        try{
            const dryadtoken = await this.DryadToken.deployed();
            const accounts = await this.web3.eth.getAccounts();
            approve = await dryadtoken.approve(account,web3Utils.calcDecimals(amount),{from:accounts[0],gas:this.GAS_LIMIT});

        }catch(err){
            console.log(err);
            approve = err;
        }

        return approve;
     
    }

     /**
     * Get account allowance 
     * @param {*} owner 
     * @param {*} spender  
     */
     async getAllowance(owner,spender){

         
         try{
             let allowance;
             const dryadtoken = await this.DryadToken.deployed();
            allowance = await dryadtoken.allowance(owner,spender);
            return  web3Utils.delDecimals(allowance);

        }catch(err){
            console.log(err);
            return err;
        }

     
    }

    /**
     * Get Name Of Token.
     * Returns the name of token 
     */
    async tokenName(){

        let name;

        try{

            const dryadtoken = await this.DryadToken.deployed();
            name = await dryadtoken.name();

        }catch(err){

            console.log(err);
            name = err;
        }
        return name;
    }

    /**
     * Get Symbol Of Token.
     * Returns the symbol of token 
     */
    async tokenSymbol(){

        let symbol;

        try{

            const dryadtoken = await this.DryadToken.deployed();
            symbol = await dryadtoken.symbol();

        }catch(err){

            console.log(err);
            symbol = err;
        }
        return symbol;
    }
    
     /**
     * Get Standard Of Token.
     * Returns the Standard of token 
     */
     async tokenStandard(){

        let standard;

        try{

            const dryadtoken = await this.DryadToken.deployed();
            standard = await dryadtoken.standard();

        }catch(err){

            console.log(err);
            standard = err;
        }
        return standard;
    }

     /**
     * Get Decimals Of Token.
     * Returns the Decimals of token 
     */
     async tokenDecimals(){

        let decimals;

        try{

            const dryadtoken = await this.DryadToken.deployed();
            decimals = await dryadtoken.decimals();

        }catch(err){

            console.log(err);
            decimals = err;
        }
        return decimals;
    }
}

module.exports = DryadTokenService;