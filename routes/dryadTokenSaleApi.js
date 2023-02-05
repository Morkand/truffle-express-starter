const express = require('express');
const router = express.Router();
const DryadTokenSaleService = require('../services/DryadTokenSaleService');
const dryadTokenSaleService = new DryadTokenSaleService();

/**
 * @swagger
 * /ico/buytokens:
 *   post:
 *     description: Buy tokens
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: accountTransfer
 *         description: Example request {"toAccount":"0x2FaffacFf30Cbc4f8C8D58357018B59F75efeE53","amount":10}
 *     responses:
 *       200:
 *         description: Return transaction hash
 */
router.post("/buytokens", async (req, res) => {
  const transactionResponse = await dryadTokenSaleService.buyTokens(req.body);
  res.send(transactionResponse);

});
/**
 * @swagger
 * /ico/addIcoTokenSupply:
 *   post:
 *     description: Add Token ICO Supply
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: accountTransfer
 *         description: Example request {"amount":10}
 *     responses:
 *       200:
 *         description: Return transaction hash
 */
router.post("/addIcoTokenSupply", async (req, res) => {
  const transactionResponse = await dryadTokenSaleService.addTokenIcoSupply(req.body.amount);
  res.send(transactionResponse);

});
/**
 * @swagger
 * /ico/totalSupply:
 *   get:
 *     description: Get Balance
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Get Account balance
 */
router.get("/totalSupply", async (req, res) => {
  const totalSypply = await dryadTokenSaleService.getICOTotalSupply();
  res.send("TotalSupply:" + totalSypply);

});

/**
 * @swagger
 * /ico/tokenPrice:
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
router.get("/tokenPrice", async (req, res) => {
  const price = await dryadTokenSaleService.getTokenPrice();
  res.send("Price:" + price);

});

/**
 * @swagger
 * /ico/tokenPrice:
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
router.get("/tokenSold", async (req, res) => {
  const sold = await dryadTokenSaleService.getTokenSold();
  res.send("Tokens Sold:" + sold);

});

/**
 * @swagger
 * /ico/tokenPhase:
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
router.get("/tokenPhase", async (req, res) => {
  const phase = await dryadTokenSaleService.getICOTokenPhase();
  res.send("Token Phase:" + phase);

});
router.get("/clients", async (req, res) => {
  const clients = await dryadTokenSaleService.getClients();
  res.send({ clientes: clients });
});


module.exports = router;