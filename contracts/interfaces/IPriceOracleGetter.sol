pragma solidity ^0.5.0;

/************
@title IPriceOracleGetter interface
@notice */
/**
* IPriceOracle interface
* -
* Interface for the Aave price oracle.
* -
* This contract was cloned from aave and modified to work with the Populous World eco-system.
**/

interface IPriceOracleGetter {
    /***********
    @dev returns the asset price in ETH
     */
    function getAssetPrice(address _asset) external view returns (uint256);
}
