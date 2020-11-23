pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

/// @title TestVotingAssetB
/// @author Populous World
/// @notice An ERC20 mintable and burnable token to use as whitelisted
///  voting asset on proposals
contract TestVotingAssetB is ERC20Burnable, ERC20Mintable, ERC20Detailed {

    /// @notice Constructor
    /// @param name Asset name
    /// @param symbol Asset symbol
    /// @param decimals Asset decimals
    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals
    )
    public ERC20Detailed(name, symbol, decimals) {}
}