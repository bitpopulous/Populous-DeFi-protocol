const ADai = artifacts.require('ADai');
const AUSDC = artifacts.require('AUSDC');
const Dai = artifacts.require('Dai');
const USDC = artifacts.require('USDC');
const LendingPoolAddressesProvider = artifacts.require('LendingPoolAddressesProvider');



module.exports = function(deployer, network, accounts) {
    // Using the accounts within the migrations.
    const [root, alice, bob, carl] = accounts;


    if (network == "development") {
        // Do something specific to the network named "development".
        let underlyingAsset, addressesProvider;
        /* 
        Note: constructor variables for aTokens
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
                //add deployed Dai instance to aDai
                return deployer.deploy(ADai, addressesProvider.address, underlyingAsset.address, 18, 'aDai', 'aDai', {gas: 6721975, from: root});
            });
        });


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
                //add deployed Dai instance to aDai
                return deployer.deploy(AUSDC, addressesProvider.address, underlyingAsset.address, 6, 'aUSDC', 'aUSDC', {gas: 6721975, from: root});
            });
        });

    } else {
        // Perform a different step otherwise.
    }
}