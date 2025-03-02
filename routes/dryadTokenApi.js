/**
 * Contains all the routes for dryad api invocation
 */
const express = require('express');
const router = express.Router();
const DryadTokenService = require('../services/DryadTokenService');
const dryadTokenService = new DryadTokenService();

/**
 * @swagger
 * /token/ico/mint:
 *   post:
 *     description: Add token to contract address
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: ICO mint
 *         description: Example request {"icoContractAddress":"0x2FaffacFf30Cbc4f8C8D58357018B59F75efeE53","amount":10}
 *     responses:
 *       200:
 *         description: Return transaction hash
 */
router.post("/ico/mint", async (req, res) => {
    const transactionResponse = await dryadTokenService.postMintICOAddress(req.body.icoContractAddress,req.body.amount);
    res.send(transactionResponse);
  
  });
/**
 * @swagger
 * /token/approve:
 *   post:
 *     description: Approve spender
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: accountTransfer
 *         description: Example request {"spender":"0x2FaffacFf30Cbc4f8C8D58357018B59F75efeE53","amount":10}
 *     responses:
 *       200:
 *         description: Return transaction hash
 */
router.post("/approve", async (req,res) => {
    const transactionResponse = await dryadTokenService.getApprove(req.body.spender,req.body.amount);
    res.send(transactionResponse);

});
/**
 * @swagger
 * /token/allowance:
 *   post:
 *     description: Approve spender
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: accountTransfer
 *         description: Example request {"owner":"0x2FaffacFf30Cbc4f8C8D58357018B59F75efeE53","spender":"0x2AA0c94cA90d9C1a8D2eEEF1203810727feeADe4"}
 *     responses:
 *       200:
 *         description: Return transaction hash
 */
router.post("/allowance", async (req,res) => {
    const transactionResponse = await dryadTokenService.getAllowance(req.body.owner,req.body.spender);
    res.send('allowance:'+transactionResponse);

});

/**
 * @swagger
 * /token/accounts:
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
 * /token/balance:
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
 * /token/name:
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
 * /token/symbol:
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
 * /token/standard:
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
 * /token/decimals:
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
    res.send('decimals:' +transactionResponse);

});

/**
 * @swagger
 * /token/mintSupply:
 *   post:
 *     description: Mint tokens
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: mint tokens
 *         description: Example request {"amount":10}
 *     responses:
 *       200:
 *         description: Return transaction hash
 */
router.post("/mintSupply", async (req,res) => {
    const transactionResponse = await dryadTokenService.PostMintSupply(req.body.amount);
    res.send(transactionResponse);

});

module.exports = router;