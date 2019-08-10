pragma solidity >= 0.4.23 <0.6.0;

contract Marranito {
  address owner;

  event funds(address _sender, uint _value, string _msg);

  constructor() public {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "You are not the owner");
    _;
  }

  function isOwner() public view returns(bool) {
    return owner == msg.sender;
  }

  function feedMe() public payable {
    emit funds(msg.sender, msg.value, "Me mandaron platica");
  }

  function transfer(address _newOwner) public onlyOwner {
    owner = _newOwner;
  }

  function() external payable {}
}
