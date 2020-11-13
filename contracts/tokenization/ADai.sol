//pragma solidity 0.5.8;
pragma solidity >=0.4.25 <0.7.0;

import "../tokenization/AToken.sol";
import "../configuration/LendingPoolAddressesProvider.sol";

contract ADai is AToken {
    constructor(LendingPoolAddressesProvider _addressesProvider,
        address _underlyingAsset,
        uint8 _underlyingAssetDecimals,
        string memory _name,
        string memory _symbol) 
        public AToken(_addressesProvider, _underlyingAsset, 
        _underlyingAssetDecimals, _name, _symbol) {}
}
