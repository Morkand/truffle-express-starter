let DryadToken = artifacts.require("./DryadToken.sol");
var DryadTokenSale = artifacts.require("./DryadTokenSale.sol");

//Token Properties
const TOKENSYMBOL = 'MANO';
const TOKENNAME = 'MANOLI TOKEN';
//ICO Properties
const ICOTOKENPRICE = 0.7;
const ICOPHASE = 'Phase 1';
const ICOPAUSE = false;

module.exports = function (deployer) {
  deployer.deploy(DryadToken, TOKENNAME, TOKENSYMBOL).then(function () {
    return deployer.deploy(DryadTokenSale, DryadToken.address, ICOTOKENPRICE, ICOPHASE, ICOPAUSE);
  });
};