// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

import "./PauseControl.sol";

contract DryadToken is PauseControl {
    struct tokenProperties {
        uint256 totalSupply;
        string name;
        string symbol;
        string standard;
        uint8 decimals;
        bool paused;
        address bc;
    }

    mapping(address => uint256) private bal;
    mapping(address => mapping(address => uint256)) private allow;
    tokenProperties private properties;

    constructor(
        uint256 _initialSupply,
        string memory _name,
        string memory _symbol,
        string memory _standard,
        uint8 _decimals,
        bool _paused
    ) {
        properties.totalSupply = _initialSupply * (10**_decimals);
        bal[msg.sender] = properties.totalSupply;
        properties.name = _name;
        properties.symbol = _symbol;
        properties.standard = _standard;
        properties.decimals = _decimals;
        properties.paused = _paused;
        properties.bc = msg.sender;
        
        if (properties.paused) {
            _pauseControl(properties.paused);
        }
    }

    function allowance(address _owner, address _spender)
        public
        view
        whenNotpaused
        returns (uint256)
    {
        return allow[_owner][_spender];
    }

    //token properties
    function totalSupply() public view returns (uint256) {
        return properties.totalSupply;
    }

    function balanceOf(address _owner)
        public
        view
        whenNotpaused
        returns (uint256 balance)
    {
        return bal[_owner];
    }

    function name() public view returns (string memory) {
        return properties.name;
    }

    function symbol() public view returns (string memory) {
        return properties.symbol;
    }

    function standard() public view whenNotpaused returns (string memory) {
        return properties.standard;
    }

    function decimals() public view returns (uint8) {
        return properties.decimals;
    }

    //token evens
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );
    event Mint(address indexed _to, uint256 _value);
    event Burn(address indexed _from, uint256 _value);

    //token methods
    function transfer(address _to, uint256 _value)
        public
        whenNotpaused
        returns (bool success)
    {
        require(balanceOf(msg.sender) >= _value);
        bal[msg.sender] -= _value;
        bal[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value)
        public
        whenNotpaused
        returns (bool success)
    {
        allow[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public whenNotpaused returns (bool success) {
        require(_value <= balanceOf(_from));
        require(_value <= allowance(_from, msg.sender));
        bal[_from] -= _value;
        bal[_to] += _value;
        allow[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

    //advanced
    function mint(uint32 _value)
        public
        whenNotpaused
        onlyRole(_minter())
        returns (bool success)
    {
        uint256 value = _DecimalCalc(_value);
        properties.totalSupply += value;
        bal[properties.bc] += value;
        emit Mint(properties.bc, value);
        return true;
    }

    function mintTo(address _to, uint32 _value)
        public
        whenNotpaused
        onlyRole(_minter())
    {
        uint256 value = _DecimalCalc(_value);
        properties.totalSupply += value;
        bal[_to] += value;
        emit Mint(_to, value);
    }

    function burn(uint32 _value) public whenNotpaused onlyRole(_burner()) {
        uint256 value = _DecimalCalc(_value);
        require(balanceOf(properties.bc) >= value);
        properties.totalSupply -= value;
        bal[properties.bc] -= value;
        emit Mint(properties.bc, value);
    }

    function burnFrom(address _from, uint32 _value)
        public
        whenNotpaused
        onlyRole(_burner())
    {
        uint256 value = _DecimalCalc(_value);
        properties.totalSupply += value;
        bal[_from] -= value;
        emit Burn(_from, value);
    }

    function _DecimalCalc(uint256 _value) internal view returns (uint256) {
        return _value * (10**properties.decimals);
    }
}
