//pragma solidity 0.5.8;
pragma solidity >=0.4.25 <0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";


// Non-constant token specific fields
/* bytes32 public name;
uint8 public decimals;
bytes32 public symbol; */

contract USDC is ERC20Detailed, ERC20Mintable {
    constructor() public ERC20Detailed("USDC", "USDC", 6) {}
}
