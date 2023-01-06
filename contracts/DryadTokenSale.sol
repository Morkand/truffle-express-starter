// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

import "./DryadToken.sol";
import "./PauseControl.sol";

contract DryadTokenSale is PauseControl {
    struct tokenSaleProperties {
        address admin;
        uint256 tokenPrice;
        uint256 tokensSold;
        uint256 tokenSupply;
        string icoPhase;
        bool paused;
    }
    tokenSaleProperties private properties;
    DryadToken public tokenContract;
    event Sell(address _buyer, uint256 _amount);
    constructor(
        DryadToken _tokenContract,
        uint256 _tokenPrice,
        string memory _icoPhase,
        bool _paused
    ) {
        tokenContract = _tokenContract;
        properties.tokenPrice = _tokenPrice;
        properties.icoPhase = _icoPhase;
        properties.paused = _paused;
        properties.admin= msg.sender;
        _pauseAdmin(msg.sender);
        if (properties.paused) {
            _pauseControl(_paused);
        }
    }

    function ChangeICOPhase(string memory _icoPhase) whenNotpaused public onlyRole(_adminico()){
        properties.icoPhase = _icoPhase;
    }

    function ChangeICOTokenPrice(uint256 _tokenPrice) whenNotpaused public onlyRole(_adminico()){
        properties.tokenPrice = _tokenPrice;
    }

    function tokenPrice() whenNotpaused public view returns (uint256) {
        return properties.tokenPrice;
    }

    function buyTokens(uint256 _numberOfTokens) whenNotpaused onlyRole(_adminico()) public{
        _numberOfTokens = calcDecimals(_numberOfTokens);
        require(tokenContract.balanceOf(address(this))>=_numberOfTokens);
        require(tokenContract.transfer(msg.sender, _numberOfTokens));
        properties.tokensSold += _numberOfTokens;
        
        emit Sell(msg.sender, _numberOfTokens);
    }

    function tokensSold() whenNotpaused public view returns(uint256){
        return properties.tokensSold;
    }
    
    function tokensPrice() whenNotpaused public view returns(uint256){
        return properties.tokenPrice;
    }

    function icoTokenSupply() whenNotpaused public view returns(uint256){
        return tokenContract.balanceOf(address(this));
    }

    function icoTokenPhase() whenNotpaused public view returns(string memory){
        return properties.icoPhase;
    }

    function endSale() whenNotpaused public onlyRole(_adminico()) {
        require(tokenContract.transfer(properties.admin,tokenContract.balanceOf(address(this))));
        properties.tokenPrice = 0;
        properties.tokensSold = 0;
        _pauseControl(true);
    }
    function calcDecimals(uint256 _value) internal pure returns (uint256){
        return _value*(10**18);
    }
}
