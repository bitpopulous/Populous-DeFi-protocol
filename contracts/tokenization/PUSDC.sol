//pragma solidity 0.5.8;
pragma solidity >=0.4.25 <0.7.0;

import "../tokenization/PToken.sol";
import "../configuration/LendingPoolAddressesProvider.sol";

contract PUSDC is PToken {
    constructor(LendingPoolAddressesProvider _addressesProvider,
        address _underlyingAsset,
        uint8 _underlyingAssetDecimals,
        string memory _name,
        string memory _symbol) 
        public PToken(_addressesProvider, _underlyingAsset, 
        _underlyingAssetDecimals, _name, _symbol) {}
}
