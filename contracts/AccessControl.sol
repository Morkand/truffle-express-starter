// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

contract AccessControl {
    event GrantRole(bytes32 indexed _role, address indexed _account);
    event RevokeRole(bytes32 indexed _role, address indexed _account);

    mapping(bytes32 => mapping(address => bool)) private rol;

    bytes32 private constant ADMIN = keccak256(abi.encodePacked("ADMIN"));
    bytes32 private constant ADMINICO = keccak256(abi.encodePacked("ADMINICO"));
    bytes32 private constant USER = keccak256(abi.encodePacked("USER"));
    bytes32 private constant MINTER = keccak256(abi.encodePacked("MINTER"));
    bytes32 private constant BURNER = keccak256(abi.encodePacked("BURNER"));
    bytes32 private constant PAUSER = keccak256(abi.encodePacked("PAUSER"));

    constructor() {}

    modifier onlyRole(bytes32 _role) {
        require(rol[_role][msg.sender], "No Authorized");
        _;
    }

    function _grantRole(bytes32 _role, address _account) internal {
        if (_role == ADMIN) {
            rol[ADMIN][_account] = true;
            rol[USER][_account] = true;
            rol[BURNER][_account] = true;
            rol[MINTER][_account] = true;
            rol[PAUSER][_account] = true;
            rol[ADMINICO][_account] = true;
        } else {
            rol[_role][_account] = true;
        }
        emit GrantRole(_role, _account);
    }

    function grantRole(bytes32 _role, address _account)
        external
        onlyRole(ADMIN)
    {
        _grantRole(_role, _account);
    }

    function revoketRole(bytes32 _role, address _account)
        external
        onlyRole(ADMIN)
    {
        if (_role == ADMIN) {
            rol[ADMIN][_account] = false;
            rol[USER][_account] = false;
            rol[BURNER][_account] = false;
            rol[MINTER][_account] = false;
            rol[PAUSER][_account] = false;
            rol[ADMINICO][_account] = false;
        } else {
            rol[_role][_account] = false;
        }
        emit RevokeRole(_role, _account);
    }

    function _admin() internal pure returns (bytes32) {
        return ADMIN;
    }

    function _user() internal pure returns (bytes32) {
        return USER;
    }

    function _minter() internal pure returns (bytes32) {
        return MINTER;
    }

    function _burner() internal pure returns (bytes32) {
        return BURNER;
    }

    function _pauser() internal pure returns (bytes32) {
        return PAUSER;
    }

     function _adminico() internal pure returns (bytes32) {
        return ADMINICO;
    }
}
