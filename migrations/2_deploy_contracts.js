let DryadToken = artifacts.require("./DryadToken.sol");
var DryadTokenSale = artifacts.require("./DryadTokenSale.sol");

//Token Properties
const TOKENSYMBOL = 'MANO';
const TOKENNAME = 'MANOLI TOKEN';
//ICO Properties
const ICOTOKENPRICE = web3.utils.toBN(String(7) + "0".repeat(17));
const ICOPHASE = 'Phase 1';
const ICOPAUSE = false;

module.exports = function (deployer) {
  deployer.deploy(DryadToken,TOKENNAME, TOKENSYMBOL).then(function () {
    //Token price is 0.001 Ether
    return deployer.deploy(DryadTokenSale, DryadToken.address, ICOTOKENPRICE, ICOPHASE, ICOPAUSE);
  });
};