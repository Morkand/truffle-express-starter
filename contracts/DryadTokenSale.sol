// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

import "./DryadToken.sol";
import "./../node_modules/openzeppelin-solidity/contracts/security/Pausable.sol";
import "./../node_modules/openzeppelin-solidity/contracts/access/AccessControl.sol";

contract DryadTokenSale is Pausable, AccessControl {
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
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
        properties.admin = msg.sender;
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
    }
    
    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function ChangeICOPhase(string memory _icoPhase)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        properties.icoPhase = _icoPhase;
    }

    function ChangeICOTokenPrice(uint256 _tokenPrice)
        public
        
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        properties.tokenPrice = _tokenPrice;
    }

    function tokenPrice() public view returns (uint256) {
        return properties.tokenPrice;
    }

    function buyTokens(address _receiver, uint256 _numberOfTokens)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        require(
            tokenContract.transferFrom(
                properties.admin,
                _receiver,
                _numberOfTokens
            ),
            "No TRANSFER"
        );
        properties.tokensSold += _numberOfTokens;

        emit Sell(_receiver, _numberOfTokens);
    }

    function tokensSold() public view returns (uint256) {
        return properties.tokensSold;
    }

    function tokensPrice() public view returns (uint256) {
        return properties.tokenPrice;
    }

    function icoTokenSupply() public view returns (uint256) {
        return tokenContract.allowance(properties.admin, address(this));
    }

    function icoTokenPhase() public view returns (string memory) {
        return properties.icoPhase;
    }

    function endSale() public onlyRole(DEFAULT_ADMIN_ROLE) {
        properties.tokenPrice = 0;
        properties.tokensSold = 0;
    }
}
