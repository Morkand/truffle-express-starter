let DryadToken = artifacts.require("./DryadToken.sol");
var DryadTokenSale = artifacts.require("./DryadTokenSale.sol");

//Token Properties
const TOKENSUPPLY = 1000000
const TOKENSYMBOL = 'MANO';
const TOKENNAME = 'MANOLI TOKEN';
const TOKENSTANDARD = 'MANOLI v1.0';
const TOKENDECIMALS = 18;
const TOKENPAUSE = false;
//ICO Properties
const ICOTOKENPRICE = web3.utils.toBN(String(7) + "0".repeat(TOKENDECIMALS-1));
const ICOPHASE = 'Phase 1';
const ICOPAUSE = false;

module.exports = function (deployer) {
  deployer.deploy(DryadToken, TOKENSUPPLY, TOKENNAME, TOKENSYMBOL, TOKENSTANDARD, TOKENDECIMALS, TOKENPAUSE).then(function () {
    //Token price is 0.001 Ether
    return deployer.deploy(DryadTokenSale, DryadToken.address, ICOTOKENPRICE, ICOPHASE, ICOPAUSE);
  });
};