pragma solidity ^0.5.0;

/**
* IPriceOracle interface
* -
* Interface for the Populous price oracle.
* -
* This contract was cloned from aave and modified to work with the Populous World eco-system.
**/


interface IPriceOracle {
    /***********
    @dev returns the asset price in ETH
     */
    function getAssetPrice(address _asset) external view returns (uint256);

    /***********
    @dev sets the asset price, in wei
     */
    function setAssetPrice(address _asset, uint256 _price) external;

}
