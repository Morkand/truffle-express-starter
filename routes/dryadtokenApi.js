/**
 * Contains all the routes for metacoin api invocation
 */
const express = require('express');
const router = express.Router();
const DryadTokenService = require('../services/DryadTokenService');
const dryadTokenService = new DryadTokenService();

/**
 * @swagger
 * /accounts:
 *   get:
 *     description: Get Accounts
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Return accounts
 */
router.get("/accounts", async (req,res) => {
    
    const accts = await dryadTokenService.getAccounts();
    res.send(accts);

});

/**
 * @swagger
 * /balance:
 *   get:
 *     description: Get Balance
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: account
 *         description: account address
 *         in: query
 *         required: true
 *         schema:
 *          type:string 
 *     responses:
 *       200:
 *         description: Get Account balance
 */
router.get("/balance", async (req,res) => {
    
    const accountBalance = await dryadTokenService.getBalance(req.query.account);
    res.send("balance:"+accountBalance);

});

/**
 * @swagger
 * /name:
 *   get:
 *     description: Token Name
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Return token name
 */
router.get("/name", async (req,res) => {
           const transactionResponse = await dryadTokenService.tokenName();
           res.send(transactionResponse);
     
});

/**
 * @swagger
 * /symbol:
 *   get:
 *     description: Token Symbol
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Return token symbol
 */
router.get("/symbol", async (req,res) => {
    const transactionResponse = await dryadTokenService.tokenSymbol();
    res.send(transactionResponse);

});

/**
 * @swagger
 * /standard:
 *   get:
 *     description: Token Standard
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Return token standard
 */
router.get("/standard", async (req,res) => {
    const transactionResponse = await dryadTokenService.tokenStandard();
    res.send(transactionResponse);

});

/**
 * @swagger
 * /decimals:
 *   get:
 *     description: Token Decimals
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Return token decimals
 */
router.get("/decimals", async (req,res) => {
    const transactionResponse = await dryadTokenService.tokenDecimals();
    res.send(transactionResponse);

});

module.exports = router;