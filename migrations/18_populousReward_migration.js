const Dai = artifacts.require('MockDai');
const LendingPoolAddressesProvider = artifacts.require('LendingPoolAddressesProvider');
const PopulousReward = artifacts.require('PopulousReward');
const LendingPoolCore = artifacts.require('LendingPoolCore');

module.exports = function(deployer, network, accounts) {
    // Using the accounts within the migrations.
    const [root, alice, bob, carl] = accounts;


    if (network == "development") {
        // Do something specific to the network named "development".
        let _core, underlyingAsset;
        /* 
        Note: constructor variables for PopulousReward smart contract
        LendingPoolCore _core,
        // The Erc20 Token
        RewardToken _rewardToken,
        // Dev address.
        address _devaddr,
        uint256 _rewardTokenPerBlock,
        uint256 _startBlock,
        uint256 _bonusEndBlock */
        deployer.then(function(){
            return LendingPoolAddressesProvider.deployed()
            .then(function(instance) {
                _core_address = instance.getLendingPoolCore();
            })
            .then(function() {
            return Dai.deployed()
            })
            .then(function(instance) {
                underlyingAsset = instance;
                //add deployed Dai instance to PDai
                return deployer.deploy(PopulousReward, _core_address, underlyingAsset.address, root, '1', '2', '5', {gas: 6721975, from: root});
            });
        });

    } else {
        // Perform a different step otherwise.
    }
};