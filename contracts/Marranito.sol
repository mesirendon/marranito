pragma solidity >= 0.4.23 <0.6.0;

import "@openzeppelin/contracts/ownership/Ownable.sol";

contract Marranito is Ownable {

  event funds(address _sender, uint _value, string _msg);

  function feedMe() public payable {
    emit funds(msg.sender, msg.value, "Me mandaron platica");
  }

  function() external payable {}
}
