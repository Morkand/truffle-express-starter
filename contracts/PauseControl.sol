// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

import "./AccessControl.sol";

contract PauseControl is AccessControl {
    bool private paused = false;

    constructor() {
       
    }

    modifier whenNotpaused() {
        require(!paused, "Token is paused");
        _;
    }
    modifier whenPaused() {
        require(paused, "Token is not paused");
        _;
    }

    event Paused(address indexed _pauser, bool paused);

    function _pauseAdmin(address _adminPauser) internal{
        _grantRole(_admin(), _adminPauser);
    }

    function _pauseControl (bool _paused) internal{
        paused = _paused;
    }
    
    function pause()
        external
        whenNotpaused
        onlyRole(_pauser())
    {
        paused = true;
        emit Paused(msg.sender, true);
    }

    function unPause()
        external
        whenPaused
        onlyRole(_pauser())
    {
        paused = false;
        emit Paused(msg.sender, false);
    }
}
