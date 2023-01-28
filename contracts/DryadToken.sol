// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

import "./../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "./../node_modules/openzeppelin-solidity/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "./../node_modules/openzeppelin-solidity/contracts/security/Pausable.sol";
import "./../node_modules/openzeppelin-solidity/contracts/access/AccessControl.sol";
import "./../node_modules/openzeppelin-solidity/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";

/// @custom:security-contact cpaezpy@gmail.com
contract DryadToken is ERC20, ERC20Burnable, Pausable, AccessControl, ERC20Permit {
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor(string memory name,string memory symbol ) ERC20(name, symbol) ERC20Permit("MyToken") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, amount);
    }
}