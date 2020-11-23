const USDC = artifacts.require('MockUSDC');
const LendingPoolAddressesProvider = artifacts.require('LendingPoolAddressesProvider');
const PopulousReward = artifacts.require('PopulousReward');
const LendingPoolCore = artifacts.require('LendingPoolCore');


module.exports = function (deployer, network, accounts) {
    // Using the accounts within the migrations.
    const [root, alice, bob, carl] = accounts;


    if (network == "development" ) {
        // Do something specific to the network named "development".

        deployer.then(async () => {

            let _core_address, underlyingAsset;
            let _startBlock = await web3.eth.getBlockNumber();
            let _bonusEndBlock = await web3.eth.getBlockNumber() + 1000;//1000 block numbers ahead
            let _rewardTokenPerBlock = '3';
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
            //console.log(_bonusEndBlock, 'bonus end block');
            let addressesProvider = await LendingPoolAddressesProvider.deployed();
            _core_address = await addressesProvider.getLendingPoolCore();
            underlyingAsset = await USDC.deployed()
            console.log(underlyingAsset.address, 'USDC address for reward token');
            //add deployed USDC instance to populous reward as erc20 reward token
            await deployer.deploy(PopulousReward, _core_address, underlyingAsset.address, root, _rewardTokenPerBlock, _startBlock, _bonusEndBlock, { gas: 6721975, from: root, overwrite: true});
        });
    } else {
        deployer.then(async () => {

            let _core_address, underlyingAsset;
            let _startBlock = await web3.eth.getBlockNumber();
            let _bonusEndBlock = await web3.eth.getBlockNumber() + 1000;//1000 block numbers ahead
            let _rewardTokenPerBlock = '3';
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
            //console.log(_bonusEndBlock, 'bonus end block');
            let addressesProvider = await LendingPoolAddressesProvider.deployed();
            _core_address = await addressesProvider.getLendingPoolCore();
            underlyingAsset = await USDC.deployed()
            console.log(underlyingAsset.address, 'USDC address for reward token');
            //add deployed USDC instance to populous reward as erc20 reward token
            await deployer.deploy(PopulousReward, _core_address, underlyingAsset.address, root, _rewardTokenPerBlock, _startBlock, _bonusEndBlock, { gas: 6721975, from: root, overwrite: false });
        });
    }
};