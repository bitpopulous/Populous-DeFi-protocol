
/*From the Populous documentation:
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

module.exports = function(deployer, network, accounts) {
    // Using the accounts within the migrations.
    const [root, alice, bob, carl] = accounts;

    if (network == "development") {
        // Do something specific to the network named "development".
        
        /* let
        _lendingPool,
        _lendingPoolCore,
        _lendingPoolParametersProvider,
        _lendingPoolManager,
        _lendingPoolConfigurator,
        _lendingPoolLiquidationManager,
        _lendingPoolDataProvider,
        _priceOracle,
        _lendingRateOracle,
        _feeProvider,
        _tokenDistributor; */

        // using async/await
        deployer.then(async () => {

            let 
            _lendingPool = await LendingPool.deployed(),
            _lendingPoolCore = await LendingPoolCore.deployed(),
            _lendingPoolParametersProvider = await LendingPoolParametersProvider.deployed(),
            _lendingPoolManager = root,
            _lendingPoolConfigurator = await LendingPoolConfigurator.deployed(),
            _lendingPoolLiquidationManager = await LendingPoolLiquidationManager.deployed(),
            _lendingPoolDataProvider = await LendingPoolDataProvider.deployed(),
            _priceOracle = await PriceOracle.deployed(),
            _lendingRateOracle = await LendingRateOracle.deployed(),
            _feeProvider = await FeeProvider.deployed(),
            _tokenDistributor = await TokenDistributor.deployed();
            // console.log(_lendingPool.address);
            let _lendingPoolAddressesProvider = await LendingPoolAddressesProvider.deployed();

            return Promise.all([
              _lendingPoolAddressesProvider.setLendingPoolManager(root),
              _lendingPoolAddressesProvider.setLendingPoolImpl(_lendingPool.address),
              _lendingPoolAddressesProvider.setLendingPoolCoreImpl(_lendingPoolCore.address),
              _lendingPoolAddressesProvider.setLendingPoolConfiguratorImpl(_lendingPoolConfigurator.address),
              _lendingPoolAddressesProvider.setLendingPoolParametersProviderImpl(_lendingPoolParametersProvider.address),
              _lendingPoolAddressesProvider.setFeeProviderImpl(_feeProvider.address),
              _lendingPoolAddressesProvider.setLendingPoolLiquidationManager(_lendingPoolLiquidationManager.address),
              _lendingPoolAddressesProvider.setPriceOracle(_priceOracle.address),
              _lendingPoolAddressesProvider.setLendingRateOracle(_lendingRateOracle.address),
              _lendingPoolAddressesProvider.setTokenDistributor(_tokenDistributor.address),
              _lendingPoolAddressesProvider.setLendingPoolDataProviderImpl(_lendingPoolDataProvider.address)
            ]).then(function(results) {
              console.log(results);
              console.log(results.length);
            });

          });
    } else {
        // Perform a different step otherwise.
    }
};