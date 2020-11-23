/*From the documentation:
LendingPoolAddressesProvider is the Global addresses register of the protocol. 
This contract is immutable and the address will never change. 
This contract must be used to fetch the address of the 
latest implementation of the LendingPool contract.
The following addresses can be added / modified:
LendingPool contract,
LendingPoolCore contract,
LendingPoolParametersProvider contract,
LendingPoolManager multisig contract address,
LendingPoolConfigurator contract,
LendingPoolLiquidationManager contract,
LendingPoolDataProvider contract
PriceOracle contract,
LendingRateOracle contract,
FeeProvider contract,
TokenDistributor contract,
The mock Ethereum address used to represent ETH in the protocol. */

// location: contracts/configuration
const LendingPoolAddressesProvider = artifacts.require('LendingPoolAddressesProvider');
const LendingPool = artifacts.require('LendingPool');
const LendingPoolCore = artifacts.require('LendingPoolCore');
const LendingPoolParametersProvider = artifacts.require('LendingPoolParametersProvider');
// const LendingPoolManager = is admin user/wallet
const LendingPoolConfigurator = artifacts.require('LendingPoolConfigurator');
const LendingPoolLiquidationManager = artifacts.require('LendingPoolLiquidationManager');
const LendingPoolDataProvider = artifacts.require('LendingPoolDataProvider');
const PriceOracle = artifacts.require('PriceOracle');
const LendingRateOracle = artifacts.require('LendingRateOracle');
const FeeProvider = artifacts.require('FeeProvider');
const TokenDistributor = artifacts.require('TokenDistributor');
const Dai = artifacts.require('MockDAI');
const DefaultReserveInterestRateStrategy = artifacts.require('DefaultReserveInterestRateStrategy');

module.exports = function (deployer, network, accounts) {
    // Using the accounts within the migrations.
    const [root, alice, bob, carl] = accounts;

    if (network == "ropsten" || network == "development") {

        deployer.then(async () => {
            let _DAI = await Dai.deployed();
            console.log(_DAI.address, 'DAI address for lending pool');
            let _DefaultReserveInterestRateStrategy = await DefaultReserveInterestRateStrategy.deployed();
            //initialise a DAI/PDAI reserve via lending pool configurator (only pool manager can call)
            //this  will create associated PToken and deposit and redeem should work after this
            let _lendingPoolAddressesProvider = await LendingPoolAddressesProvider.deployed();
            let _poolConfigInstance = await LendingPoolConfigurator.at(await _lendingPoolAddressesProvider.getLendingPoolConfigurator()); // targeting proxy
            await _poolConfigInstance.initReserve(_DAI.address, '18', _DefaultReserveInterestRateStrategy.address, { from: root });
            await _poolConfigInstance.refreshLendingPoolCoreConfiguration({ from: root });
            let lendingPoolInstance = await LendingPool.at(await _lendingPoolAddressesProvider.getLendingPool()); // targeting proxy
            let reserveData = await lendingPoolInstance.getReserveData(_DAI.address);
            /* returns (
                uint256 totalLiquidity,
                uint256 availableLiquidity,
                uint256 totalBorrowsStable,
                uint256 totalBorrowsVariable,
                uint256 liquidityRate,
                uint256 variableBorrowRate,
                uint256 stableBorrowRate,
                uint256 averageStableBorrowRate,
                uint256 utilizationRate,
                uint256 liquidityIndex,
                uint256 variableBorrowIndex,
                address PTokenAddress,
                uint40 lastUpdateTimestamp
            ) */
            //console.log(reserveData, 'DAI reserve data');
            let _Core = await LendingPoolCore.at(await _lendingPoolAddressesProvider.getLendingPoolCore());
            let _PDai_Address = await _Core.getReservePTokenAddress(_DAI.address);
            console.log(_PDai_Address, 'PDAI address for lending pool and Populous Reward');
        });

    } else {
    
    }

}