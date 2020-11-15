const PDai = artifacts.require('PDai');
const PUSDC = artifacts.require('PUSDC');
const Dai = artifacts.require('MockDai');
const USDC = artifacts.require('MockUSDC');
const LendingPoolAddressesProvider = artifacts.require('LendingPoolAddressesProvider');



module.exports = function(deployer, network, accounts) {
    // Using the accounts within the migrations.
    const [root, alice, bob, carl] = accounts;


    if (network == "development") {
        // Do something specific to the network named "development".
        let underlyingAsset, addressesProvider;
        /* 
        Note: constructor variables for PTokens
        LendingPoolAddressesProvider _addressesProvider,
        address _underlyingAsset,
        uint8 _underlyingAssetDecimals,
        string memory _name,
        string memory _symbol */
        deployer.then(function(){
            return LendingPoolAddressesProvider.deployed()
            .then(function(instance) {
                addressesProvider = instance;
            })
            .then(function() {
            return Dai.deployed()
            })
            .then(function(instance) {
                underlyingAsset = instance;
                //add deployed Dai instance to PDai
                return deployer.deploy(PDai, addressesProvider.address, underlyingAsset.address, 18, 'PDai', 'PDai', {gas: 6721975, from: root});
            });
        });


        deployer.then(function(){
            return LendingPoolAddressesProvider.deployed()
            .then(function(instance) {
                addressesProvider = instance;
            })
            .then(function() {
            return USDC.deployed()
            })
            .then(function(instance) {
                underlyingAsset = instance;
                //add deployed Dai instance to PDai
                return deployer.deploy(PUSDC, addressesProvider.address, underlyingAsset.address, 6, 'PUSDC', 'PUSDC', {gas: 6721975, from: root});
            });
        });

    } else {
        // Perform a different step otherwise.
    }
};
